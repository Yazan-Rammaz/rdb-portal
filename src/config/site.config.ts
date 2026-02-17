/**
 * Site configuration
 * General information about the application
 */

export const siteConfig = {
    name: 'Trydos Wallet Portal',
    description: 'Digital wallet management system',
    version: '1.0.0',
    author: 'Ramaaz',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const;
