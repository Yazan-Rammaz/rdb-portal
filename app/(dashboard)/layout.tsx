'use client';

import React from 'react';
import { AuthGuard } from '@/components/auth/AuthGuard';
import Sidebar from '@/components/layout/SideBar';
import Header from '@/components/layout/Header';
import { useLayout } from '@/context/LayoutContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { isMobile } = useLayout();

    return (
        <AuthGuard>
            <div className="min-h-screen bg-white w-full flex flex-col">
                {/* Header - always visible */}
                <Header />

                <div className="flex-1 flex relative w-full">
                    {/* Sidebar - always rendered but hidden on mobile */}
                    <Sidebar />

                    {/* Main Content */}
                    <main
                        className={`text-[#5D5D5D] flex-1 ${isMobile ? 'w-full px-[30px]' : 'w-[calc(100%-240px)] pr-[30px]'} pb-[20px]`}
                    >
                        <div className="bg-[#F7F7F7] rounded-[10px] h-full w-full p-6 shadow-sm overflow-auto">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </AuthGuard>
    );
}
