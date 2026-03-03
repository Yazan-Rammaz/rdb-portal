'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks';
import { getDefaultCredentials } from '../services';
import { LogoHeaderSvg, RamaazPoweredSvg } from '@/shared/components/ui/Svgs';

export function LoginForm() {
    const { user, isLoading, login } = useAuth();
    const router = useRouter();
    const defaults = getDefaultCredentials();

    useEffect(() => {
        if (!isLoading && user !== null) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    const [email, setEmail] = useState(defaults.email);
    const [password, setPassword] = useState(defaults.password);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        try {
            await login({ email, password });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading || user !== null) {
        return null;
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-sm">
                {/* Card */}
                <div className="bg-[#F7F7F7] rounded-[10px] shadow-sm p-8">
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <LogoHeaderSvg />
                    </div>

                    {/* Title */}
                    <h1 className="text-[#404040] text-sm font-semibold text-center mb-6">
                        Admin Portal
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="block text-[11px] font-medium text-[#5D5D5D]">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                className="w-full h-11 bg-white rounded-[10px] px-3.5 text-[12px] text-[#404040] border border-transparent shadow-sm outline-none focus:border-[#396CF7] transition-colors"
                                placeholder="admin@ramaaz.com"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="block text-[11px] font-medium text-[#5D5D5D]">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                className="w-full h-11 bg-white rounded-[10px] px-3.5 text-[12px] text-[#404040] border border-transparent shadow-sm outline-none focus:border-[#396CF7] transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="text-[11px] text-red-500 text-center">{error}</p>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-11 text-white text-[12px] font-medium rounded-[10px] bg-[#396CF7] shadow-[inset_0_3px_6px_rgba(255,255,255,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                        >
                            {isSubmitting ? 'Signing in…' : 'Sign in'}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <div className="flex justify-center mt-6">
                    <RamaazPoweredSvg />
                </div>
            </div>
        </div>
    );
}
