import type { PaginatedResponse, PaginationParams } from '@/shared/types';

// Wallet Types
export interface Wallet {
    id: string;
    userId: string;
    balance: number;
    currency: string;
    type: 'main' | 'savings' | 'business';
    status: 'active' | 'inactive' | 'frozen';
    createdAt: string;
    updatedAt: string;
}

export type WalletsResponse = PaginatedResponse<Wallet>;

export interface WalletsParams extends PaginationParams {
    userId?: string;
    status?: string;
    type?: string;
}
