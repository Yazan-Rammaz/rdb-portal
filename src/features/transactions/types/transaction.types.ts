import type { PaginatedResponse, PaginationParams } from '@/shared/types';

// Transaction Types
export interface Transaction {
    id: string;
    type: 'deposit' | 'withdrawal' | 'transfer' | 'payment';
    status: 'pending' | 'completed' | 'failed' | 'cancelled';
    amount: number;
    currency: string;
    userId: string;
    walletId: string;
    createdAt: string;
    updatedAt: string;
    description?: string;
    metadata?: TransactionMetadata;
}

export interface TransactionMetadata {
    reference?: string;
    externalId?: string;
    notes?: string;
    [key: string]: string | number | boolean | undefined;
}

export type TransactionsResponse = PaginatedResponse<Transaction>;

export interface TransactionsParams extends PaginationParams {
    type?: Transaction['type'];
    status?: Transaction['status'];
    userId?: string;
}
