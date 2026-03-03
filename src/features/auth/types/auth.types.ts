// Auth Types

export interface AdminInfo {
    id: string;
    email: string;
    fullName: string;
    role: string;
    permissions: string[];
    status: string;
    lastLoginIp: string;
    lastLoginAt: string;
    createdBy: string;
    notes: string;
    createdAt: string;
    updatedAt: string;
}

export interface AdminUser {
    accessToken: {
        token: string;
        expiresAt: string;
    };
    refreshToken: {
        token: string;
        expiresAt: string;
    };
    admin: AdminInfo;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthState {
    user: AdminInfo | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}
