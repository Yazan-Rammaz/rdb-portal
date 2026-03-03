'use client';

import { useAuthContext } from '../context';

/**
 * Hook to access auth state and actions.
 * Provides: user, isLoading, login, logout
 */
export const useAuth = () => {
    return useAuthContext();
};
