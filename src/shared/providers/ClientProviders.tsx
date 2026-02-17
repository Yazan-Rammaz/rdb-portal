'use client';

import React, { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import Smartlook from 'smartlook-client';
import { LayoutProvider } from '../context';
import { AuthProvider } from '@/features/auth';

// Override toLocaleString to use English digits
if (typeof window !== 'undefined') {
    Number.prototype.toLocaleString = function () {
        return this.toString().replace(/\d/g, (d: any) => '0123456789'[d]);
    };
}

export function ClientProviders({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Initialize Smartlook
        const smartlookKey = process.env.NEXT_PUBLIC_SMARTLOOK_KEY;
        if (smartlookKey) {
            // Smartlook.init(smartlookKey);
        }

        // Initialize Sentry
        const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
        if (sentryDsn) {
            // Sentry.init({
            //   dsn: sentryDsn,
            //   integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
            //   tracesSampleRate: 1.0,
            //   tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/, '*'],
            //   replaysSessionSampleRate: 0.1,
            //   replaysOnErrorSampleRate: 1.0
            // });
        }
    }, []);

    return (
        <AuthProvider>
            <LayoutProvider>{children}</LayoutProvider>
        </AuthProvider>
    );
}
