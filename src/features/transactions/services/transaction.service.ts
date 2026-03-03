'use server';

import { getServerApi } from '@/shared/lib/api-server';
import { API_ENDPOINTS } from '@/shared/constants';
import { TransactionsResponse, TransactionsParams } from '../types';

export const getTransactions = async (
    params: TransactionsParams = {},
): Promise<TransactionsResponse> => {
    const api = await getServerApi();
    return api.get<TransactionsResponse>(API_ENDPOINTS.TRANSACTIONS.LIST, params);
};
