'use server';

import { cookies } from 'next/headers';
import { env } from '../../config';
import type { ApiClient } from './api-factory';

/**
 * Server-side API client using native fetch.
 * Reads the access token from the HTTP-only cookie via next/headers
 * and attaches it as a Bearer Authorization header.
 *
 * Use this in server actions only — never in client components.
 */
export const getServerApi = async (): Promise<ApiClient> => {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    const request = async <T>(method: string, path: string, payload?: unknown): Promise<T> => {
        const url = new URL(path, env.baseUrl);

        if ((method === 'GET' || method === 'DELETE') && payload && typeof payload === 'object') {
            for (const [k, v] of Object.entries(payload)) {
                if (v !== undefined && v !== null) {
                    url.searchParams.set(k, String(v));
                }
            }
        }

        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (token) headers.Authorization = `Bearer ${token}`;

        const res = await fetch(url.toString(), {
            method,
            headers,
            body:
                method !== 'GET' && method !== 'DELETE' && payload !== undefined
                    ? JSON.stringify(payload)
                    : undefined,
            cache: 'no-store',
        });

        if (!res.ok) {
            const errData = await res.json().catch(() => ({})) as { message?: string; code?: string };
            const err = new Error(errData?.message || res.statusText || 'Request failed') as Error & {
                statusCode?: number;
                code?: string;
            };
            err.statusCode = res.status;
            err.code = errData?.code;
            throw err;
        }

        if (res.status === 204) return undefined as T;

        return res.json() as Promise<T>;
    };

    return {
        get: <T>(url: string, params?: object) => request<T>('GET', url, params),
        post: <T>(url: string, data?: unknown) => request<T>('POST', url, data),
        put: <T>(url: string, data?: unknown) => request<T>('PUT', url, data),
        delete: <T>(url: string, params?: object) => request<T>('DELETE', url, params),
    };
};
