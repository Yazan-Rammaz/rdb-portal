/**
 * Environment configuration
 * All environment variables should be accessed through this file
 */

export const env = {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://trydos_wallet_develop.ramaaz.dev',
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://trydos_wallet_develop.ramaaz.dev',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
} as const;
