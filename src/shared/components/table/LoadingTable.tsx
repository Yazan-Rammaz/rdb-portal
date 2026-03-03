'use client';

import React from 'react';

interface LoadingTableProps {
    columnCount: number;
    rowCount?: number;
}

// Varied shimmer widths so rows feel organic, not stamped
const CELL_WIDTHS = [
    ['w-32', 'w-40', 'w-28', 'w-16', 'w-20', 'w-24', 'w-12'],
    ['w-28', 'w-32', 'w-36', 'w-20', 'w-16', 'w-28', 'w-12'],
    ['w-36', 'w-24', 'w-28', 'w-16', 'w-20', 'w-20', 'w-12'],
    ['w-24', 'w-36', 'w-32', 'w-20', 'w-16', 'w-32', 'w-12'],
    ['w-40', 'w-28', 'w-24', 'w-20', 'w-20', 'w-24', 'w-12'],
];

const LoadingTable: React.FC<LoadingTableProps> = ({ columnCount, rowCount = 9 }) => {
    return (
        <>
            {Array.from({ length: rowCount }).map((_, rowIdx) => (
                <tr key={rowIdx} className="border-b border-slate-100 last:border-b-0">
                    {Array.from({ length: columnCount }).map((_, colIdx) => {
                        const widths = CELL_WIDTHS[rowIdx % CELL_WIDTHS.length];
                        const width = widths[colIdx % widths.length];
                        const delay = (rowIdx * 60 + colIdx * 40) % 600;

                        return (
                            <td
                                key={colIdx}
                                className={`px-6 py-4.5 ${colIdx === 0 ? 'pl-8' : ''}`}
                            >
                                <div
                                    className={`h-3 rounded-full animate-shimmer ${width}`}
                                    style={{ animationDelay: `${delay}ms` }}
                                />
                            </td>
                        );
                    })}
                </tr>
            ))}
        </>
    );
};

export default LoadingTable;
