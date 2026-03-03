import { notify } from '../utils/notify';
import type { ApiError } from '../types';

type RequestParams = object;

export interface ApiClient {
    get<T = unknown>(url: string, params?: RequestParams): Promise<T>;
    post<T = unknown>(url: string, data?: unknown): Promise<T>;
    put<T = unknown>(url: string, data?: unknown): Promise<T>;
    delete<T = unknown>(url: string, params?: RequestParams): Promise<T>;
}

/**
 * Creates a fetch-based API client with error handling.
 * Used client-side — handles 401/403 redirects and notify() calls.
 */
export const createApiClient = (baseURL: string): ApiClient => {
    const request = async <T>(method: string, path: string, payload?: unknown): Promise<T> => {
        const url = new URL(path, baseURL);

        if ((method === 'GET' || method === 'DELETE') && payload && typeof payload === 'object') {
            for (const [k, v] of Object.entries(payload)) {
                if (v !== undefined && v !== null) {
                    url.searchParams.set(k, String(v));
                }
            }
        }

        const res = await fetch(url.toString(), {
            method,
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body:
                method !== 'GET' && method !== 'DELETE' && payload !== undefined
                    ? JSON.stringify(payload)
                    : undefined,
        });

        if (!res.ok) {
            if (res.status === 401 || res.status === 403) {
                window.location.replace('/auth');
                return Promise.reject(new Error('Unauthorized'));
            }

            const errData = await res.json().catch(() => ({})) as { message?: string; code?: string };
            const errorMessage = errData?.message || res.statusText || 'An unexpected error occurred';

            console.error('[API Error]', { url: url.toString(), method, status: res.status, message: errorMessage });

            notify({ message: errorMessage, timeout: 3000, type: 'error' });

            const apiError: ApiError = {
                message: errorMessage,
                code: errData?.code,
                statusCode: res.status,
            };

            throw apiError;
        }

        if (res.status === 204) return undefined as T;

        return res.json() as Promise<T>;
    };

    return {
        get: <T>(url: string, params?: RequestParams) => request<T>('GET', url, params),
        post: <T>(url: string, data?: unknown) => request<T>('POST', url, data),
        put: <T>(url: string, data?: unknown) => request<T>('PUT', url, data),
        delete: <T>(url: string, params?: RequestParams) => request<T>('DELETE', url, params),
    };
};
