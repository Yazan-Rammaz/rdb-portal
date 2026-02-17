'use client';

import React from 'react';

interface LoginOptionsProps {
    onLogout: () => void;
    onChangePassword: () => void;
}

const LoginOptions: React.FC<LoginOptionsProps> = ({ onLogout, onChangePassword }) => {
    return (
        <div className="flex w-full items-center justify-center gap-10 py-4">
            {/* Clear Login */}
            <div
                className="group flex cursor-pointer flex-col items-center justify-center transition-transform hover:scale-110"
                onClick={onLogout}
                title="Clear Login"
            >
                <div
                    className="h-3.75 w-3.75 bg-[#8e8e8e] transition-colors group-hover:bg-[#ea4343]"
                    style={{
                        maskImage: 'url(/assets/icons/auth/svg/clear_login.svg)',
                        maskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskImage: 'url(/assets/icons/auth/svg/clear_login.svg)',
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                    }}
                />
            </div>

            {/* Change User */}
            <div
                className="group flex cursor-pointer flex-col items-center justify-center transition-transform hover:scale-110"
                onClick={onLogout}
                title="Change User"
            >
                <div
                    className="h-3.75 w-3.75 bg-[#8e8e8e] transition-colors group-hover:bg-[#3066cc]"
                    style={{
                        maskImage: 'url(/assets/icons/auth/svg/change_user.svg)',
                        maskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskImage: 'url(/assets/icons/auth/svg/change_user.svg)',
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                    }}
                />
            </div>

            {/* Forget Password */}
            <div
                className="group flex cursor-pointer flex-col items-center justify-center transition-transform hover:scale-110"
                onClick={onChangePassword}
                title="Forget Password"
            >
                <div
                    className="h-3.75 w-3.75 bg-[#8e8e8e] transition-colors group-hover:bg-[#eb7f00]"
                    style={{
                        maskImage: 'url(/assets/icons/auth/svg/forget_password.svg)',
                        maskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskImage: 'url(/assets/icons/auth/svg/forget_password.svg)',
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                    }}
                />
            </div>
        </div>
    );
};

export default LoginOptions;
