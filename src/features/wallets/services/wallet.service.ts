'use server';

import { getServerApi } from '@/shared/lib/api-server';
import { API_ENDPOINTS } from '@/shared/constants';
import { WalletsResponse } from '../types';

export const getWallets = async (): Promise<WalletsResponse> => {
    const api = await getServerApi();
    return api.get<WalletsResponse>(API_ENDPOINTS.WALLETS.LIST);
};
