'use client';

import React from 'react';

interface LoadingOverlayProps {
    loading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ loading }) => {
    if (!loading) return null;

    return (
        <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center backdrop-blur-[1px] z-50">
            <div className="w-screen h-screen flex items-center justify-center backdrop-blur-[1px]">
                <svg
                    className="w-12 h-12 animate-spin text-[#396CF7]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                    />
                    <path
                        className="opacity-75"
                        fill="none"
                        d="M12 2 A10 10 0 1 1 2 12"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        </div>
    );
};

export default LoadingOverlay;
