'use client';

import React from 'react';
import { AuthGuard } from '@/components/auth/AuthGuard';
import Sidebar from '@/components/layout/SideBar';
import Header from '@/components/layout/Header';
import { useLayout } from '@/context/LayoutContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { isMobile } = useLayout();
    // add a layout for dashboard with header and sidebar
    // if mobile, then header and sidebar will be stacked vertically

    if (isMobile) {
        return (
            <AuthGuard>
                <div className="min-h-screen bg-white flex flex-col">
                    {/* Header */}
                    <Header />
                </div>
            </AuthGuard>
        );
    }

    return (
        <AuthGuard>
            <div className="min-h-screen bg-white flex flex-col">
                {/* Header */}
                <Header />

                <div className={`flex-1 flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
                    {/* Sidebar */}
                    <Sidebar />

                    {/* Main Content */}
                    <main className={`flex-1 ${isMobile ? 'px-[30px]' : 'pr-[30px]'} pb-[20px]`}>
                        <div className="bg-[#F7F7F7] rounded-[10px] h-full w-full p-6 shadow-sm overflow-auto">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </AuthGuard>
    );
}
