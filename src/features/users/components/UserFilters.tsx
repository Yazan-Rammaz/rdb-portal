'use client';

import React from 'react';
import TableFilters, { type FilterGroup } from '@/shared/components/table/TableFilters';

interface FilterOptions {
    status?: 'all' | 'active' | 'blocked';
    verified?: 'all' | 'verified' | 'unverified';
}

interface UserFiltersProps {
    onSearch: (query: string) => void;
    onFilterChange: (filters: FilterOptions) => void;
    onRefresh?: () => void | Promise<void>;
    isRefreshing?: boolean;
    refreshSuccessMessage?: string;
}

const FILTER_GROUPS: FilterGroup[] = [
    {
        key: 'status',
        label: 'Status',
        options: [
            { value: 'all', label: 'All' },
            { value: 'active', label: 'Active' },
            { value: 'blocked', label: 'Blocked' },
        ],
    },
    {
        key: 'verified',
        label: 'KYC',
        options: [
            { value: 'all', label: 'All' },
            { value: 'verified', label: 'Verified' },
            { value: 'unverified', label: 'Unverified' },
        ],
    },
];

const UserFilters: React.FC<UserFiltersProps> = ({
    onSearch,
    onFilterChange,
    onRefresh,
    isRefreshing,
    refreshSuccessMessage,
}) => {
    const filters: FilterOptions = {};

    const handleFilterChange = (key: string, value: string) => {
        if (key === 'status') {
            filters.status = value as FilterOptions['status'];
        } else if (key === 'verified') {
            filters.verified = value as FilterOptions['verified'];
        }
        onFilterChange({ ...filters });
    };

    return (
        <TableFilters
            searchPlaceholder="Search by name, email or phone…"
            filterGroups={FILTER_GROUPS}
            onSearch={onSearch}
            onFilterChange={handleFilterChange}
            onRefresh={onRefresh}
            isRefreshing={isRefreshing}
            refreshSuccessMessage={refreshSuccessMessage}
        />
    );
};

export default UserFilters;
