'use client';

import React from 'react';

export interface Column<T> {
    key: keyof T | string;
    header: string;
    render?: (value: any, row: T) => React.ReactNode;
    className?: string;
}

interface TableHeaderProps<T> {
    columns: Column<T>[];
    className?: string;
}

function TableHeader<T>({ columns, className = '' }: TableHeaderProps<T>) {
    return (
        <thead className="bg-gray-50">
            <tr>
                {columns.map((column, index) => (
                    <th
                        key={index}
                        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''}`}
                    >
                        {column.header}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

export default TableHeader;
