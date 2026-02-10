'use client';

import React from 'react';

interface PaginationProps {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    page,
    limit,
    total,
    totalPages,
    hasNext,
    hasPrevious,
    onPageChange,
}) => {
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 0; i < totalPages; i++) {
                pages.push(i);
            }
        } else {
            const halfVisible = Math.floor(maxVisiblePages / 2);
            let start = Math.max(0, page - halfVisible);
            let end = Math.min(totalPages - 1, start + maxVisiblePages - 1);

            if (end - start + 1 < maxVisiblePages) {
                start = Math.max(0, end - maxVisiblePages + 1);
            }

            if (start > 0) {
                pages.push(0);
                if (start > 1) pages.push('...');
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalPages - 1) {
                if (end < totalPages - 2) pages.push('...');
                pages.push(totalPages - 1);
            }
        }

        return pages;
    };

    return (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            {/* Mobile pagination */}
            <div className="flex-1 flex justify-between sm:hidden">
                <button
                    onClick={() => onPageChange(0)}
                    disabled={!hasPrevious}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    First
                </button>
                <button
                    onClick={() => onPageChange(page - 1)}
                    disabled={!hasPrevious}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <button
                    onClick={() => onPageChange(page + 1)}
                    disabled={!hasNext}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
                <button
                    onClick={() => onPageChange(totalPages - 1)}
                    disabled={!hasNext}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Last
                </button>
            </div>

            {/* Desktop pagination */}
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{page * limit + 1}</span> to{' '}
                        <span className="font-medium">{Math.min((page + 1) * limit, total)}</span>{' '}
                        of <span className="font-medium">{total}</span> results
                    </p>
                </div>
                <div>
                    <nav
                        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                        aria-label="Pagination"
                    >
                        <button
                            onClick={() => onPageChange(0)}
                            disabled={!hasPrevious}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="sr-only">First</span>
                            ««
                        </button>
                        <button
                            onClick={() => onPageChange(page - 1)}
                            disabled={!hasPrevious}
                            className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="sr-only">Previous</span>«
                        </button>

                        {getPageNumbers().map((pageNum, index) => (
                            <React.Fragment key={index}>
                                {pageNum === '...' ? (
                                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                        ...
                                    </span>
                                ) : (
                                    <button
                                        onClick={() => onPageChange(pageNum as number)}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                            page === pageNum
                                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                        }`}
                                    >
                                        {(pageNum as number) + 1}
                                    </button>
                                )}
                            </React.Fragment>
                        ))}

                        <button
                            onClick={() => onPageChange(page + 1)}
                            disabled={!hasNext}
                            className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="sr-only">Next</span>»
                        </button>
                        <button
                            onClick={() => onPageChange(totalPages - 1)}
                            disabled={!hasNext}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="sr-only">Last</span>
                            »»
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
