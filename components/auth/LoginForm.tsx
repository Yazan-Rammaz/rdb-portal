'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import PinInputs from '@/components/ui/PinInputs';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import LoginOptions from './LoginOptions';
import API from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import UserJson from '@/types/user.json';
import LocalStorage from '@/utils/localStorage';
import { User } from '@/types/auth';

interface LoginFormProps {
    user?: User;
    onChangePassword?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ user, onChangePassword }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { unlock, lock, setUser: setAuthUser } = useAuth();
    const [step, setStep] = useState<'username' | 'pin'>(user?.accessToken ? 'pin' : 'username');
    const [loading, setLoading] = useState(false);
    const [notValidPin, setNotValidPin] = useState(false);
    const [isValidPin, setIsValidPin] = useState(false);
    const [username, setUsername] = useState(user?.username || '');
    const [pinValue, setPinValue] = useState('');
    const [userData, setUserData] = useState<User | undefined>(user);

    useEffect(() => {
        if (user?.username) {
            setUsername(user.username);
            setUserData(user);
            setStep('pin');
        }
    }, [user]);

    const handleUsernameSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!username) return;

        setLoading(true);
        // Here we should ideally check if the user exists and get their avatar
        // For now, we'll simulate finding the user or just proceed to PIN step
        // In a real app, you might call an API to check the username
        try {
            // setUserData({
            //     username: username,
            //     avatar: '/img/user.png',
            //     name: username,
            // });
            setStep('pin');
        } catch (error) {
            console.error('User not found', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        LocalStorage.clear();
        setAuthUser(null);
        lock();
        setUserData(undefined);
        setUsername('');
        setPinValue('');
        setStep('username');
    };

    const handleError = () => {
        setNotValidPin(true);
        setPinValue('');
        setTimeout(() => {
            setNotValidPin(false);
        }, 1500);
    };

    const handleLoginComplete = async (value: string) => {
        setLoading(true);
        await API.post(
            '/api/v1/users/login',
            { username: 'Admin', password: '123456' },
            (data) => {
                if (data?.data) {
                    setIsValidPin(true);
                    const userRes = data.data;
                    if (userRes.access_token) {
                        setTimeout(() => {
                            const userFormatted = {
                                ...userRes,
                                username: userRes.user?.username,
                                id: userRes.user?.id,
                                avatar: userRes.user?.avatar,
                            };
                            // LocalStorage.set('user', JSON.stringify(userFormatted));
                            // setAuthUser(userFormatted);
                            LocalStorage.setItem('user', JSON.stringify(UserJson));
                            setAuthUser(UserJson);
                            unlock(); // Set isUnlocked to true in context

                            const redirectUrl = searchParams.get('redirect');
                            router.push(redirectUrl ? decodeURIComponent(redirectUrl) : '/');
                        }, 1000);
                    }
                    setLoading(false);
                }
            },
            (e) => {
                setLoading(false);
                handleError();
            },
        );
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full max-w-[450px]">
            <LoadingOverlay loading={loading} />

            <div className="w-full transition-all duration-500 ease-in-out">
                {step === 'username' ? (
                    /* Step 1: Username Input */
                    <form
                        onSubmit={handleUsernameSubmit}
                        className="flex flex-col items-center w-full px-4"
                    >
                        <div className="relative w-full group">
                            {/* User Mask Icon */}
                            <div
                                className="absolute top-[20px] left-[20px] w-5 h-5 z-50 transition-colors"
                                style={{
                                    maskImage: 'url(/assets/icons/auth/user.svg)',
                                    maskRepeat: 'no-repeat',
                                    maskPosition: 'center',
                                    maskSize: username ? 'cover' : 'contain',
                                    WebkitMaskImage: 'url(/assets/icons/auth/user.svg)',
                                    WebkitMaskRepeat: 'no-repeat',
                                    WebkitMaskPosition: 'center',
                                    WebkitMaskSize: username ? 'cover' : 'contain',
                                    backgroundColor: username ? '#8E8E8E' : '#DDDDDD',
                                }}
                            />
                            <input
                                type="text"
                                placeholder="User Name"
                                // value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full h-[60px] pl-14 pr-14 bg-white border border-[#e5e7eb] rounded-[20px] text-center text-lg text-[#8e8e8e] focus:outline-none transition-all placeholder:text-[#d1d5db]"
                                autoFocus
                            />
                            {username && (
                                <button
                                    type="submit"
                                    className="absolute top-[20px] right-[20px] w-5 h-5 z-50 cursor-pointer flex items-center justify-center bg-transparent border-none p-0 outline-none"
                                >
                                    <div
                                        className="w-5 h-5 bg-[#4357EA]"
                                        style={{
                                            maskImage: 'url(/assets/icons/auth/enterUser.svg)',
                                            maskRepeat: 'no-repeat',
                                            maskPosition: 'center',
                                            WebkitMaskImage:
                                                'url(/assets/icons/auth/enterUser.svg)',
                                            WebkitMaskRepeat: 'no-repeat',
                                            WebkitMaskPosition: 'center',
                                        }}
                                    />
                                </button>
                            )}
                        </div>
                    </form>
                ) : (
                    /* Step 2: PIN Input */
                    <div className="flex flex-col items-center w-full gap-6 animate-fadeIn">
                        <div className="flex flex-col items-center gap-3">
                            <div className="relative w-[120px] h-[120px] overflow-hidden rounded-[30px] shadow-md border-4 border-white">
                                <Image
                                    src={'/img/user.png'}
                                    alt={'User'}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span className="text-[#404040] text-xl font-medium tracking-wide">
                                {userData?.username}
                            </span>
                        </div>

                        <div
                            className={`transition-all duration-300 ${notValidPin ? 'animate-shake' : ''}`}
                        >
                            <PinInputs
                                value={pinValue}
                                onChange={setPinValue}
                                onComplete={handleLoginComplete}
                                disabled={loading}
                                notValidPin={notValidPin}
                                isValidPin={isValidPin}
                            />
                        </div>

                        <div className="mt-8">
                            <LoginOptions
                                onLogout={handleLogout}
                                onChangePassword={onChangePassword || (() => {})}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginForm;
