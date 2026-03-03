/**
 * API Endpoints Constants
 */

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/admin/auth/login',
        LOGOUT: '/admin/auth/logout',
        ME: '/admin/auth/me',
    },
    USERS: {
        LIST: '/users/admin',
        GET: (id: string) => `/users/admin/${id}`,
        CREATE: '/users/admin',
        UPDATE: (id: string) => `/users/admin/${id}`,
        DELETE: (id: string) => `/users/admin/${id}`,
    },
    TRANSACTIONS: {
        LIST: '/api/transactions',
        GET: (id: string) => `/api/transactions/${id}`,
    },
    WALLETS: {
        LIST: '/api/wallets',
        GET: (id: string) => `/api/wallets/${id}`,
    },
} as const;
