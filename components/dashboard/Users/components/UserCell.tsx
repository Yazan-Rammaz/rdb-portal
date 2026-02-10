'use client';

import React from 'react';
import { User } from '@/types/users';
import { Column } from '@/components/shared/Table/TableHeader';

interface UserCellProps {
    user: User;
    column: Column<User>;
}

const UserCell: React.FC<UserCellProps> = ({ user, column }) => {
    const renderCell = () => {
        if (column.key === 'name') {
            const name =
                user.firstName || user.lastName
                    ? `${user.firstName} ${user.lastName}`.trim()
                    : 'N/A';
            return <div className="text-sm font-medium text-gray-900">{name}</div>;
        }

        if (column.key === 'email') {
            return <div className="text-sm text-gray-900">{user.email || 'N/A'}</div>;
        }

        if (column.key === 'phoneNumber') {
            return <div className="text-sm text-gray-900">{user.phoneNumber || 'N/A'}</div>;
        }

        if (column.key === 'isBlocked') {
            return (
                <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}
                >
                    {user.isBlocked ? 'Blocked' : 'Active'}
                </span>
            );
        }

        if (column.key === 'verified') {
            return (
                <div className="text-sm text-gray-900">
                    {user.isEmailVerified ? '✓ Email' : '✗ Email'}
                    {user.isPhoneVerified ? ' ✓ Phone' : ' ✗ Phone'}
                </div>
            );
        }

        if (column.key === 'createdAt') {
            return (
                <div className="text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                </div>
            );
        }

        return (
            <div className="text-sm text-gray-900">{user[column.key as keyof User] || 'N/A'}</div>
        );
    };

    return renderCell();
};

export default UserCell;
