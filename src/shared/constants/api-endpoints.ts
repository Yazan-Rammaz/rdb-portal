/**
 * API Endpoints Constants
 */

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/v1/users/login',
        LOGOUT: '/api/v1/users/logout',
        REGISTER: '/api/v1/users/register',
        REFRESH: '/api/v1/users/refresh',
        ME: '/api/v1/users/me',
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
