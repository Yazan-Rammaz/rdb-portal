'use server';

import { getServerApi } from '@/shared/lib/api-server';
import { API_ENDPOINTS } from '@/shared/constants';
import { UsersResponse, UsersParams } from '../types';

export const getUsers = async (params: UsersParams = {}): Promise<UsersResponse> => {
    const api = await getServerApi();
    return api.get<UsersResponse>(API_ENDPOINTS.USERS.LIST, params);
};

export const getUserById = async (userId: string): Promise<UsersResponse['items'][number]> => {
    const api = await getServerApi();
    return api.get<UsersResponse['items'][number]>(API_ENDPOINTS.USERS.GET(userId));
};

export const blockUser = async (userId: string): Promise<void> => {
    const api = await getServerApi();
    await api.put(API_ENDPOINTS.USERS.UPDATE(userId), { isBlocked: true });
};

export const unblockUser = async (userId: string): Promise<void> => {
    const api = await getServerApi();
    await api.put(API_ENDPOINTS.USERS.UPDATE(userId), { isBlocked: false });
};

export const deleteUser = async (userId: string): Promise<void> => {
    const api = await getServerApi();
    await api.delete(API_ENDPOINTS.USERS.DELETE(userId));
};
