'use client';

import React, { useState } from 'react';
import { SearchSvg } from '@/src/shared/components/ui/Svgs';

interface UserFiltersProps {
    onSearch: (query: string) => void;
    onFilterChange: (filters: FilterOptions) => void;
}

interface FilterOptions {
    status?: 'all' | 'active' | 'blocked';
    verified?: 'all' | 'verified' | 'unverified';
}

const UserFilters: React.FC<UserFiltersProps> = ({ onSearch, onFilterChange }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<FilterOptions>({
        status: 'all',
        verified: 'all',
    });

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        onSearch(value);
    };

    const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newFilters = {
            ...filters,
            status: e.target.value as FilterOptions['status'],
        };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleVerifiedFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newFilters = {
            ...filters,
            verified: e.target.value as FilterOptions['verified'],
        };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search Input */}
            <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchSvg />
                </div>
                <input
                    type="text"
                    placeholder="Search users by name, email, or phone..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            {/* Status Filter */}
            <select
                value={filters.status}
                onChange={handleStatusFilterChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
            </select>

            {/* Verified Filter */}
            <select
                value={filters.verified}
                onChange={handleVerifiedFilterChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
                <option value="all">All Verification</option>
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
            </select>
        </div>
    );
};

export default UserFilters;
