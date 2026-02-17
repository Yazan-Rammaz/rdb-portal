'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    id?: string;
    username?: string;
    name?: string;
    access_token?: string;
    authorization_token?: string;
    avatar?: string;
    user?: {
        type: number;
    };
}

interface LayoutContextType {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    user: User | null;
    setUser: (user: User | null) => void;
    isMobile: boolean;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error('Failed to parse user from localStorage', e);
            }
        }

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <LayoutContext.Provider value={{ sidebarOpen, setSidebarOpen, user, setUser, isMobile }}>
            {children}
        </LayoutContext.Provider>
    );
}

export function useLayout() {
    const context = useContext(LayoutContext);
    if (context === undefined) {
        throw new Error('useLayout must be used within a LayoutProvider');
    }
    return context;
}
