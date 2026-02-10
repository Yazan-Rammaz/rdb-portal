export interface User {
    username?: String,
    avatar: String,
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