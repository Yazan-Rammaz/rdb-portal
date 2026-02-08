import React, { InputHTMLAttributes, useEffect, useState } from 'react';

interface AmountInputProps extends InputHTMLAttributes<HTMLInputElement> {
    disabled?: boolean;
    unit?: string;
    amount?: string;
    logo?: string;
}

const AmountInput: React.FC<AmountInputProps> = ({ amount, unit, logo, disabled, ...dist }) => {
    const [input, setInput] = useState(document.getElementById('amount_input'));
    useEffect(() => {
        const amountInput = document.getElementById('amount_input');
        if (amountInput && amount) {
            let width = amount.toString().length * 25;
            if (width < 100) {
                amountInput.style.width = `100px`;
            } else {
                amountInput.style.width = `${width}px`;
            }
        }
    }, [amount]);
    useEffect(() => {
        const input = document.getElementById('amount_input');
        if (input) {
            setInput(input);
        }
    }, [amount]);
    return (
        <div className="flex mt-[20px] max-w-[300px] flex-grow w-full justify-center relative items-center">
            <div className="flex pt-auto flex-col items-center justify-center">
                <div className="relative text-[#A2A0A0] text-[16px] mb-[0px] family-light">Deposit Amount</div>
                <div className="relative w-fit flex-row bg-[transparent] space-x-[10px] flex items-center justify-center">
                    <input
                        disabled={disabled}
                        style={{
                            minWidth: '100px !important'
                        }}
                        defaultValue={amount}
                        type="number"
                        id="amount_input"
                        {...dist}
                        className="w-full focus:placeholder:text-transparent bg-[transparent] py-[15px] relative disabled:text-[#8E8E8E] font-medium disabled:placeholder:text-[#E3E3E3] placeholder:[#5D5D5D] text-[#5D5D5D] text-[40px] text-center"
                    />
                    {unit && logo && (
                        <div
                            style={{
                                left: '100%',
                                marginLeft: '10px'
                            }}
                            className="absolute duration-100 animate-fade-in text-[10px] flex items-center justify-center gap-x-1 text-[#CECDCD] font-[SF-Pro-Rounded-light]"
                        >
                            <img className="w-[12px] h-[12px]" alt="logo" src={process.env.NEXT_PUBLIC_IMAGE_BASE_URL + logo} />
                            {unit}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AmountInput;
