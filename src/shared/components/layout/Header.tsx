'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useLayout } from '../../context';
import { ClockSvg, MenuSvg } from '@/src/shared/components/ui/Svgs';

const Header = () => {
    const { user, isMobile, sidebarOpen, setSidebarOpen } = useLayout();
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.reload();
    };

    return (
        <div className="w-full">
            <header
                className={`max-w-full flex w-full items-center justify-between px-7.5 ${isMobile ? 'mt-5' : 'mt-2.5'} mb-2.5`}
            >
                <div className="flex items-center h-12.5 w-full justify-between bg-[#F7F7F7] rounded-[10px] shadow-sm">
                    {/* Left side - Menu button (mobile only) + User info */}
                    <div className="flex gap-x-2.5 items-center justify-center pl-2.5">
                        {/* User Avatar */}
                        <div className="w-12.5 h-12.5 relative overflow-hidden rounded-[10px]">
                            <Image
                                className="object-cover"
                                alt="user"
                                src={user?.avatar || '/img/user.png'}
                                fill
                            />
                        </div>
                        {/* Menu button for mobile */}
                        {isMobile && (
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 text-[#404040] hover:bg-gray-200 rounded-md transition-colors"
                                aria-label="Toggle menu"
                            >
                                <MenuSvg />
                            </button>
                        )}

                        {/* Username - hide on very small screens */}
                        <div className="hidden sm:flex items-center justify-center text-xs h-12.5 font-medium text-[#404040]">
                            {user?.username}
                        </div>

                        {/* Clock - hide on mobile */}
                        {!isMobile && (
                            <div className="flex text-[10px] text-[#404040] items-center justify-center space-x-1.25">
                                <ClockSvg />
                                <div className="flex flex-col items-start justify-center leading-tight">
                                    <div className="font-medium">10:30</div>
                                    <div className="opacity-70 text-[8px]">8 h / 30 m</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right side - Logout */}
                    <div
                        className="cursor-pointer text-[12px] pr-2.5 hover:scale-[1.08] hover:underline text-[#727272] transition-transform"
                        onClick={handleLogout}
                    >
                        Logout
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
