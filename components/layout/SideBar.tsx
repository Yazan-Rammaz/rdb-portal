'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLayout } from '@/context/LayoutContext';
import {
    CloseSvg,
    LogoHeaderSvg,
    PartnerLogoSvg,
    RamaazPoweredSvg,
    TransactionLogoSvg,
    WalletLogoSvg,
} from '@/components/Svgs';

const UserRole = {
    Admin: 1,
    User: 2,
};

const SideBarContent = [
    {
        title: 'Transaction',
        bg: '#404040',
        route: '/transactions',
        svg: <TransactionLogoSvg />,
    },
];

const AdminSideBarContent = [
    {
        title: 'users',
        bg: '#002486',
        route: '/users',
        svg: <PartnerLogoSvg />,
    },
    {
        title: 'Transaction',
        bg: '#404040',
        route: '/transactions',
        svg: <TransactionLogoSvg />,
    },
    {
        title: 'System Wallet',
        bg: '#396CF7',
        route: '/system-wallets',
        svg: <WalletLogoSvg color="#fcfcfc" />,
    },
    {
        title: 'Business Partner',
        bg: '#002486',
        route: '/business-partner',
        svg: <PartnerLogoSvg />,
    },
];

const Sidebar: React.FC = () => {
    const { user, isMobile, sidebarOpen, setSidebarOpen } = useLayout();
    const [contents, setContents] = useState<any[]>([]);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (user?.user?.type === UserRole.Admin) {
            setContents(AdminSideBarContent);
        } else {
            setContents(AdminSideBarContent);
        }
    }, [user]);

    // Close sidebar when clicking outside on mobile
    useEffect(() => {
        if (isMobile && sidebarOpen) {
            const handleClickOutside = (e: MouseEvent) => {
                const sidebar = document.getElementById('mobile-sidebar');
                const target = e.target as HTMLElement;

                // Don't close if clicking on menu button
                if (target.closest('[aria-label="Toggle menu"]')) {
                    return;
                }

                if (sidebar && !sidebar.contains(target)) {
                    setSidebarOpen(false);
                }
            };

            // Small delay to prevent immediate closing
            setTimeout(() => {
                document.addEventListener('mousedown', handleClickOutside);
            }, 100);

            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isMobile, sidebarOpen, setSidebarOpen]);

    // Prevent body scroll when sidebar is open on mobile
    useEffect(() => {
        if (isMobile && sidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobile, sidebarOpen]);

    return (
        <>
            {/* Overlay for mobile - only show on mobile when sidebar is open */}
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                id="mobile-sidebar"
                className={`
                    shrink-0 flex flex-col items-center mb-[10px]
                    ${
                        isMobile
                            ? 'fixed top-0 left-0 h-full z-50 bg-white shadow-2xl w-[280px] px-[30px]'
                            : 'relative bg-[#F7F7F7] w-[150px] mx-[30px]'
                    }
                    rounded-[10px]
                    transition-transform duration-300 ease-in-out
                    ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'}
                `}
            >
                {/* Close button for mobile only */}
                {isMobile && (
                    <div className="flex items-center justify-end w-full pt-[20px] mb-[10px]">
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="p-2 text-[#404040] hover:bg-gray-100 rounded-md transition-colors"
                            aria-label="Close sidebar"
                        >
                            <CloseSvg />
                        </button>
                    </div>
                )}

                {/* Logo Section */}
                <div
                    className={`w-full flex justify-center ${isMobile ? 'pt-[10px]' : 'pt-[20px]'} mb-[15px]`}
                >
                    <div
                        className="cursor-pointer hover:opacity-80 transition-opacity inline-block"
                        onClick={() => {
                            router.push('/');
                            if (isMobile) setSidebarOpen(false);
                        }}
                    >
                        <LogoHeaderSvg />
                    </div>
                </div>

                {/* Navigation Items */}
                <nav
                    className={`
                        flex items-center justify-center flex-col w-full space-y-[5px]
                        ${isMobile ? 'px-[2px]' : ''}
                        max-h-[calc(100vh-200px)] overflow-y-auto
                    `}
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#d1d5db transparent',
                    }}
                >
                    {contents.map((content, key) => {
                        const isActive = pathname === content.route;
                        return (
                            <button
                                key={key}
                                style={{
                                    backgroundColor: content.bg,
                                    boxShadow: 'inset 0 3px 6px rgba(255, 255, 255, 0.5)',
                                }}
                                className={`
                                    hover:scale-[1.02] active:scale-[0.98] 
                                    duration-200 transition-all h-[45px] 
                                    text-white text-[12px] rounded-[10px] 
                                    flex items-center justify-between 
                                    cursor-pointer w-full px-[10px]
                                    ${isActive ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
                                `}
                                onClick={() => {
                                    router.push(content.route);
                                    if (isMobile) setSidebarOpen(false);
                                }}
                            >
                                <span className="block font-medium">{content.title}</span>
                                <span className="flex items-center justify-center">
                                    {content.svg}
                                </span>
                            </button>
                        );
                    })}
                </nav>

                {/* Powered by logo */}
                <div className={`mt-auto mb-[20px] ${isMobile ? 'pb-[10px]' : ''}`}>
                    <RamaazPoweredSvg />
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
