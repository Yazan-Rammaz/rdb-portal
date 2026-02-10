import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import 'ramaaz-digital-banking/dist/styles/styles.css';
// Swiper and Datepicker styles from main.tsx
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-datepicker/dist/react-datepicker.css';

import { ClientProviders } from '@/components/providers/ClientProviders';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Trydos Wallet Portal',
    description: 'Manage your wallet transactions and business partners with Trydos Wallet Portal.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ClientProviders>{children}</ClientProviders>
            </body>
        </html>
    );
}
