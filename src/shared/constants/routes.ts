/**
 * Application routes constants
 */

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/',
    USERS: '/users',
    TRANSACTIONS: '/transactions',
    WALLETS: '/system-wallets',
    BUSINESS_PARTNER: '/business-partner',
    SETTINGS: '/settings',
} as const;

export const AUTH_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER] as const;

export const PROTECTED_ROUTES = [
    ROUTES.DASHBOARD,
    ROUTES.USERS,
    ROUTES.TRANSACTIONS,
    ROUTES.WALLETS,
    ROUTES.BUSINESS_PARTNER,
    ROUTES.SETTINGS,
] as const;
