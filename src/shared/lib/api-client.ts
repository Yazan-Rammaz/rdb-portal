import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { notify } from '../utils/notify';
import LocalStorage from '../utils/localStorage';

const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

const savedUser = LocalStorage.getItem('user');
const token = JSON.parse(savedUser || '{}')?.accessToken?.token || '';

const request = async (
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data: any,
    callback: (response: any) => void,
    callbackerr: (error: any) => void,
    headers?: any,
) => {
    try {
        const config: AxiosRequestConfig = {
            url,
            method,
        };

        if (method === 'get' || method === 'delete') {
            config.params = data;
        } else {
            config.data = data;
        }

        config.headers = {
            ...api.defaults.headers.common,
            ...headers,
            Authorization: `Bearer ${token}`,
        };

        const response: AxiosResponse = await api.request(config);
        return callback(response?.data);
    } catch (error: any) {
        if (error?.response?.data?.message) {
            notify({
                message: error?.response?.data?.message,
                timeout: 3000,
                type: 'error',
            });
        }
        console.error('API Error:', error?.response?.data || error.message);
        return callbackerr(error);
    }
};

const createMethod = (method: 'get' | 'post' | 'put' | 'delete') => {
    return (
        url: string,
        data: any,
        callback: (response: any) => void,
        callbackerr: (error: any) => void,
        headers?: any,
    ) => request(method, url, data, callback, callbackerr, headers);
};

const API = {
    get: createMethod('get'),
    post: createMethod('post'),
    put: createMethod('put'),
    delete: createMethod('delete'),
};

export default API;
