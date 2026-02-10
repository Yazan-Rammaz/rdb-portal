'use client';

import { User } from '@/types/users';
import TableRow, { Column } from '@/components/shared/Table/TableRow';

interface UserRowProps {
    user: User;
    handleRowClick: (userId: string) => void;
    columns: Column<User>[];
}

const UserRow = ({ user, handleRowClick, columns }: UserRowProps) => {
    return <TableRow<User> row={user} columns={columns} onClick={() => handleRowClick(user._id)} />;
};

export default UserRow;
