import { TokenLoaderSvg } from '@/components/Svgs';
import { ReactNode, useState } from 'react';

export interface Token {
    key?: string | undefined;
    disabled?: boolean;
    id?: number;
    abi?: any[] | string;
    icon_path?: string;
    decimal?: number | null;
    is_active?: number;
    is_deployed?: number;
    name?: string;
    sup?: string | null;
    symbol?: string;
    admin_wallet_address?: string;
    hash?: string | null;
    base?: string | null;
}

interface Props {
    data?: Token[];
    selectedItem?: Token | any;
    setSelectedItem?: any;
    changeSelectedItem?: any;
    label: string;
    className: string;
    arrowLogo: ReactNode;
    disabled?: boolean;
}
const Select = ({ data = [], selectedItem, setSelectedItem, changeSelectedItem, label, className, arrowLogo, disabled = true }: Props) => {
    const [selectOpen, setSelectopen] = useState(false);
    return (
        <div className={'relative flex flex-col rounded-[15px] mb-[0px] select-none' + className}>
            <div
                onClick={() => {
                    !disabled && setSelectopen(!selectOpen);
                }}
                className={
                    `${selectOpen ? 'rounded-b-none ' : ''} ${
                        (!selectedItem || selectOpen) && 'border'
                    } cursor-pointer px-[10px] flex flex-row items-center border-[#f0efef] bg-[#F7F7F7] rounded-[15px] justify-between` + className
                }
            >
                <div className={'w-[25px] h-[25px] flex items-center justify-center'}>
                    {!selectedItem?.icon_path ? (
                        <TokenLoaderSvg loading={data?.length === 0} />
                    ) : (
                        selectedItem?.icon_path && (
                            <img alt="token-icon" width={100} height={100} src={process.env.NEXT_PUBLIC_IMAGE_BASE_URL + selectedItem.icon_path} />
                        )
                    )}
                </div>
                <div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-full flex justify-center items-center text-[#8E8E8E] text-[16px] text-nowrap whitespace-nowrap overflow-hidden family-light `}
                >
                    {label}
                </div>
                {!disabled && <div className="w-[15px] h-[15px] cursor-pointer">{arrowLogo}</div>}
            </div>
            {!disabled && (
                <div className="z-[999] absolute w-full bg-[#F7F7F7] top-[39px] rounded ">
                    {data?.map((token, i) => {
                        return (
                            selectOpen && (
                                <div
                                    onClick={() => {
                                        !disabled && setSelectedItem(token);
                                        // changeSelectedItem();
                                        setSelectopen(false);
                                    }}
                                    key={i}
                                    className={
                                        'flex flex-row items-center border-x border-b border-[#f0efef] h-[65px] justify-center w-full min-h-[70px] cursor-pointer hover:bg-[#E8E8E8]'
                                    }
                                >
                                    <div className="ml-[15px] mr-[10px] w-[30px] h-[30px] flex items-center justify-center">
                                        <img alt="token-icon" width={100} height={100} src={process.env.NEXT_PUBLIC_IMAGE_BASE_URL + `${token?.icon_path}`} />
                                    </div>
                                    <div className="w-full text-[#8E8E8E] text-[16px] family-light">
                                        {token.name}, {token.symbol}
                                    </div>
                                </div>
                            )
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Select;
