'use client';

import React from 'react';

export interface Column<T> {
    key: keyof T | string;
    header: string;
    render?: (value: any, row: T) => React.ReactNode;
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
        if (onClick) {
            onClick(row);
        }
    };

    return (
        <tr
            key={row._id}
            onClick={handleClick}
            className={`hover:bg-gray-50 cursor-pointer transition-colors ${className}`}
        >
            {columns.map((column, index) => {
                const value = column.key === '_id' ? row._id : (row as any)[column.key];
                const displayValue = column.render ? column.render(value, row) : value;

                return (
                    <td
                        key={index}
                        className={`px-6 py-4 whitespace-nowrap ${column.className || ''}`}
                    >
                        <div className="text-sm text-gray-900">{displayValue}</div>
                    </td>
                );
            })}
        </tr>
    );
}

export default TableRow;
