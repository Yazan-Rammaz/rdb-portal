'use client';

import React, { useState } from 'react';
import { notify } from '@/shared/utils/notify';

export interface FilterOption {
    value: string;
    label: string;
}

export interface FilterGroup {
    key: string;
    label: string;
    options: FilterOption[];
}

export interface TableFiltersProps {
    searchPlaceholder?: string;
    filterGroups?: FilterGroup[];
    onSearch: (query: string) => void;
    onFilterChange: (key: string, value: string) => void;
    onReset?: () => void;
    onRefresh?: () => void | Promise<void>;
    isRefreshing?: boolean;
    refreshSuccessMessage?: string;
}

const pillBase =
    'cursor-pointer inline-flex items-center px-3 py-1.5 rounded-full text-[11.5px] font-semibold border transition-all duration-150 select-none';
const pillActive = 'bg-[#002486] text-white border-[#002486] shadow-sm';
const pillInactive =
    'bg-white text-slate-500 border-slate-200 hover:border-[#396CF7] hover:text-[#396CF7]';

const TableFilters: React.FC<TableFiltersProps> = ({
    searchPlaceholder = 'Search…',
    filterGroups = [],
    onSearch,
    onFilterChange,
    onReset,
    onRefresh,
    isRefreshing = false,
    refreshSuccessMessage = 'Data refreshed',
}) => {
    const buildInitialFilterValues = () => {
        const initial: Record<string, string> = {};
        filterGroups.forEach((group) => {
            initial[group.key] = group.options[0]?.value ?? '';
        });
        return initial;
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [filterValues, setFilterValues] =
        useState<Record<string, string>>(buildInitialFilterValues);
    const [isSpinning, setIsSpinning] = useState(false);

    const isActive =
        searchQuery !== '' || filterGroups.some((g) => filterValues[g.key] !== g.options[0]?.value);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        onSearch(value);
    };

    const handlePill = (groupKey: string, value: string) => {
        setFilterValues((prev) => ({ ...prev, [groupKey]: value }));
        onFilterChange(groupKey, value);
    };

    const handleReset = () => {
        const defaults = buildInitialFilterValues();
        setSearchQuery('');
        setFilterValues(defaults);
        onSearch('');
        filterGroups.forEach((g) => {
            onFilterChange(g.key, defaults[g.key] ?? '');
        });
        onReset?.();
    };

    const handleRefresh = async () => {
        setIsSpinning(true);
        try {
            await onRefresh?.();
            notify({ message: refreshSuccessMessage, type: 'success', timeout: 2500 });
        } finally {
            setIsSpinning(false);
        }
    };

    return (
        <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-50">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg
                        className="w-3.5 h-3.5 text-slate-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="
                        w-full pl-9 pr-8 py-2 text-[13px]
                        bg-white border border-slate-200 rounded-lg
                        text-slate-700 placeholder-slate-400
                        focus:outline-none focus:border-[#396CF7] focus:ring-2 focus:ring-[#396CF7]/10
                        transition-all duration-150
                    "
                />
                {searchQuery && (
                    <button
                        onClick={() => handleSearch('')}
                        className="absolute inset-y-0 right-2.5 flex items-center text-slate-300 hover:text-slate-500 transition-colors cursor-pointer"
                        aria-label="Clear search"
                    >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                )}
            </div>

            {/* Filter groups */}
            {filterGroups.map((group) => (
                <React.Fragment key={group.key}>
                    {/* Divider */}
                    <div className="hidden sm:block w-px h-5 bg-slate-200 shrink-0" />

                    <div className="flex items-center gap-1.5">
                        <span className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-widest mr-0.5">
                            {group.label}
                        </span>
                        {group.options.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => handlePill(group.key, opt.value)}
                                className={`${pillBase} ${filterValues[group.key] === opt.value ? pillActive : pillInactive}`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </React.Fragment>
            ))}

            {/* Reset */}
            {isActive && (
                <>
                    <div className="hidden sm:block w-px h-5 bg-slate-200 shrink-0" />
                    <button
                        onClick={handleReset}
                        className="cursor-pointer inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-slate-400 hover:text-red-500 transition-colors duration-150"
                        aria-label="Reset filters"
                    >
                        <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Reset
                    </button>
                </>
            )}

            {/* Refresh */}
            {onRefresh && (
                <>
                    <div className="hidden sm:block w-px h-5 bg-slate-200 shrink-0" />
                    <button
                        onClick={handleRefresh}
                        disabled={isSpinning}
                        className="cursor-pointer inline-flex items-center justify-center w-7 h-7 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-[#396CF7] hover:border-[#396CF7] transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-60"
                        aria-label="Refresh"
                    >
                        {/* Refresh arrows icon */}
                        <svg
                            className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </>
            )}
        </div>
    );
};

export default TableFilters;
