import { LoaderSvg } from '@/components/Svgs';
import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    text?: any;
    loadingTime?: number;
    loadingText?: string;
    loadingClass?: string;
    loading?: boolean;
    doneClass?: string;
    doneText?: string;
    done?: boolean;
    failedClass?: string;
    loaderWidth?: string;
    failedText?: string;
    failed?: boolean;
    disabled?: boolean;
    showLoader?: boolean;
    logoDone?: any;
    logoBefore?: any;
    logoText?: any;
}

const Button: FC<ButtonProps> = ({
    className = '',
    text,
    loadingTime = 5000,
    loading = false,
    disabled = true,
    loadingText,
    loadingClass = '',
    done = false,
    doneText,
    doneClass = '',
    failed = false,
    showLoader = true,
    failedText,
    failedClass = '',
    loaderWidth = '235',
    logoDone = null,
    logoBefore = null,
    logoText = null,
    ...rest
}) => {
    return (
        <div className="flex flex-col w-full items-center justify-center gap-y-[5px]">
            <button
                {...rest}
                className={
                    'w-[350px] px-[15px] items-center h-[50px] border rounded-[15px] text-[18px] font-[SF-Pro-Rounded-light] ' +
                    className +
                    ' ' +
                    `${loading ? loadingClass : done ? doneClass : failed ? failedClass : ''}`
                }
                disabled={loading || done || failed || disabled}
            >
                <span className="flex items-center justify-between w-full">
                    {done ? <div className="flex items-center justify-center">{logoDone}</div> : <div />}
                    <div className="flex items-center justify-between gap-x-[5px]">
                        {logoText && <div className="mb-[1px] w-[20px] h-[20px]">{logoText}</div>}
                        <div className="">
                            {loading && loadingText ? loadingText : done ? doneText : failed ? failedText : text} {done && <div className="pr-[30px]" />}
                        </div>
                    </div>
                    {logoBefore ? <div>{logoBefore}</div> : done ? <div className="w-[20px]" /> : <div />}
                </span>
            </button>
            {showLoader && <LoaderSvg width={loaderWidth} loading={loading} duration={loadingTime} />}
        </div>
    );
};
export default Button;
