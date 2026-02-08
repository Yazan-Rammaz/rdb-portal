'use client';

import LoginForm from '@/components/auth/LoginForm';
import { GuestGuard } from '@/components/auth/GuestGuard';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { user } = useAuth();

  const handlePasswordReset = () => {
    // This will be implemented when we migrate the reset password page
    console.log('Navigating to password reset...');
  };

  return (
    <GuestGuard>
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <LoginForm user={user} onChangePassword={handlePasswordReset} />
      </div>
    </GuestGuard>
  );
}
