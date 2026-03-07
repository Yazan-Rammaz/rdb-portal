'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useUsers, useUserMutations } from '@/features/users';
// import 'rdb/styles';
import type { User, UsersParams } from '@/features/users';
import UserRow from './UserRow';
import UserCell from './UserCell';
import UserActions from './UserActions';
import UserFilters from './UserFilters';
import DraggableRDBModal from './DraggableRDBModal';
import Pagination from '@/shared/components/table/Pagination';
import LoadingTable from '@/shared/components/table/LoadingTable';
import TableHeader, { type Column } from '@/shared/components/table/TableHeader';
// import { RDB } from 'rdb';
import { serverActions } from '@/lib/rdb';
import { notify } from '@/shared/utils/notify';

const UsersTable = () => {
    const [page, setPage] = useState(0);
    const [limit] = useState(10);
    const [isRdbModalOpen, setIsRdbModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [filters, setFilters] = useState<{
        search: string;
        status: 'all' | 'active' | 'blocked';
        verified: 'all' | 'verified' | 'unverified';
    }>({
        search: '',
        status: 'all',
        verified: 'all',
    });

    const queryParams: UsersParams = useMemo(() => {
        const params: UsersParams = { page, limit };
        if (filters.search) params.search = filters.search;
        if (filters.status !== 'all') params.status = filters.status;
        return params;
    }, [filters.search, filters.status, limit, page]);

    const { data, isLoading, error, refetch } = useUsers(queryParams);
    const users = data?.items ?? [];

    // Toast on error — never replace the table with an error screen
    useEffect(() => {
        if (error) {
            notify({ message: error.message, type: 'error', timeout: 5000 });
        }
    }, [error]);

    const {
        blockUser: doBlockUser,
        unblockUser: doUnblockUser,
        deleteUser: doDeleteUser,
        isBlocking,
        isDeleting,
    } = useUserMutations();

    const pagination = {
        page,
        limit,
        total: data?.total ?? 0,
        totalPages: data?.totalPages ?? 0,
        hasNext: data?.hasNext ?? false,
        hasPrevious: data?.hasPrevious ?? false,
    };

    const handleFilterChange = (newFilters: {
        search?: string;
        status?: 'all' | 'active' | 'blocked';
        verified?: 'all' | 'verified' | 'unverified';
    }) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
        setPage(0);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < pagination.totalPages) setPage(newPage);
    };

    const handleRowClick = (userId: string) => {
        console.log('User clicked:', userId);
    };

    const handleEdit = (user: User) => {
        console.log('Edit user:', user);
    };

    const handleDelete = (userId: string) => {
        doDeleteUser(userId);
    };

    const handleBlock = (userId: string) => {
        const user = users.find((u) => u._id === userId);
        if (user?.isBlocked) {
            doUnblockUser(userId);
        } else {
            doBlockUser(userId);
        }
    };

    const handleRdbOpen = (userId: string) => {
        setSelectedUserId(userId);
        setIsRdbModalOpen(true);
    };

    const columns: Column<User>[] = [
        {
            key: 'name',
            header: 'Name',
            render: (_value, user) => (
                <UserCell user={user} column={{ key: 'name', header: 'Name' }} />
            ),
        },
        {
            key: 'email',
            header: 'Email',
            render: (_value, user) => (
                <UserCell user={user} column={{ key: 'email', header: 'Email' }} />
            ),
        },
        {
            key: 'phoneNumber',
            header: 'Phone',
            render: (_value, user) => (
                <UserCell user={user} column={{ key: 'phoneNumber', header: 'Phone' }} />
            ),
        },
        {
            key: 'isBlocked',
            header: 'Status',
            render: (_value, user) => (
                <UserCell user={user} column={{ key: 'isBlocked', header: 'Status' }} />
            ),
        },
        {
            key: 'verified',
            header: 'Verified',
            render: (_value, user) => (
                <UserCell user={user} column={{ key: 'verified', header: 'Verified' }} />
            ),
        },
        {
            key: 'createdAt',
            header: 'Created',
            render: (_value, user) => (
                <UserCell user={user} column={{ key: 'createdAt', header: 'Created' }} />
            ),
        },
        {
            key: 'actions',
            header: 'Actions',
            render: (_value, user) => (
                <UserActions
                    user={user}
                    onEdit={(rowUser) => handleEdit(rowUser)}
                    onDelete={(userId) => handleDelete(userId)}
                    onBlock={(userId) => handleBlock(userId)}
                    onRdbOpen={(userId) => handleRdbOpen(userId)}
                    isBlocking={isBlocking}
                    isDeleting={isDeleting}
                />
            ),
        },
    ];

    // Refreshing = loading while already showing rows (page/filter change)
    const isRefreshing = isLoading && users.length > 0;

    return (
        <div className="mt-10 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden relative">
            {/* Thin progress bar on refresh — rows stay visible */}
            {isRefreshing && (
                <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden z-20">
                    <div className="animate-table-progress" />
                </div>
            )}

            {/* Filters */}
            <div className="px-5 py-4 border-b border-slate-100">
                <UserFilters
                    onSearch={(search) => handleFilterChange({ search })}
                    onFilterChange={(updatedFilters) => handleFilterChange(updatedFilters)}
                    onRefresh={refetch}
                    isRefreshing={isRefreshing}
                    refreshSuccessMessage="Users data refreshed"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <TableHeader<User> columns={columns} />
                    <tbody className="bg-white">
                        {isLoading && users.length === 0 ? (
                            /* Initial load — show skeleton rows */
                            <LoadingTable columnCount={columns.length} rowCount={10} />
                        ) : (
                            /* Rows always visible — never hidden during refresh or error */
                            users.map((user, i) => (
                                <UserRow
                                    handleRowClick={handleRowClick}
                                    key={`${user._id}-${i}`}
                                    user={user}
                                    columns={columns}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <Pagination
                    page={pagination.page}
                    limit={pagination.limit}
                    total={pagination.total}
                    totalPages={pagination.totalPages}
                    hasNext={pagination.hasNext}
                    hasPrevious={pagination.hasPrevious}
                    onPageChange={handlePageChange}
                />
            )}

            {/* RDB Modal */}
            <DraggableRDBModal
                isOpen={isRdbModalOpen}
                onClose={() => {
                    setIsRdbModalOpen(false);
                    setSelectedUserId(null);
                }}
            >
                <div className="py-1 h-full">
                    {/* <RDB
                        authToken={undefined}
                        actions={serverActions}
                        handleUnauthenticated={() => {
                            console.log('user not authenticated');
                            setIsRdbModalOpen(false);
                            setSelectedUserId(null);
                        }}
                    /> */}
                </div>
            </DraggableRDBModal>
        </div>
    );
};

export default UsersTable;
