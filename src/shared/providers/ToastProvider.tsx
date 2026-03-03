'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { _registerToastHandler, type ToastItem } from '../utils/notify';

type ToastInstance = ToastItem & { isExiting?: boolean };

const STACK_VARIANTS = [
    'z-40',
    'z-30 -translate-y-1 scale-[0.99] opacity-95',
    'z-20 -translate-y-2 scale-[0.98] opacity-90',
    'z-10 -translate-y-3 scale-95 opacity-80',
];

const TYPE_STYLES: Record<string, string> = {
    success: 'border-l-4 border-green-500',
    error: 'border-l-4 border-red-500',
    info: 'border-l-4 border-[#396CF7]',
};

const TYPE_ICONS: Record<string, string> = {
    success: '✓',
    error: '✕',
    info: 'i',
};

function Toast({
    item,
    onDismiss,
    onRemove,
    stackClass,
}: {
    item: ToastInstance;
    onDismiss: (id: string) => void;
    onRemove: (id: string) => void;
    stackClass: string;
}) {
    useEffect(() => {
        if (item.isExiting) {
            return;
        }
        const timer = setTimeout(() => onDismiss(item.id), item.timeout);
        return () => clearTimeout(timer);
    }, [item.id, item.timeout, item.isExiting, onDismiss]);

    const animationClass = item.isExiting ? 'animate-toast-exit' : 'animate-toast-enter';

    return (
        <div
            role="alert"
            onClick={() => onDismiss(item.id)}
            onAnimationEnd={() => item.isExiting && onRemove(item.id)}
            className={`bg-white rounded-[10px] shadow-md px-4 py-3 flex items-start gap-3 min-w-70 max-w-90 cursor-pointer transition-transform duration-300 will-change-transform ${animationClass} ${stackClass} ${TYPE_STYLES[item.type] ?? TYPE_STYLES.info}`}
        >
            <span className="text-[11px] font-bold mt-0.5 shrink-0">
                {TYPE_ICONS[item.type] ?? TYPE_ICONS.info}
            </span>
            <p className="text-[12px] text-[#404040] leading-relaxed wrap-break-word">
                {item.message}
            </p>
        </div>
    );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<ToastInstance[]>([]);

    const dismiss = useCallback((id: string) => {
        setToasts((prev) =>
            prev.map((toast) =>
                toast.id === id && !toast.isExiting ? { ...toast, isExiting: true } : toast,
            ),
        );
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    useEffect(() => {
        _registerToastHandler((item) => {
            setToasts((prev) => [...prev, { ...item, isExiting: false }]);
        });
        return () => _registerToastHandler(null);
    }, []);

    return (
        <>
            {children}
            <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2 pointer-events-none">
                <div className="flex flex-col items-end gap-2 pointer-events-auto">
                    {toasts.map((toast, index) => {
                        const stackIndex = Math.min(
                            toasts.length - index - 1,
                            STACK_VARIANTS.length - 1,
                        );
                        const stackClass = STACK_VARIANTS[stackIndex] ?? STACK_VARIANTS[0];
                        return (
                            <Toast
                                key={toast.id}
                                item={toast}
                                onDismiss={dismiss}
                                onRemove={removeToast}
                                stackClass={stackClass}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}
