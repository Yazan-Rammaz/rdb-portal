import type { PaginatedResponse, PaginationParams } from '@/shared/types';

// User Types
export interface RatingStats {
    averageSellerRating: number;
    totalSellerRatings: number;
    averageBuyerRating: number;
    totalBuyerRatings: number;
    overallAverageRating: number;
    totalRatings: number;
}

export interface BrowserInfo {
    browser: string;
    device: string;
    operatingSystem: string;
    userAgent: string;
}

export interface LocationInfo {
    ipAddress: string;
}

export interface GuestToken {
    tokenType: string;
    isActive: boolean;
}

export interface UserAddress {
    street?: string;
    city?: string;
    country?: string;
    postalCode?: string;
    [key: string]: string | undefined;
}

export interface AppUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    userType: string;
    ratingStats: RatingStats;
    browserInfo: BrowserInfo;
    locationInfo: LocationInfo;
    guestToken: GuestToken;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    isBlocked: boolean;
    blockedAt: string | null;
    isTwoFactorEnabled: boolean;
    language: string;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
    address: UserAddress | null;
}

export type UsersResponse = PaginatedResponse<AppUser>;

export interface UsersParams extends PaginationParams {
    search?: string;
    status?: string;
}

export type User = AppUser;
