import API from '@/shared/lib/api-client';
import { WalletsResponse } from '../types';

/**
 * Get wallets list
 */
export const getWallets = (): Promise<WalletsResponse> => {
    return new Promise((resolve, reject) => {
        API.get(
            '/api/wallets',
            {},
            (response) => {
                resolve(response as WalletsResponse);
            },
            (error) => {
                reject(error);
            },
        );
    });
};
