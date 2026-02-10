'use client';

import React, { useState, useEffect } from 'react';
import { getUsers } from '@/services/users-service';
import { User, UsersResponse } from '@/types/users';
import UserRow from './components/UserRow';
import UserFilters from './UserFilters';
import UserCell from './components/UserCell';
import UserActions from './components/UserActions';
import Pagination from '@/components/shared/Table/Pagination';
import LoadingTable from '@/components/shared/Table/LoadingTable';
import ErrorFetch from '@/components/shared/Table/ErrorFetch';
import TableHeader, { Column } from '@/components/shared/Table/TableHeader';
import DraggableRDBModal from './components/DraggableRDBModal';
import { RDB } from 'ramaaz-digital-banking'; // Uncomment when importing the actual RDB component
import { serverActions } from '@/utils/rdb';

const UsersTable = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isRdbModalOpen, setIsRdbModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [pagination, setPagination] = useState<{
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
    }>({
        page: 0,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrevious: false,
    });
    const [filters, setFilters] = useState<{
        search: string;
        status: 'all' | 'active' | 'blocked';
        verified: 'all' | 'verified' | 'unverified';
    }>({
        search: '',
        status: 'all',
        verified: 'all',
    });

    const fetchUsers = async (page: number = 0, limit: number = 10) => {
        setLoading(true);
        setError(null);
        try {
            // Build query parameters including filters
            const params: any = { page, limit };
            if (filters.search) {
                params.search = filters.search;
            }
            if (filters.status !== 'all') {
                params.status = filters.status;
            }
            if (filters.verified !== 'all') {
                params.verified = filters.verified;
            }

            const response: UsersResponse = await getUsers(params);
            setUsers(response.items);
            setPagination({
                page,
                limit,
                total: response.total,
                totalPages: response.totalPages,
                hasNext: response.hasNext,
                hasPrevious: response.hasPrevious,
            });
        } catch (err: any) {
            setError(err.message || 'Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(0, 10);
    }, []);

    const handleFilterChange = (newFilters: {
        search?: string;
        status?: 'all' | 'active' | 'blocked';
        verified?: 'all' | 'verified' | 'unverified';
    }) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilters,
        }));
        fetchUsers(0, pagination.limit);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < pagination.totalPages) {
            fetchUsers(newPage, pagination.limit);
        }
    };

    const handleRowClick = (userId: string) => {
        console.log('User clicked:', userId);
    };

    const handleEdit = (user: User) => {
        console.log('Edit user:', user);
        // TODO: Implement edit functionality
    };

    const handleDelete = (userId: string) => {
        console.log('Delete user:', userId);
        // TODO: Implement delete functionality
    };

    const handleBlock = (userId: string) => {
        console.log('Block/Unblock user:', userId);
        // TODO: Implement block/unblock functionality
    };
    const handleRdbOpen = (userId: string) => {
        setSelectedUserId(userId);
        setIsRdbModalOpen(true);
    };

    if (error) {
        return (
            <ErrorFetch error={error} fetch={() => fetchUsers(pagination.page, pagination.limit)} />
        );
    }

    const columns: Column<User>[] = [
        {
            key: 'name',
            header: 'Name',
            render: (value: any, user: User) => (
                <UserCell user={user} column={{ key: 'name', header: 'Name' }} />
            ),
        },
        {
            key: 'email',
            header: 'Email',
            render: (value: any, user: User) => (
                <UserCell user={user} column={{ key: 'email', header: 'Email' }} />
            ),
        },
        {
            key: 'phoneNumber',
            header: 'Phone',
            render: (value: any, user: User) => (
                <UserCell user={user} column={{ key: 'phoneNumber', header: 'Phone' }} />
            ),
        },
        {
            key: 'isBlocked',
            header: 'Status',
            render: (value: any, user: User) => (
                <UserCell user={user} column={{ key: 'isBlocked', header: 'Status' }} />
            ),
        },
        {
            key: 'verified',
            header: 'Verified',
            render: (value: any, user: User) => (
                <UserCell user={user} column={{ key: 'verified', header: 'Verified' }} />
            ),
        },
        {
            key: 'createdAt',
            header: 'Created',
            render: (value: any, user: User) => (
                <UserCell user={user} column={{ key: 'createdAt', header: 'Created' }} />
            ),
        },
        {
            key: 'actions',
            header: 'Actions',
            render: (_: any, user: User) => (
                <UserActions
                    user={user}
                    onEdit={(user) => handleEdit(user)}
                    onDelete={(userId) => handleDelete(userId)}
                    onBlock={(userId) => handleBlock(userId)}
                    onRdbOpen={(userId) => handleRdbOpen(userId)}
                />
            ),
        },
    ];

    return (
        <div className="bg-white mt-10 rounded-lg shadow overflow-hidden">
            {/* Filters */}
            <div className="p-4 border-b border-gray-200">
                {/* <UserFilters
                    onSearch={(search) => handleFilterChange({ search })}
                    onFilterChange={(filters) => handleFilterChange(filters)}
                /> */}
            </div>

            <div className="overflow-x-auto relative">
                <table className="min-w-full divide-y divide-gray-200">
                    <TableHeader<User> columns={columns} />
                    <tbody
                        className={`bg-white divide-y divide-gray-200 ${loading && users.length > 0 ? 'opacity-60' : ''}`}
                    >
                        {users.map((user, i) => (
                            <UserRow
                                handleRowClick={handleRowClick}
                                key={`${user._id}-${i}`}
                                user={user}
                                columns={columns}
                            />
                        ))}
                    </tbody>
                </table>

                <LoadingTable loading={loading} hasData={users.length > 0} />
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

            {/* Draggable RDB Modal */}
            <DraggableRDBModal
                isOpen={isRdbModalOpen}
                onClose={() => {
                    setIsRdbModalOpen(false);
                    setSelectedUserId(null);
                }}
            >
                <div className="py-1 h-full">
                    {/* <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        User RDB Details - {selectedUserId}
                    </h2> */}

                    {/* RDB Component - Replace with actual RDB component import */}
                    {/* Example implementation: */}
                    <RDB
                        baseUrl="https://trydos_wallet_develop.ramaaz.dev"
                        authToken={selectedUserId || 'unknown_user'}
                        actions={serverActions}
                        handleUnauthenticated={() => {
                            console.log('user not authenticated');
                            setIsRdbModalOpen(false);
                            setSelectedUserId(null);
                        }}
                        // ... other props from ramaaz-digital-banking
                    />

                    {/* Placeholder */}
                    {/* <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
                        <p className="text-gray-600 text-center">
                            RDB Component will be rendered here for user:{' '}
                            <strong>{selectedUserId}</strong>
                        </p>
                        <p className="text-sm text-gray-500 text-center mt-2">
                            Import and use the RDB component from ramaaz-digital-banking package
                        </p>
                    </div> */}
                </div>
            </DraggableRDBModal>
        </div>
    );
};

export default UsersTable;
