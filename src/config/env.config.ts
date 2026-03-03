/**
 * Environment configuration
 * All environment variables should be accessed through this file
 */

export const env = {
    apiUrl: 'https://trydos_wallet_develop.ramaaz.dev',
    baseUrl: 'https://trydos_wallet_develop.ramaaz.dev',
    smartlookKey: process.env.NEXT_PUBLIC_SMARTLOOK_KEY || '',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
} as const;
