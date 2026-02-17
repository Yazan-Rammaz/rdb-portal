/**
 * Navigation configuration
 * Define all navigation routes and menu items
 */

export interface NavItem {
    title: string;
    href: string;
    icon?: string;
    children?: NavItem[];
}

export const mainNav: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Users',
        href: '/users',
    },
    {
        title: 'Transactions',
        href: '/transactions',
    },
    {
        title: 'System Wallets',
        href: '/system-wallets',
    },
    {
        title: 'Business Partner',
        href: '/business-partner',
    },
    {
        title: 'Settings',
        href: '/settings',
    },
];

export const authRoutes = {
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
};

export const protectedRoutes = [
    '/',
    '/users',
    '/transactions',
    '/system-wallets',
    '/business-partner',
    '/settings',
];
