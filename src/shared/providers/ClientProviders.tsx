'use client';

import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { LayoutProvider } from '../context';
import { AuthProvider } from '@/features/auth';
import { ToastProvider } from './ToastProvider';
import { queryClient } from '@/shared/lib/query-client';

// Override toLocaleString to use English digits
if (typeof window !== 'undefined') {
    Number.prototype.toLocaleString = function () {
        return this.toString().replace(/\d/g, (digit: string) => '0123456789'[Number(digit)]);
    };
}

export function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <ToastProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <LayoutProvider>{children}</LayoutProvider>
                </AuthProvider>
            </QueryClientProvider>
        </ToastProvider>
    );
}
