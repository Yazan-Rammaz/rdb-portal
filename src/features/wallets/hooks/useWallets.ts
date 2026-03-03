'use client';

import { useQuery } from '@tanstack/react-query';
import { getWallets } from '../services';
import type { WalletsResponse } from '../types';
import type { QueryState, ApiError } from '@/shared/types';

export const useWallets = (): QueryState<WalletsResponse> => {
    const query = useQuery({
        queryKey: ['wallets'],
        queryFn: () => getWallets(),
    });

    return {
        data: query.data ?? null,
        isLoading: query.isLoading,
        error: (query.error as ApiError) ?? null,
        refetch: query.refetch,
    };
};
