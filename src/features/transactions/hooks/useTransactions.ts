'use client';

import { useQuery } from '@tanstack/react-query';
import { getTransactions } from '../services';
import type { TransactionsResponse, TransactionsParams } from '../types';
import type { QueryState, ApiError } from '@/shared/types';

export const useTransactions = (
    params: TransactionsParams = {},
): QueryState<TransactionsResponse> => {
    const query = useQuery({
        queryKey: ['transactions', params],
        queryFn: () => getTransactions(params),
    });

    return {
        data: query.data ?? null,
        isLoading: query.isLoading,
        error: (query.error as ApiError) ?? null,
        refetch: query.refetch,
    };
};
