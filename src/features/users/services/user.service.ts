import API from '@/shared/lib/api-client';
import { UsersResponse, UsersParams } from '../types';

/**
 * Get users list with pagination
 */
export const getUsers = (params: UsersParams = {}): Promise<UsersResponse> => {
    return new Promise((resolve, reject) => {
        const { page = 0, limit = 10 } = params;
        API.get(
            `https://trydos_wallet_develop.ramaaz.dev/users/admin?page=${page}&limit=${limit}`,
            {},
            (response) => {
                resolve(response as UsersResponse);
            },
            (error) => {
                reject(error);
            },
        );
    });
};

/**
 * Get single user by ID
 */
export const getUserById = (userId: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        API.get(
            `https://trydos_wallet_develop.ramaaz.dev/users/admin/${userId}`,
            {},
            (response) => {
                resolve(response);
            },
            (error) => {
                reject(error);
            },
        );
    });
};
