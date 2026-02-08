import { ArrowDownSvg, ClockSvg, CopySvg, LoadingNewColorSvg, TrueGreenSvg, WalletLogoSvg } from '@/components/Svgs';
import { TokensEnum, TransactoionSteps, UserRole } from '@/types/enum';
import { HTMLAttributes, useEffect, useState } from 'react';
import LineInfo from './LineInfo';
import { useLayout } from '@/context/LayoutContext';

import { _getTokenLogoByid } from '@/lib/actions/utils';
import { _calcTransactionStep, _getTokenByUsd } from '@/lib/actions/transactions';


interface StepRenderProps extends HTMLAttributes<HTMLDivElement> {
    transaction: any;
    dri: any;
    showTransactions: any;
    divProps?: React.HTMLAttributes<HTMLDivElement>;
}
const TransactionStepRender = ({ showTransactions, dri, transaction, ...rest }: StepRenderProps) => {
    // const currentStep = TransactoionSteps.SCAN_SENDER;
    const [currentStep, setCurrentStep] = useState<TransactoionSteps>(TransactoionSteps.PROCCESSING);
    const { user } = useLayout();
    const _getTransactionStep = (cryptoTransaction: any) => {
        const step = _calcTransactionStep(cryptoTransaction);
        setCurrentStep(step);
    };
    useEffect(() => {
        _getTransactionStep(transaction);
    }, [transaction]);
    const orderEntity = [transaction?.client && `${transaction.client} |`, transaction?.trading_number && `${transaction.trading_number} |`, transaction.entity]
        .filter(Boolean)
        .join(' ');

    useEffect(() => {
        if (currentStep === TransactoionSteps.SCAN_SENDER) {
            setTimeout(() => {
                setCurrentStep(TransactoionSteps.HAS_RF);
            }, 100); //10000
        }
        if (currentStep === TransactoionSteps.CONFIRMED) {
            setTimeout(() => {
                setCurrentStep(TransactoionSteps.HAS_RF);
            }, 2000); //10000
        }
        // console.log(currentStep, 'stepppppppppp');
    }, [currentStep]);
    const _getUrlOnNetwork = (transaction: any) => {
        if (transaction?.hash) {
            if (transaction?.crypto_contract?.id === TokensEnum.trx || transaction?.crypto_contract?.id === TokensEnum.usdt_tron) {
                return `https://tronscan.org/#/transaction/${transaction?.hash}`;
            } else if (transaction?.crypto_contract?.id === TokensEnum.eth || transaction?.crypto_contract?.id === TokensEnum.usdt_eth) {
                return `https://etherscan.io/tx/${transaction?.hash}`;
            }
        }
    };
    const _getLinkName = (transaction: any) => {
        if (transaction?.hash) {
            if (transaction?.crypto_contract?.id === TokensEnum.trx || transaction?.crypto_contract?.id === TokensEnum.usdt_tron) {
                return `Tronscan`;
            } else if (transaction?.crypto_contract?.id === TokensEnum.eth || transaction?.crypto_contract?.id === TokensEnum.usdt_eth) {
                return `Etherscan`;
            }
        }
    };
    const _getWalletColor = () => {
        // else if (currentStep === TransactoionSteps.SCAN_SENDER) {
        //     return `#B16307`;
        // }
        if (currentStep > TransactoionSteps.SCAN_SENDER) {
            return `#07B134`;
        } else {
            return `#487CE0`;
        }
    };

    const [balanceInUsd, setBalanceInUsd] = useState(null);
    const _updateBalanceInUsd = async () => {
        const biu = await _getTokenByUsd(dri?.crypto_contract?.id, dri?.amount);
        if (!!biu) {
            setBalanceInUsd(biu);
        }
    };
    useEffect(() => {
        _updateBalanceInUsd();
    }, [dri]);
    const truncateAddress = (address: string, startLength = 12, endLength = 12) => {
        if (!address || address.length <= startLength + endLength) {
            return address;
        }
        const start = address.slice(0, startLength);
        const end = address.slice(-endLength);
        return `${start}...${end}`;
    };

    const [copiedFrom, setCopiedFrom] = useState(false);
    const [copiedHash, setCopiedHash] = useState(false);

    useEffect(() => {
        if (copiedFrom) {
            setTimeout(() => {
                setCopiedFrom(false);
            }, 2000);
        }
    }, [copiedFrom]);
    useEffect(() => {
        if (copiedHash) {
            setTimeout(() => {
                setCopiedHash(false);
            }, 2000);
        }
    }, [copiedHash]);
    return (
        <div className="relative group">
            {/* <OrderStatusColor currentStep={currentStep} /> */}
            <div
                {...rest}
                className=" pl-[20px] rounded-t-[10px] relative bg-[#F7F7F7] z-[999] grid grid-cols-[3%_19%_19%_18%_33%_8%] items-center w-full h-[45px]"
            >
                <div className="flex items-center gap-x-4 h-full  justify-start">
                    <div className="flex items-start h-full gap-1 flex-col justify-center">
                        <ArrowDownSvg />
                    </div>
                </div>

                <div className="grid grid-rows-2">
                    <div className="flex gap-2 items-center justify-start font-[SF-Pro-Rounded-light]">
                        <div className="text-[#A2A0A0] text-[8px] font-[SF-Pro-Rounded-light]">From</div>
                        <div
                            style={{
                                color: _getWalletColor()
                            }}
                            className="text-[8px] gap-1"
                        >
                            {/* {currentStep === TransactoionSteps.SCAN_SENDER ? (
                                <span className="flex items-center gap-1 font-[SF-Pro-Rounded-light]">
                                    <LoadingNewColorSvg w="14" h="14" color={'#B16307'} />
                                    <span className="font-[SF-Pro-Rounded-light]"> Scan Sender Wallet Risk</span>
                                </span>
                            ) : ( */}
                            <span className="flex items-center gap-1 font-[SF-Pro-Rounded-light]">Low Risk Sender Wallet </span>
                            {/* )} */}
                        </div>
                    </div>
                    <div className="flex gap-2 items-center justify-start font-[SF-Pro-Rounded-light]">
                        <span
                            onClick={() => {
                                setCopiedFrom(true);
                                navigator.clipboard.writeText(transaction?.from);
                            }}
                        >
                            <span className="cursor-pointer relative group/from">
                                <WalletLogoSvg w={'12'} h={'12'} color={_getWalletColor()} />
                                <span
                                    className={`opacity-0 ${copiedFrom ? 'text-[#07b134]' : 'text-[#fafafa9f]'
                                        } invisible group-hover/from:opacity-100 group-hover/from:visible absolute font-light  text-[10px] bottom-[15px] -left-1/2 -translate-x-1/3 bg-[#404040] rounded-[5px] flex items-center justify-between px-[10px] py-[5px] truncate gap-x-1 max-w-[130px]`}
                                >
                                    <CopySvg color={copiedFrom ? '#07b134' : '#cecdcd'} />
                                    {copiedFrom ? 'Copied' : 'Copy Sender Address'}
                                </span>
                            </span>
                        </span>
                        <div className="text-[#5D5D5D] text-[10px] font-[SF-Pro-Rounded-light]">{truncateAddress(transaction?.from)}</div>
                    </div>
                </div>
                <div className="grid text-[#5D5D5D] grid-rows-2">
                    <div className="flex gap-2 items-center justify-start font-[SF-Pro-Rounded-light]">
                        <div className="text-[8px] font-[SF-Pro-Rounded-light]">To</div>
                        <div className="text-[8px]">
                            <span className="flex items-center gap-1 font-[SF-Pro-Rounded-light]">
                                {user?.user?.type === UserRole.Admin ? dri?.crypto_wallet?.name : null}{' '}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center justify-start font-[SF-Pro-Rounded-light]">
                        <WalletLogoSvg w={'12'} h={'12'} color={'#487CE0'} />
                        <div className="text-[#5D5D5D] text-[10px] font-[SF-Pro-Rounded-light]">{truncateAddress(transaction?.to)}</div>
                    </div>
                </div>
                <div className="grid text-[#5D5D5D] grid-rows-2">
                    <div className="flex gap-2 items-center justify-start font-[SF-Pro-Rounded-light]">
                        <div className="text-[8px] font-[SF-Pro-Rounded-light]">Token</div>
                        <div className="text-[8px]">
                            <span className="flex items-center gap-1 font-[SF-Pro-Rounded-light]">
                                {transaction?.crypto_contract?.symbol} <span className=""> {transaction?.crypto_contract?.name}</span>{' '}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center justify-start font-[SF-Pro-Rounded-light]">
                        {_getTokenLogoByid({ id: dri.crypto_contract?.id, h: '12', w: '12' })}
                        <span className="text-[#5D5D5D] text-[10px] gap-1 flex">
                            <span className="font-bold ">{transaction?.amount}</span>
                            {''}
                            <span className="">
                                {balanceInUsd ? (
                                    <>
                                        <span className="font-bold pr-1"> = $</span>
                                        <span className="font-[SF-Pro-Rounded-light] text-[#5d5d5d]">{balanceInUsd}</span>
                                    </>
                                ) : null}
                            </span>
                        </span>
                    </div>
                </div>
                <div className="grid text-[#5D5D5D] grid-rows-2">
                    <div className="flex gap-2 items-center justify-start font-[SF-Pro-Rounded-light]">
                        <div className="text-[8px] font-[SF-Pro-Rounded-light]">Result & Status</div>
                    </div>
                    <div className="flex gap-1 items-center justify-start font-[SF-Pro-Rounded-light]">
                        <span
                            onClick={() => {
                                setCopiedHash(true);
                                navigator.clipboard.writeText(transaction?.hash);
                            }}
                            className="cursor-pointer relative group/hash"
                        >
                            <TrueGreenSvg w={'12'} h={'12'} />
                            <span
                                className={`opacity-0 ${copiedHash ? 'text-[#07b134]' : 'text-[#fafafa9f]'
                                    } invisible group-hover/hash:opacity-100 group-hover/hash:visible absolute font-light  text-[10px] bottom-[15px] -left-1/2 -translate-x-1/3 bg-[#404040] rounded-[5px] flex items-center justify-between px-[10px] py-[5px] truncate gap-x-1 max-w-[130px]`}
                            >
                                <CopySvg color={copiedHash ? '#07b134' : '#cecdcd'} />
                                {copiedHash ? 'Copied' : 'Copy Hash'}
                            </span>
                        </span>
                        <span className="text-[#5D5D5D] flex flex-row items-center gap-[3px] justify-center text-[10px] font-[SF-Pro-Rounded-light]">
                            <span className=" font-[SF-Pro-Rounded-light]">Successful |</span>
                            {currentStep >= TransactoionSteps.CONFIRMED && currentStep !== TransactoionSteps.HOLD ? ( // currentStep >= TransactoionSteps.CONFIRMED
                                <>
                                    <span className="text-[#3056BC]">Confirmed</span>
                                    <span className=" font-[SF-Pro-Rounded-light]">By</span>
                                </>
                            ) : (
                                <span className="text-[#3056BC] font-[SF-Pro-Rounded-light] flex items-center justify-center">
                                    <LoadingNewColorSvg w="14" h="14" /> Waiting…
                                </span>
                            )}
                            {currentStep === TransactoionSteps.HOLD ? ( // currentStep >= TransactoionSteps.CONFIRMED
                                <>
                                    <span className="text-[#cf6363]">Rejected</span>
                                    <span className=" font-[SF-Pro-Rounded-light]">By</span>
                                </>
                            ) : (
                                <span className="text-[#3056BC] font-[SF-Pro-Rounded-light] flex items-center justify-center">
                                    <LoadingNewColorSvg w="14" h="14" /> Waiting…
                                </span>
                            )}
                            <>
                                <a
                                    title="Transaction Details"
                                    target="_blank"
                                    href={_getUrlOnNetwork(transaction)}
                                    className="underline font-[SF-Pro-Rounded-light]"
                                >
                                    {_getLinkName(transaction)}
                                </a>
                            </>
                        </span>
                    </div>
                </div>
                <div className=" text-[10px] text-[#5D5D5D] flex w-full justify-end pr-[10px] h-full pt-3">
                    <div className="flex relative group gap-2 items-center justify-start font-[SF-Pro-Rounded-light]">
                        00:00
                        <span className="text-[#5D5D5D] text-[10px] font-bold">
                            <ClockSvg w={'12'} h={'12'} />
                        </span>
                    </div>
                </div>
            </div>
            <LineInfo dri={dri} showTransactions={showTransactions} step={currentStep} transaction={transaction} />
        </div>
    );
};

export default TransactionStepRender;
