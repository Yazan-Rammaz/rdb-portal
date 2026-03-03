'use client';

import type { User } from '../types';
import TableRow, { type Column } from '@/shared/components/table/TableRow';

interface UserRowProps {
    user: User;
    handleRowClick: (userId: string) => void;
    columns: Column<User>[];
}

const UserRow = ({ user, handleRowClick, columns }: UserRowProps) => {
    return <TableRow<User> row={user} columns={columns} onClick={() => handleRowClick(user._id)} />;
};

export default UserRow;
