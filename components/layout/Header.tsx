'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useLayout } from '@/context/LayoutContext';
import { ClockSvg, MenuSvg } from '@/components/Svgs';

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
                className={`max-w-full flex w-full items-center justify-between px-[30px] ${isMobile ? 'mt-[20px]' : 'mt-[10px]'} mb-[10px]`}
            >
                <div className="flex items-center h-[50px] w-full justify-between bg-[#F7F7F7] rounded-[10px] shadow-sm">
                    {/* Left side - Menu button (mobile only) + User info */}
                    <div className="flex gap-x-[10px] items-center justify-center pl-[10px]">
                        {/* User Avatar */}
                        <div className="w-[50px] h-[50px] relative overflow-hidden rounded-[10px]">
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
                        <div className="hidden sm:flex items-center justify-center text-xs h-[50px] font-medium text-[#404040]">
                            {user?.username}
                        </div>

                        {/* Clock - hide on mobile */}
                        {!isMobile && (
                            <div className="flex text-[10px] text-[#404040] items-center justify-center space-x-[5px]">
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
                        className="cursor-pointer text-[12px] pr-[10px] hover:scale-[1.08] hover:underline text-[#727272] transition-transform"
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
