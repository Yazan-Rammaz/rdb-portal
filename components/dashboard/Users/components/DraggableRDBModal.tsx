'use client';

import { clear } from 'console';
import React, { useState, useRef, useEffect } from 'react';

interface DraggableRDBModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    initialHeight?: number;
}

const DraggableRDBModal: React.FC<DraggableRDBModalProps> = ({
    isOpen,
    onClose,
    children,
    initialHeight = 400,
}) => {
    const [height, setHeight] = useState(initialHeight);
    const [isDragging, setIsDragging] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const dragHandleRef = useRef<HTMLDivElement>(null);
    const startYRef = useRef(0);
    const startHeightRef = useRef(0);

    // Handle mount animation
    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    useEffect(() => {
        // Select both elements
        const html = document.documentElement;
        const body = document.body;

        if (isMounted) {
            html.style.overflow = 'hidden';
            body.style.overflow = 'hidden';
        } else {
            html.style.overflow = 'unset';
            body.style.overflow = 'unset';
        }

        // Clean up function to ensure scrolling is restored if component unmounts
        return () => {
            html.style.overflow = 'unset';
            body.style.overflow = 'unset';
        };
    }, [isMounted]);

    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent | TouchEvent) => {
            if (!containerRef.current) return;

            const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
            const delta = clientY - startYRef.current;
            const newHeight = startHeightRef.current - delta;

            // Minimum height: 300px
            if (newHeight >= 300) {
                setHeight(newHeight);
            }
        };

        const handleMouseUp = (e: MouseEvent | TouchEvent) => {
            if (!containerRef.current) return;

            const clientY =
                'touches' in e ? e.changedTouches[0].clientY : (e as MouseEvent).clientY;
            const delta = clientY - startYRef.current;
            const newHeight = startHeightRef.current - delta;

            // Close if dragged down too much (below bottom of screen)
            if (newHeight < 600) {
                setIsMounted(false);
                setTimeout(onClose, 300);
            } else if (newHeight > window.innerHeight - 100) {
                // Close if dragged to full screen
                setHeight(window.innerHeight - 100);
            }

            setIsDragging(false);
        };

        document.addEventListener('mousemove', handleMouseMove as EventListener);
        document.addEventListener('mouseup', handleMouseUp as EventListener);
        document.addEventListener('touchmove', handleMouseMove as EventListener);
        document.addEventListener('touchend', handleMouseUp as EventListener);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove as EventListener);
            document.removeEventListener('mouseup', handleMouseUp as EventListener);
            document.removeEventListener('touchmove', handleMouseMove as EventListener);
            document.removeEventListener('touchend', handleMouseUp as EventListener);
        };
    }, [isDragging, onClose]);

    const handleDragStart = (
        e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    ) => {
        setIsDragging(true);
        const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
        startYRef.current = clientY;
        startHeightRef.current = height;
    };

    if (!isOpen && !isMounted) return null;

    return (
        <>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                .backdrop-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }
                .backdrop-fade-out {
                    animation: fadeOut 0.3s ease-out forwards;
                }
                .modal-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }
                .modal-fade-out {
                    animation: fadeOut 0.3s ease-out forwards;
                }
            `}</style>

            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-opacity-50 backdrop-blur-xs z-40 ${
                    isMounted ? 'backdrop-fade-in bg-black/30' : 'backdrop-fade-out'
                }`}
            />

            {/* Modal Container */}
            <div
                ref={containerRef}
                className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 ${
                    !isDragging ? 'transition-all duration-300' : ''
                } ${isMounted ? 'modal-fade-in' : 'modal-fade-out'}`}
                style={{
                    height: `${height}px`,
                    maxHeight: `${window.innerHeight - 100}px`,
                    transform: !isMounted ? 'translateY(100%)' : 'translateY(0)',
                    willChange: isDragging ? 'height' : 'auto',
                }}
            >
                {/* Drag Handle */}
                <div className="flex w-full justify-between px-5 items-center shadow-2xs rounded-2xl py-2 ">
                    <div />
                    <div
                        ref={dragHandleRef}
                        onMouseDown={handleDragStart}
                        onTouchStart={handleDragStart}
                        className="w-18 py-1 h-1 bg-gray-300 rounded-full cursor-grab active:cursor-grabbing"
                    />

                    <button
                        onClick={() => {
                            setIsMounted(false);
                            setTimeout(onClose, 300);
                        }}
                        className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto px-6 pb-0" style={{ height: `${height - 50}px` }}>
                    {children}
                </div>
            </div>
        </>
    );
};

export default DraggableRDBModal;
