'use client';

import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../services';
import type { UsersResponse, UsersParams } from '../types';
import type { QueryState, ApiError } from '@/shared/types';

export const useUsers = (params: UsersParams = {}): QueryState<UsersResponse> => {
    const query = useQuery({
        queryKey: ['users', params],
        queryFn: () => getUsers(params),
    });

    return {
        data: query.data ?? null,
        isLoading: query.isLoading,
        error: (query.error as ApiError) ?? null,
        refetch: query.refetch,
    };
};
