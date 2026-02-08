'use client';

import React, { useState, useEffect } from 'react';
import { useLayout } from '@/context/LayoutContext';
import { TransactionLogoSvg } from '@/components/Svgs';
import { TransactionsTable } from '@/components/transactions/TransactionsTable';
import API from '@/lib/api';

export interface Filters {
    search?: string;
    crypto_contract_ids: number[];
    user_ids: number[];
    from_date?: string;
    to_date?: string;
}

export default function TransactionsPage() {
    const { isMobile } = useLayout();
    const [cryptoContracts, setCryptoContracts] = useState<any[]>([]);
    const [filters, setFilters] = useState<Filters>({
        crypto_contract_ids: [],
        user_ids: [],
    });
    const [refreshing, setRefreshing] = useState(false);
    const [loadFetch, setLoadFetch] = useState(false);
    const [depositRequestInvoices, setDepositRequestInvoices] = useState<any[]>([]);
    const [partners, setPartners] = useState<any[]>([]);

    const _fetchData = async (refetch: boolean = false) => {
        if (loadFetch) return;
        setLoadFetch(true);

        setLoadFetch(false);
    };

    const _filter = (value: Partial<Filters>) => {
        setFilters((prev: Filters) => {
            let updatedCryptoContractIds = prev.crypto_contract_ids;
            let updatedUserIds = prev.user_ids;
            let fromDate = prev.from_date;
            let toDate = prev.to_date;

            if (value.from_date && value.to_date) {
                if (fromDate === value.from_date && toDate === value.to_date) {
                    fromDate = '';
                    toDate = '';
                } else {
                    fromDate = value.from_date;
                    toDate = value.to_date;
                }
            }

            if (value.crypto_contract_ids && value.crypto_contract_ids.length > 0) {
                const newId = value.crypto_contract_ids[0];
                if (updatedCryptoContractIds.includes(newId)) {
                    updatedCryptoContractIds = updatedCryptoContractIds.filter(
                        (id) => id !== newId,
                    );
                } else {
                    updatedCryptoContractIds = [...updatedCryptoContractIds, newId];
                }
            }

            if (value.user_ids && value.user_ids.length > 0) {
                const newUserId = value.user_ids[0];
                if (updatedUserIds.includes(newUserId)) {
                    updatedUserIds = updatedUserIds.filter((id) => id !== newUserId);
                } else {
                    updatedUserIds = [...updatedUserIds, newUserId];
                }
            }

            return {
                ...prev,
                ...value,
                from_date: fromDate,
                to_date: toDate,
                crypto_contract_ids: updatedCryptoContractIds,
                user_ids: updatedUserIds,
            };
        });
    };

    useEffect(() => {
        _fetchData();
    }, [filters]);

    return (
        <div className="p-4">
            <TransactionsTable
                filters={filters}
                loadFetch={loadFetch}
                cryptoContracts={cryptoContracts}
                refreshing={refreshing}
                depositRequestInvoices={depositRequestInvoices}
                partners={partners}
                _refresh={(refetch: boolean) => {
                    if (!loadFetch) _fetchData(refetch);
                }}
                _filter={_filter}
                title={
                    <div className="flex items-center gap-2">
                        <TransactionLogoSvg color="#5D5D5D" w="20" h="20" />
                        <span className="text-xl font-bold text-[#5D5D5D]">Transactions</span>
                    </div>
                }
            />
        </div>
    );
}
