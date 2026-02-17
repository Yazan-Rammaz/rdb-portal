'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks';

export default function GuestGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isUnlocked, user } = useAuth();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (user && user.admin?.id && isUnlocked) {
            router.replace('/');
        } else {
            setIsReady(true);
        }
    }, [user, isUnlocked, router]);

    if (!isReady) {
        return null;
    }

    return <>{children}</>;
}
