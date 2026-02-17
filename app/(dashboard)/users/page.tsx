import { UserTable } from '@/src/features/users/components';
export default function UsersPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold">Users</h1>
            <p>Manage user here.</p>
            <UserTable />
        </div>
    );
}
