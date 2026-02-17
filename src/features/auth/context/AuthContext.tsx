'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';

interface AuthContextType {
    isUnlocked: boolean;
    unlock: () => void;
    lock: () => void;
    user: User | null;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isUnlocked, setIsUnlocked] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
                console.log('User loaded from localStorage:', parsedUser);
            } catch (error) {
                console.error('Error parsing saved user:', error);
            }
        }
    }, []);

    const unlock = () => setIsUnlocked(true);
    const lock = () => setIsUnlocked(false);

    return (
        <AuthContext.Provider value={{ isUnlocked, unlock, lock, user, setUser }}>
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
