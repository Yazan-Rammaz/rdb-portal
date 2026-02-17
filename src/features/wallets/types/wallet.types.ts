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

export interface WalletsResponse {
    items: Wallet[];
    total: number;
}
