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

const ChevronLeft = () => (
    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const ChevronRight = () => (
    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
);

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
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 0; i < totalPages; i++) pages.push(i);
            return pages;
        }

        const half = Math.floor(maxVisible / 2);
        let start = Math.max(0, page - half);
        const end = Math.min(totalPages - 1, start + maxVisible - 1);
        if (end - start + 1 < maxVisible) start = Math.max(0, end - maxVisible + 1);

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

    const startItem = page * limit + 1;
    const endItem = Math.min((page + 1) * limit, total);

    const navBtn = `
        cursor-pointer inline-flex items-center justify-center
        w-7 h-7 rounded-lg text-slate-400
        hover:text-[#002486] hover:bg-[#002486]/[0.06]
        disabled:opacity-30 disabled:cursor-not-allowed
        transition-all duration-150
    `;

    const pageBtn = (active: boolean) => `
        cursor-pointer inline-flex items-center justify-center
        w-7 h-7 rounded-lg text-xs font-semibold
        transition-all duration-150
        ${active
            ? 'bg-[#002486] text-white shadow-sm shadow-[#002486]/30'
            : 'text-slate-500 hover:text-[#002486] hover:bg-[#002486]/[0.06]'
        }
    `;

    return (
        <div className="px-6 py-3.5 flex items-center justify-between border-t border-slate-100 bg-[#F8FAFD]">
            {/* Count */}
            <p className="text-[11px] text-slate-400 tabular-nums">
                <span className="font-semibold text-slate-600">{startItem}–{endItem}</span>
                {' '}of{' '}
                <span className="font-semibold text-slate-600">{total}</span>
            </p>

            {/* Controls */}
            <nav className="flex items-center gap-0.5" aria-label="Pagination">
                <button
                    onClick={() => onPageChange(Math.max(0, page - 1))}
                    disabled={!hasPrevious}
                    className={navBtn}
                    aria-label="Previous page"
                >
                    <ChevronLeft />
                </button>

                {getPageNumbers().map((pn, idx) => (
                    <React.Fragment key={idx}>
                        {pn === '...' ? (
                            <span className="w-7 text-center text-xs text-slate-300 select-none">…</span>
                        ) : (
                            <button
                                onClick={() => onPageChange(pn as number)}
                                className={pageBtn(page === pn)}
                                aria-current={page === pn ? 'page' : undefined}
                            >
                                {(pn as number) + 1}
                            </button>
                        )}
                    </React.Fragment>
                ))}

                <button
                    onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))}
                    disabled={!hasNext}
                    className={navBtn}
                    aria-label="Next page"
                >
                    <ChevronRight />
                </button>
            </nav>
        </div>
    );
};

export default Pagination;
