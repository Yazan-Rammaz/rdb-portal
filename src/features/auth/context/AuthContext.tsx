'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { AdminInfo, LoginCredentials } from '../types';
import { getSessionAction, loginAction, logoutAction } from '../actions';
import { notify } from '@/shared/utils/notify';

interface AuthContextType {
    user: AdminInfo | null;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AdminInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const initSession = useCallback(async () => {
        try {
            setIsLoading(true);
            const adminInfo = await getSessionAction();
            setUser(adminInfo);
        } catch {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        initSession();
    }, [initSession]);

    const login = useCallback(async (credentials: LoginCredentials) => {
        const result = await loginAction(credentials);
        if (result.success) {
            setUser(result.user);
            notify({ message: `Welcome back, ${result.user.fullName}!`, type: 'success' });
            router.push('/');
        } else {
            notify({ message: result.error, type: 'error' });
            throw new Error(result.error);
        }
    }, [router]);

    const logout = useCallback(async () => {
        await logoutAction();
        setUser(null);
        router.push('/auth');
    }, [router]);

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}
