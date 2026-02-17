'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../hooks';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { isUnlocked, user } = useAuth();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!user || !user.accessToken || !isUnlocked) {
            const redirectUrl = encodeURIComponent(pathname);
            // router.replace(`/login?redirect=${redirectUrl}`);
        } else {
            setIsReady(true);
        }
    }, [user, isUnlocked, router, pathname]);

    if (!isReady) {
        return null;
    }

    return <>{children}</>;
}
