'use client';

import { useAuthContext } from '../context';

/**
 * Hook to access auth context
 * Use this hook in components to get user and auth state
 */
export const useAuth = () => {
    return useAuthContext();
};
