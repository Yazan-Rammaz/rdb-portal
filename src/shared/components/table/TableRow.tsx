'use client';

import React from 'react';

export interface Column<T> {
    key: keyof T | string;
    header: string;
    render?: (value: unknown, row: T) => React.ReactNode;
    className?: string;
}

interface TableRowProps<T> {
    row: T;
    columns: Column<T>[];
    onClick?: (row: T) => void;
    className?: string;
}

function TableRow<T extends { _id: string }>({
    row,
    columns,
    onClick,
    className = '',
}: TableRowProps<T>) {
    const handleClick = () => {
        if (onClick) onClick(row);
    };

    return (
        <tr
            onClick={handleClick}
            className={`
                group border-b border-slate-100 last:border-b-0
                hover:bg-[#396CF7]/[0.03] cursor-pointer
                transition-colors duration-150
                ${className}
            `}
        >
            {columns.map((column, index) => {
                const value =
                    column.key === '_id'
                        ? row._id
                        : (row as Record<string, unknown>)[column.key as string];
                const displayValue = column.render
                    ? column.render(value, row)
                    : (value as React.ReactNode);

                return (
                    <td
                        key={index}
                        className={`
                            whitespace-nowrap px-6 py-[18px]
                            ${index === 0 ? 'relative pl-8' : ''}
                            ${column.className || ''}
                        `}
                    >
                        {/* Left accent bar — only on first cell */}
                        {index === 0 && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-sm bg-[#396CF7] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        )}

                        {displayValue !== null && displayValue !== undefined && displayValue !== '' ? (
                            <div className="text-[13px] text-slate-700 leading-snug">
                                {displayValue}
                            </div>
                        ) : (
                            <div className="text-[13px] text-slate-300">—</div>
                        )}
                    </td>
                );
            })}
        </tr>
    );
}

export default TableRow;
