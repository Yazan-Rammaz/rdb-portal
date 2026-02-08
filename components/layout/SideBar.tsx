'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLayout } from '@/context/LayoutContext';
import { 
  LogoHeaderSvg, 
  PartnerLogoSvg, 
  RamaazPoweredSvg, 
  TransactionLogoSvg, 
  WalletLogoSvg 
} from '@/components/Svgs';

const UserRole = {
  Admin: 1,
  User: 2
};

const SideBarContent = [
  {
    title: 'Transaction',
    bg: '#404040',
    route: '/transactions',
    svg: <TransactionLogoSvg />
  }
];

const AdminSideBarContent = [
  {
    title: 'Transaction',
    bg: '#404040',
    route: '/transactions',
    svg: <TransactionLogoSvg />
  },
  {
    title: 'System Wallet',
    bg: '#396CF7',
    route: '/system-wallets',
    svg: <WalletLogoSvg color="#fcfcfc" />
  },
  {
    title: 'Business Partner',
    bg: '#002486',
    route: '/business-partner',
    svg: <PartnerLogoSvg />
  }
];

const Sidebar: React.FC = () => {
  const { user, isMobile } = useLayout();
  const [contents, setContents] = useState<any[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Assuming user structure based on old project
    if (user?.user?.type === UserRole.Admin) {
      setContents(AdminSideBarContent);
    } else {
      setContents(AdminSideBarContent);
    }
  }, [user]);

  return (
    <div
      className={`flex-shrink-0 flex flex-col items-center mb-[10px] ${
        isMobile ? "px-[30px]" : "mx-[30px]"
      } ${isMobile ? '' : 'bg-[#F7F7F7]'} rounded-[10px] ${
        isMobile ? "w-full" : "w-[150px]"
      } transition-all duration-300`}
    >
      {/* Logo Section */}
      <div className={`w-full flex justify-center ${isMobile ? 'pt-[10px]' : 'pt-[20px]'} mb-[80px]`}>
        <div 
          className="cursor-pointer hover:opacity-80 transition-opacity inline-block" 
          onClick={() => router.push('/')}
        >
          <LogoHeaderSvg />
        </div>
      </div>

      <div className={`flex items-center justify-center flex-col w-full space-y-[5px] ${isMobile ? 'pt-[0px]' : 'pt-[0px]'} ${isMobile ? 'px-[2px]' : ''}`}>
        {contents.map((content, key) => {
          const isActive = pathname === content.route;
          return (
            <div
              key={key}
              style={{ 
                backgroundColor: content.bg, 
                boxShadow: 'inset 0 3px 6px rgba(255, 255, 255, 0.5)' 
              }}
              className={`hover:scale-[1.02] duration-200 transition-all h-[45px] text-white text-[12px] rounded-[10px] flex items-center justify-between cursor-pointer w-full px-[10px] ${
                isActive ? 'ring-2 ring-blue-400 ring-offset-2' : ''
              }`}
              onClick={() => router.push(content.route)}
            >
              <div className="block font-medium">{content.title}</div>
              <div className="flex items-center justify-center">{content.svg}</div>
            </div>
          );
        })}
      </div>

      <div className={`mt-auto mb-[15px] ${isMobile ? 'hidden' : ''}`}>
        <RamaazPoweredSvg />
      </div>
    </div>
  );
};

export default Sidebar;
