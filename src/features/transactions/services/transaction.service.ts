import API from '@/shared/lib/api-client';
import { TransactionsResponse, TransactionsParams } from '../types';

/**
 * Get transactions list with pagination and filters
 */
export const getTransactions = (params: TransactionsParams = {}): Promise<TransactionsResponse> => {
    return new Promise((resolve, reject) => {
        const { page = 0, limit = 10 } = params;
        API.get(
            `/api/transactions?page=${page}&limit=${limit}`,
            {},
            (response) => {
                resolve(response as TransactionsResponse);
            },
            (error) => {
                reject(error);
            },
        );
    });
};
