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
                <div className="spinner"></div>
            </div>
        </div>
    );
};

export default LoadingOverlay;
