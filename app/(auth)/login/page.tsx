'use client';

import { LoginForm, GuestGuard, useAuth } from '@/features/auth';

export default function LoginPage() {
    const { user } = useAuth();

    const handlePasswordReset = () => {
        console.log('Navigating to password reset...');
    };

    return (
        <GuestGuard>
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <LoginForm user={user || undefined} onChangePassword={handlePasswordReset} />
            </div>
        </GuestGuard>
    );
}
