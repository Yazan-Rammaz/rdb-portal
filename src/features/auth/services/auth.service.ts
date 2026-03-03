import type { LoginCredentials } from '../types';

/**
 * Default credentials for development/testing
 */
export const getDefaultCredentials = (): LoginCredentials => ({
    email: 'yazan.adanof@ramaaz.com',
    password: 'adminPass123!',
});
