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
            for (let i = 0; i < totalPages; i++) pages.push(i);
            return pages;
        }

        const half = Math.floor(maxVisiblePages / 2);
        let start = Math.max(0, page - half);
        let end = Math.min(totalPages - 1, start + maxVisiblePages - 1);

        if (end - start + 1 < maxVisiblePages) start = Math.max(0, end - maxVisiblePages + 1);

        if (start > 0) {
            pages.push(0);
            if (start > 1) pages.push('...');
        }

        for (let i = start; i <= end; i++) pages.push(i);

        if (end < totalPages - 1) {
            if (end < totalPages - 2) pages.push('...');
            pages.push(totalPages - 1);
        }

        return pages;
    };

    const shownCount = Math.min((page + 1) * limit, total);

    return (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            {/* Left: shown count */}
            <div>
                <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{shownCount}</span> of{' '}
                    <span className="font-medium">{total}</span>
                </p>
            </div>

            {/* Mobile compact controls: boxed page numbers with dots */}
            <div className="flex-1 flex items-center justify-end sm:hidden">
                <nav className="flex items-center gap-2" aria-label="Mobile pagination">
                    <button
                        onClick={() => onPageChange(Math.max(0, page - 1))}
                        disabled={!hasPrevious}
                        className="cursor-pointer inline-flex items-center justify-center p-2 rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous page"
                    >
                        <svg
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.293 3.707a1 1 0 010 1.414L8.414 11l3.879 5.879a1 1 0 11-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    {getPageNumbers().map((pn, i, arr) => (
                        <React.Fragment key={i}>
                            {pn === '...' ? (
                                <span className="text-gray-400">...</span>
                            ) : (
                                <button
                                    onClick={() => onPageChange(pn as number)}
                                    className={`cursor-pointer inline-flex items-center justify-center w-8 h-8 text-sm font-medium border rounded-md ${
                                        page === pn
                                            ? 'bg-blue-600 border-blue-600 text-white'
                                            : 'bg-white border-gray-200 text-gray-700'
                                    }`}
                                >
                                    {(pn as number) + 1}
                                </button>
                            )}
                        </React.Fragment>
                    ))}

                    <button
                        onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))}
                        disabled={!hasNext}
                        className="cursor-pointer inline-flex items-center justify-center p-2 rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next page"
                    >
                        <svg
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.707 16.293a1 1 0 010-1.414L11.586 11 7.707 7.121a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </nav>
            </div>

            {/* Desktop numbered pagination */}
            <div className="hidden sm:flex sm:items-center sm:justify-end">
                <nav
                    className="relative z-0 inline-flex items-center space-x-2"
                    aria-label="Pagination"
                >
                    <button
                        onClick={() => onPageChange(Math.max(0, page - 1))}
                        disabled={!hasPrevious}
                        className="inline-flex items-center justify-center p-2 rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous page"
                    >
                        <svg
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.293 16.293a1 1 0 010-1.414L15.586 11H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    {getPageNumbers().map((pageNum, idx) => (
                        <React.Fragment key={idx}>
                            {pageNum === '...' ? (
                                <span className="inline-flex items-center justify-center px-3 py-1 text-sm text-gray-500">
                                    ...
                                </span>
                            ) : (
                                <button
                                    onClick={() => onPageChange(pageNum as number)}
                                    className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium border ${
                                        page === pageNum
                                            ? 'bg-blue-600 border-blue-600 text-white'
                                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                                    }`}
                                    aria-current={page === pageNum ? 'page' : undefined}
                                >
                                    {(pageNum as number) + 1}
                                </button>
                            )}
                        </React.Fragment>
                    ))}

                    <button
                        onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))}
                        disabled={!hasNext}
                        className="inline-flex items-center justify-center p-2 rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next page"
                    >
                        <svg
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.707 3.707a1 1 0 010 1.414L4.414 9H16a1 1 0 110 2H4.414l3.293 3.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default Pagination;
