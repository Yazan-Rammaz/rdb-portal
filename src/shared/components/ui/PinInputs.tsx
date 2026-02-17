'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface PinInputsProps {
    value: string;
    onComplete: (value: string) => void;
    onChange: (value: string) => void;
    disabled: boolean;
    notValidPin?: boolean;
    isValidPin?: boolean;
}

const PinInputs: React.FC<PinInputsProps> = ({
    notValidPin,
    isValidPin,
    value,
    onComplete,
    onChange,
    disabled,
}) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [pin, setPin] = useState<string[]>(Array(6).fill(''));
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    // Sync internal state with external value prop
    useEffect(() => {
        const newPin = value.split('').slice(0, 6);
        while (newPin.length < 6) newPin.push('');
        setPin(newPin);
    }, [value]);

    // Auto-focus first input on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            inputRefs.current[0]?.focus();
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    // Focus first input if pin is not valid
    useEffect(() => {
        if (notValidPin) {
            inputRefs.current[0]?.focus();
        }
    }, [notValidPin]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const val = e.target.value;
        if (!/^\d*$/.test(val)) return;

        const newPin = [...pin];
        newPin[index] = val.slice(-1);
        setPin(newPin);

        const combinedValue = newPin.join('');
        onChange(combinedValue);

        if (val && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        if (newPin.every((digit) => digit !== '') && newPin.join('').length === 6) {
            onComplete(newPin.join(''));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !pin[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
        const newPin = [...pin];

        pastedData.forEach((char, i) => {
            if (i < 6 && /^\d$/.test(char)) {
                newPin[i] = char;
            }
        });

        setPin(newPin);
        const combinedValue = newPin.join('');
        onChange(combinedValue);

        const lastIndex = Math.min(pastedData.length, 5);
        inputRefs.current[lastIndex]?.focus();

        if (combinedValue.length === 6) {
            onComplete(combinedValue);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 w-full max-w-100">
            <div className="flex gap-3 justify-center w-full">
                {pin.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => {
                            inputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        onFocus={() => setFocusedIndex(index)}
                        onBlur={() => setFocusedIndex(null)}
                        disabled={disabled}
                        className={`
                            w-12.5 h-15 
                            text-center text-2xl font-semibold
                            rounded-[15px]
                            transition-all duration-200
                            ${
                                notValidPin
                                    ? 'border-2 border-red-500 bg-red-50'
                                    : isValidPin
                                      ? 'border-2 border-green-500 bg-green-50'
                                      : focusedIndex === index
                                        ? 'border-2 border-blue-500 bg-blue-50'
                                        : 'border border-gray-300 bg-white'
                            }
                            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}
                            focus:outline-none
                        `}
                    />
                ))}
            </div>
        </div>
    );
};

export default PinInputs;
