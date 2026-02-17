'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLayout } from '../../context';
import {
    CloseSvg,
    LogoHeaderSvg,
    PartnerLogoSvg,
    RamaazPoweredSvg,
    TransactionLogoSvg,
    WalletLogoSvg,
} from '@/src/shared/components/ui/Svgs';

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

    useEffect(() => {
        if (isMobile && sidebarOpen) {
            const handleClickOutside = (e: MouseEvent) => {
                const sidebar = document.getElementById('mobile-sidebar');
                const target = e.target as HTMLElement;

                if (target.closest('[aria-label="Toggle menu"]')) {
                    return;
                }

                if (sidebar && !sidebar.contains(target)) {
                    setSidebarOpen(false);
                }
            };

            setTimeout(() => {
                document.addEventListener('mousedown', handleClickOutside);
            }, 100);

            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isMobile, sidebarOpen, setSidebarOpen]);

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
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                id="mobile-sidebar"
                className={`
                    shrink-0 flex flex-col items-center mb-2.5
                    ${
                        isMobile
                            ? 'fixed top-0 left-0 h-full z-50 bg-white shadow-2xl w-70 px-7.5'
                            : 'relative bg-[#F7F7F7] w-37.5 mx-7.5'
                    }
                    rounded-[10px]
                    transition-transform duration-300 ease-in-out
                    ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'}
                `}
            >
                {isMobile && (
                    <div className="flex items-center justify-end w-full pt-5 mb-2.5">
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="p-2 text-[#404040] hover:bg-gray-100 rounded-md transition-colors"
                            aria-label="Close sidebar"
                        >
                            <CloseSvg />
                        </button>
                    </div>
                )}

                <div
                    className={`w-full flex justify-center ${isMobile ? 'pt-2.5' : 'pt-5'} mb-3.75`}
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

                <nav
                    className={`
                        flex items-center justify-center flex-col w-full space-y-1.25
                        ${isMobile ? 'px-0.5' : ''}
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
                                    duration-200 transition-all h-11.25 
                                    text-white text-[12px] rounded-[10px] 
                                    flex items-center justify-between 
                                    cursor-pointer w-full px-2.5
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

                <div className={`mt-auto mb-5 ${isMobile ? 'pb-2.5' : ''}`}>
                    <RamaazPoweredSvg />
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
