import API from "@/lib/api";
import { UsersResponse } from "@/types/users";

export interface UsersParams {
    page?: number;
    limit?: number;
}

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
            }
        );
    });
};