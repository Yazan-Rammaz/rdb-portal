'use client';

import React from 'react';

export interface Column<T> {
    key: keyof T | string;
    header: string;
    render?: (value: unknown, row: T) => React.ReactNode;
    className?: string;
}

interface TableHeaderProps<T> {
    columns: Column<T>[];
    className?: string;
}

function TableHeader<T>({ columns, className = '' }: TableHeaderProps<T>) {
    return (
        <thead>
            <tr className="bg-[#F8FAFD]">
                {columns.map((column, index) => (
                    <th
                        key={index}
                        className={`
                            px-6 py-3.5 text-left select-none
                            text-[10.5px] font-semibold tracking-[0.11em] uppercase
                            text-slate-400 border-b border-slate-200/80
                            ${column.className || ''}
                        `}
                    >
                        {column.header}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

export default TableHeader;
