/**
 * Common types used across the application
 */

export interface PaginationParams {
    page?: number;
    limit?: number;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

export interface ApiResponse<T = unknown> {
    data: T;
    message?: string;
    success: boolean;
}

export interface ApiError {
    message: string;
    code?: string;
    statusCode?: number;
}

export interface QueryState<T> {
    data: T | null;
    isLoading: boolean;
    error: ApiError | null;
    refetch: () => void;
}

export type Status = 'idle' | 'loading' | 'success' | 'error';
