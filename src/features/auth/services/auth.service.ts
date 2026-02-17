import { UserInterface } from '../types';

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (user: UserInterface): boolean => {
    return !!user?.accessToken?.token;
};

/**
 * Get auth token from user object
 */
export const getAuthToken = (user: UserInterface | null): string => {
    return user?.accessToken?.token || '';
};

/**
 * Check if token is expired
 */
export const isTokenExpired = (expiresAt: string): boolean => {
    return new Date(expiresAt) < new Date();
};
