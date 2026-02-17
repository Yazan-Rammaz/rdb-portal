import React from 'react';

type LoadingTableProps = {
    loading?: boolean;
    hasData?: boolean;
};

const LoadingTable: React.FC<LoadingTableProps> = ({ loading = true, hasData = false }) => {
    if (!loading) return null;

    // Full placeholder when there's no data yet
    if (!hasData) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Small centered overlay spinner when refreshing existing data
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
    );
};

export default LoadingTable;
