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
  disabled 
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
    }, 500); // Wait for transition animation to complete
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
    if (!/^\d*$/.test(val)) return; // Only allow digits

    const newPin = [...pin];
    // Take only the last character if more than one (e.g., from paste or fast typing)
    newPin[index] = val.slice(-1);
    setPin(newPin);
    
    const combinedValue = newPin.join('');
    onChange(combinedValue);

    // Auto-focus next input
    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if complete
    if (newPin.every(digit => digit !== '') && newPin.join('').length === 6) {
      onComplete(newPin.join(''));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      // Focus previous input on backspace if current is empty
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

    // Focus last filled input or the one after it
    const lastIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastIndex]?.focus();

    if (combinedValue.length === 6) {
      onComplete(combinedValue);
    }
  };

  return (
    <div className="relative flex items-center justify-center mt-2">
      <div className={`flex items-center justify-center gap-3 ${notValidPin ? 'animate-shake' : ''}`}>
        {pin.map((digit, i) => (
          <div key={i} className="relative w-[55px] h-[55px]">
            {/* Background Box */}
            <div 
              className={`absolute border border-[#ddddddc5] inset-0 rounded-[15px] transition-all duration-200 ${
                isValidPin 
                  ? 'bg-[#E8F5E9] border-0 border-[#E8F5E9]' 
                  : notValidPin 
                    ? 'bg-[#FFEBEE] border-0 border-[#FFEBEE]' 
                    : digit 
                      ? 'bg-[#f7f7f7]' 
                      : 'bg-white'
              }`}
            />
            
            {/* Lock Icon */}
            {digit && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Image 
                  src="/assets/icons/auth/lock.svg" 
                  alt="lock" 
                  width={24} 
                  height={24}
                  className={`transition-all duration-200 ${
                    isValidPin 
                      ? 'brightness-0 invert-[0.5] sepia(1) saturate(1000%) hue-rotate(80deg)' // Success green tint
                      : notValidPin 
                        ? 'brightness-0 invert-[0.5] sepia(1) saturate(1000%) hue-rotate(320deg)' // Error red tint
                        : ''
                  }`}
                />
              </div>
            )}

            {/* Blinking Dot for focused empty input */}
            {focusedIndex === i && !digit && !isValidPin && !notValidPin && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-1 h-1 bg-[#8E8E8E] rounded-full animate-blink" />
              </div>
            )}

            {/* Hidden Input */}
            <input
              ref={el => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onFocus={() => setFocusedIndex(i)}
              onBlur={() => setFocusedIndex(null)}
              onPaste={handlePaste}
              disabled={disabled}
              className="absolute inset-0 w-full h-full bg-transparent text-center text-transparent outline-none caret-transparent z-10"
              autoComplete="one-time-code"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PinInputs;
