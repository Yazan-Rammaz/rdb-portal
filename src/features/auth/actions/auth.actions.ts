'use server';

import { cookies } from 'next/headers';
import { env } from '@/config/env.config';
import { API_ENDPOINTS } from '@/shared/constants/api-endpoints';
import type { AdminUser, AdminInfo, LoginCredentials } from '../types';

const COOKIE_ACCESS_TOKEN = 'access_token';
const COOKIE_USER_DATA = 'user_data';

export type LoginResult =
    | { success: true; user: AdminInfo }
    | { success: false; error: string };

/**
 * Login server action
 * Calls the login API, stores access token in HTTP-only cookie,
 * stores admin info in a regular cookie for client-side state hydration.
 */
export async function loginAction(credentials: LoginCredentials): Promise<LoginResult> {
    try {
        const res = await fetch(`${env.baseUrl}${API_ENDPOINTS.AUTH.LOGIN}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
            cache: 'no-store',
        });

        if (!res.ok) {
            const errData = await res.json().catch(() => ({})) as { message?: string };
            return { success: false, error: errData?.message || res.statusText || 'Login failed' };
        }

        const userData = (await res.json()) as AdminUser;
        const cookieStore = await cookies();

        cookieStore.set(COOKIE_ACCESS_TOKEN, userData.accessToken.token, {
            httpOnly: true,
            secure: env.isProduction,
            sameSite: 'lax',
            expires: new Date(userData.accessToken.expiresAt),
            path: '/',
        });

        cookieStore.set(COOKIE_USER_DATA, JSON.stringify(userData.admin), {
            httpOnly: false,
            secure: env.isProduction,
            sameSite: 'lax',
            expires: new Date(userData.accessToken.expiresAt),
            path: '/',
        });

        return { success: true, user: userData.admin };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred';
        return { success: false, error: message };
    }
}

/**
 * Logout server action
 * Clears auth cookies server-side.
 */
export async function logoutAction(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_ACCESS_TOKEN);
    cookieStore.delete(COOKIE_USER_DATA);
}

/**
 * Get current session server action
 * Reads admin info from cookie (set during login).
 * Returns null if no valid session exists.
 */
export async function getSessionAction(): Promise<AdminInfo | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_ACCESS_TOKEN)?.value;

    if (!token) return null;

    const userDataCookie = cookieStore.get(COOKIE_USER_DATA)?.value;
    if (!userDataCookie) return null;

    try {
        return JSON.parse(userDataCookie) as AdminInfo;
    } catch {
        return null;
    }
}
