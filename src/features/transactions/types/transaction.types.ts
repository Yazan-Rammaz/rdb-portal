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
    metadata?: Record<string, any>;
}

export interface TransactionsResponse {
    items: Transaction[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

export interface TransactionsParams {
    page?: number;
    limit?: number;
    type?: string;
    status?: string;
    userId?: string;
}
