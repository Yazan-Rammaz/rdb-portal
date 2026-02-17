// Auth Types
export interface User {
    username?: string;
    avatar: string;
    accessToken: {
        token: string;
        expiresAt: string;
    };
    refreshToken: {
        token: string;
        expiresAt: string;
    };
    admin: {
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
    };
}

export interface UserInterface extends User {}

export interface LoginCredentials {
    email: string;
    password: string;
    pin?: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    isUnlocked: boolean;
}
