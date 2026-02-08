import { ArrowRounded2Svg, BlackListLogoSvg, ClockSvg, LineSvg as LineIconSvg, SunSvg, BrokerFilterSvg as BrokerCardSvg, UserFilterSvg as UserCardSvg, LocationSvg as IraqSvg, LoadingNewColorSvg } from '@/components/Svgs';
import { DRISteps, UserRole } from '@/types/enum';
import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { useLayout } from '@/context/LayoutContext';
import { _getTokenLogoByid } from '@/lib/actions/utils';
import { _getTokenByUsd, _getTokenName } from '@/lib/actions/transactions';
import { formatDateAndTime } from '@/lib/actions';
import { _getOperationName } from '@/lib/data';
import  ToolTip  from '@/components/ui/tooltip'; // Assuming ToolTip will be here or similar


interface StepRenderProps extends HTMLAttributes<HTMLDivElement> {
    depositRequestInvoice: any;
    showTransactions: boolean;
    step: DRISteps;
    setCurrentStep: (value: any) => void;
    handleOpenTransactions: () => void;
    _openIframeByToken: (value: any) => void;
    divProps?: React.HTMLAttributes<HTMLDivElement>;
}
const DRIStepRender = ({
    showTransactions,
    handleOpenTransactions,
    _openIframeByToken,
    depositRequestInvoice,
    step,
    setCurrentStep,
    ...rest
}: StepRenderProps) => {
    // console.log(step);
    const { user } = useLayout();
    const orderEntity = [
        depositRequestInvoice?.client && `${depositRequestInvoice.client} |`,
        depositRequestInvoice?.trading_number && `${depositRequestInvoice.trading_number}`,
        !!_getOperationName(depositRequestInvoice?.ticket_operating_unit_id) && `| ${_getOperationName(depositRequestInvoice?.ticket_operating_unit_id)}`
    ]
        .filter(Boolean)
        .join(' ');

    const [rfStep, setRfStep] = useState<any>(null);
    useEffect(() => {
        if (step === DRISteps.PAID || step === DRISteps.OVERPAID) {
            const oldStep = step;
            setTimeout(() => {
                setRfStep(oldStep);
            }, 100); // 10000
        }
    }, [step]);

    const _getBgColor = () => {
        if (step === DRISteps.PAID || step === DRISteps.OVERPAID) {
            return 'bg-[#F7FFF7]';
        } else if (step === DRISteps.HOLD) {
            //  || step === DRISteps.CANCELED
            return 'bg-[#FFF7F0]';
        } else {
            return 'bg-white';
        }
    };

    const [balanceInUsd, setBalanceInUsd] = useState(null);
    const _updateBalanceInUsd = async () => {
        const biu = await _getTokenByUsd(depositRequestInvoice?.crypto_contract?.id, depositRequestInvoice?.amount);
        if (!!biu) {
            setBalanceInUsd(biu);
        }
    };
    useEffect(() => {
        _updateBalanceInUsd();
    }, [depositRequestInvoice]);
    const [isShowWalletName, setIsShowWalletName] = useState(false);
    const [isShowTimes, setIsShowTimes] = useState(false);

    const handleClickWalletName = () => {
        user?.user?.type === UserRole.Admin && depositRequestInvoice?.crypto_wallet?.name ? setIsShowWalletName(!isShowWalletName) : null;
    };
    const handleOpenTimes = () => {
        // handleOpenTransactions();
        setIsShowTimes(!isShowTimes);
    };

    const iconRef = useRef<HTMLDivElement>(null);
    const handleOpen = (event: any) => {
        const target = event.target as Node;
        if (iconRef.current && !iconRef.current.contains(target)) {
            handleOpenTransactions();
        } else {
            handleClickWalletName();
        }
    };
    return (
        <div
            {...rest}
            className={`select-text grid border-b grid-cols-[3.14%_5.38%_34.08%_34.96%_13.45%_8.97%] pl-[20px] rounded-[10px] relative ${_getBgColor()} items-center w-full h-[60px]`}
        >
            <div onClick={(e) => handleOpen(e)} className="flex items-center justify-between h-full pt-2">
                <div className="flex items-center gap-2 flex-col">
                    <div>{depositRequestInvoice?.user_id ? <BrokerCardSvg w="15" h="15" /> : <UserCardSvg />}</div>
                    <div>
                        <IraqSvg />
                    </div>
                </div>
                <div className="flex items-center h-full">
                    <LineIconSvg />
                </div>
            </div>

            <div onClick={(e) => handleOpen(e)} className="flex items-center justify-between w-full h-full pt-1">
                <div className="flex flex-col gap-x-1 w-full items-center justify-center">
                    <div className="font-bold text-[#404040] text-[16px] text-center">RS</div>
                    <div className="text-[#A2A0A0] text-[12px] font-[SF-Pro-Rounded-light] text-center">{depositRequestInvoice?.id}</div>
                </div>
                <div className="flex items-center h-full">
                    <LineIconSvg />
                </div>
            </div>

            <div onClick={(e) => handleOpen(e)} className="flex items-start justify-between h-full pl-4">
                <div className="flex flex-col items-start w-full pt-[8px]">
                    <div className="text-[#A2A0A0] text-[12px] flex flex-col gap-1 font-[SF-Pro-Rounded-light] text-start select-text">
                        {depositRequestInvoice?.user?.name && (
                            <div className="text-[#404040] text-[16px] font-bold text-start select-text">{depositRequestInvoice?.user?.name}</div>
                        )}
                        {orderEntity || <div className="font-[SF-Pro-Rounded-light] text-[12px] text-[#E8E8E8] select-text">Client Name | Trading No | Entity</div>}
                    </div>
                </div>
                <div className="flex items-center h-full">
                    <LineIconSvg />
                </div>
            </div>

            {/* {step > DRISteps.WAITING_INFO && ( // */}
            <div onClick={(e) => handleOpen(e)} className="flex items-center justify-between h-full">
                <div className="flex flex-col items-center gap-0 w-full pl-4">
                    <div className="w-full flex flex-row items-center justify-between max-h-[24px] overflow-hidden">
                        {depositRequestInvoice.amount ? <div className="font-bold text-[16px] text-[#404040] text-start w-[30%]">{depositRequestInvoice.amount}</div> : <div className="font-bold text-[16px] text-[#E8E8E8] text-start w-[30%]">000,000</div>}
                        {depositRequestInvoice.failure_message ? <ToolTip text={depositRequestInvoice.failure_message}>
                            <div className='text-red-500 text-[10px] font-light w-[70%] p-[2px] text-start max-h-[24px]'>
                                {depositRequestInvoice.failure_message.length < 41 ? depositRequestInvoice.failure_message : depositRequestInvoice.failure_message.slice(0, 41) + "..."}
                            </div></ToolTip> : <></>}
                    </div>

                    {
                        <div className="text-[#A2A0A0] group relative text-[12px] font-[SF-Pro-Rounded-light] w-full text-start">
                            {depositRequestInvoice.crypto_contract?.id ? (
                                <span className=" font-[SF-Pro-Rounded-light] flex items-end justify-start gap-1 w-fit text-[12px] text-[#A2A0A0]">
                                    <span className="flex items-end justify-center gap-1">
                                        <span ref={iconRef} className="cursor-pointer text-center" onClick={(e) => handleOpen(e)}>
                                            {_getTokenLogoByid({ id: depositRequestInvoice.crypto_contract?.id, h: '14', w: '14' })}
                                        </span>
                                        <span className="text-[12px] text-center"> {_getTokenName(depositRequestInvoice?.crypto_contract?.id)}</span>
                                        <span className="text-[10px]"> {depositRequestInvoice?.crypto_contract?.name}</span>{' '}
                                    </span>
                                    <span
                                        className={`bg-[#404040] rounded-[5px] text-center text-[10px] transition-all duration-200 ease-in-out h-[22px] ${isShowWalletName ? 'text-white opacity-100 w-[36px]  p-[4px]' : 'p-0 text-transparent opacity-0 w-0'
                                            }`}
                                    >
                                        {depositRequestInvoice?.crypto_wallet?.name}
                                    </span>{' '}
                                    = <div className="font-bold text-[#5D5D5D]">$ </div>
                                    {depositRequestInvoice.balanceInUsd}
                                </span>
                            ) : (
                                <span className="font-[SF-Pro-Rounded-light] flex items-center justify-start gap-1 text-[12px] text-[#E8E8E8]">
                                    <SunSvg color="#E8E8E8" h="10" w="10" />
                                    {balanceInUsd ? `= $ ${balanceInUsd}` : null}
                                </span>
                            )}
                        </div>
                    }
                </div>
                <div className="flex items-center h-full">
                    <LineIconSvg />
                </div>
            </div>
            {/* )} */}

            {/* {step > DRISteps.WAITING_INFO && ( */}
            <div onClick={(e) => handleOpen(e)} className="flex items-center justify-between h-full">
                <div className="text-[#404040] w-full gap-[6px] flex items-center justify-center flex-col text-[16px] text-center">
                    {step !== DRISteps.CANCELED &&
                        step !== DRISteps.EXPIRED &&
                        step !== DRISteps.WAITING_DEPOSIT &&
                        step !== DRISteps.PROCCESSING &&
                        step !== DRISteps.PARTIALPAID &&
                        step !== DRISteps.DEPOSIT &&
                        step !== DRISteps.WAITING_INFO && (
                            <div
                                className={'cursor-pointer'}
                                title={user?.user?.type === UserRole.Admin ? '' : 'Open Deposit'}
                                onClick={() => {
                                    _openIframeByToken(depositRequestInvoice?.token);
                                }}
                            >
                                RF
                                {/* <TrueGreenSvg w="20" h="20" /> */}
                            </div>
                        )}

                    {(step === DRISteps.WAITING_DEPOSIT ||
                        step === DRISteps.PROCCESSING ||
                        step === DRISteps.PARTIALPAID ||
                        step === DRISteps.DEPOSIT ||
                        step === DRISteps.WAITING_INFO) && (
                            <div className={'cursor-pointer'} title={'Open Deposit'} onClick={() => _openIframeByToken(depositRequestInvoice?.token)}>
                                <LoadingNewColorSvg w="19" h="19" loading />
                            </div>

                        )}
                    {step === DRISteps.EXPIRED && (
                        <div title={'Expired'} className="text-[#FFAC65] text-[12px] font-[SF-Pro-Rounded-light] text-center">
                            <ClockSvg color="#FFAC65" w={'15'} h={'15'} />
                        </div>
                    )}
                    {step === DRISteps.CANCELED && (
                        <div title={'Canceled By User'} className="text-[#FFAC65] text-[12px] font-[SF-Pro-Rounded-light] text-center">
                            <BlackListLogoSvg color="#FFAC65" w={'15'} h={'15'} />
                        </div>
                    )}

                    <div className="text-[#A2A0A0] text-[12px] font-[SF-Pro-Rounded-light] text-center select-text">
                        {step === DRISteps.EXPIRED && (
                            <div title="Expired" className="text-[#FFAC65] text-[12px] font-[SF-Pro-Rounded-light] text-center">
                                Expired
                            </div>
                        )}
                        {step === DRISteps.CANCELED && (
                            <div title="Canceled By User" className="text-[#FFAC65] text-[12px] font-[SF-Pro-Rounded-light] text-center">
                                Canceled
                            </div>
                        )}
                        {step === DRISteps.PARTIALPAID
                            ? depositRequestInvoice?.received_amount
                                ? `Remaining ${Number(depositRequestInvoice?.amount) - Number(depositRequestInvoice?.received_amount)}`
                                : ''
                            : step === DRISteps.PAID || step === DRISteps.OVERPAID
                                ? `${depositRequestInvoice?.rf ? depositRequestInvoice?.rf : "no RF"}`
                                : step === DRISteps.PROCCESSING
                                    ? 'Processing'
                                    : step === DRISteps.WAITING_INFO
                                        ? 'Waiting Info'
                                        : step === DRISteps.WAITING_DEPOSIT
                                            ? 'Waiting Transaction'
                                            : step === DRISteps.SCAN_SENDER
                                                ? 'Scan Sender'
                                                : step === DRISteps.DEPOSIT
                                                    ? 'Start Deposit'
                                                    : `${depositRequestInvoice?.rf ? depositRequestInvoice?.rf : "no RF"}`}
                    </div>
                </div>
                <div className="flex items-center h-full">
                    <LineIconSvg />
                </div>
            </div>
            {/* )} */}

            <div
                onClick={handleOpenTimes}
                className="flex relative cursor-pointer justify-center group w-full h-full pb-[10px] items-end text-[12px] font-[SF-Pro-Rounded-light] text-[#5D5D5D] gap-2"
            >
                {formatDateAndTime(depositRequestInvoice?.updated_at) || '00:00 | 0m'}
                <span className="mb-[1px] w-[14px] h-[14px]">
                    <ClockSvg />
                </span>
                <div
                    className={`w-[256px] ${isShowTimes ? ' visible opacity-100 ' : 'opacity-0 invisible '} transition-opacity h-[117px] px-[10px]
                         py-[4px] ease-in-out duration-500 text-[10px] font-[SF-Pro-Rounded-light] z-[9999] rounded-[5px]
                          bg-[#F3F3F3] absolute top-[55px] right-[0px] shadow-md`}
                >
                    <div className=" flex flex-col justify-between items-start h-full">
                        <span className="flex items-center gap-x-1 justify-between w-full">
                            <span className="flex items-center justify-start gap-x-1 font-[SF-Pro-Rounded-light]">
                                <ArrowRounded2Svg color="#404040" /> <span className="font-[SF-Pro-Rounded-regular]">Received</span> “System”
                            </span>
                            <span className="flex font-[SF-Pro-Rounded-light] gap-x-1">
                                0 h <ClockSvg w="10" h="10" />
                            </span>
                        </span>
                        <span className="flex items-center gap-x-1 justify-between w-full">
                            <span className="flex pl-[8px] items-center justify-start gap-x-1 font-[SF-Pro-Rounded-light]">
                                {step === DRISteps.WAITING_INFO ? <LoadingNewColorSvg color="#404040" /> : <div className="w-[20px]" />}Waiting Info
                            </span>
                            <span className="flex font-[SF-Pro-Rounded-light] gap-x-1">
                                00:00:00 <ClockSvg w="10" h="10" />
                            </span>
                        </span>
                        <span className="flex items-center gap-x-1 justify-between w-full">
                            <span className="flex pl-[8px] items-center justify-start gap-x-1 font-[SF-Pro-Rounded-light]">
                                {step === DRISteps.WAITING_DEPOSIT ? <LoadingNewColorSvg color="#404040" /> : <div className="w-[20px]" />} Waiting Transaction
                            </span>
                            <span className="flex font-[SF-Pro-Rounded-light] gap-x-1">
                                00:00:00 <ClockSvg w="10" h="10" />
                            </span>
                        </span>
                        <span className="flex items-center gap-x-1 justify-between w-full">
                            <span className="flex pl-[8px] items-center justify-start gap-x-1 font-[SF-Pro-Rounded-light]">
                                {step === DRISteps.PROCCESSING ? <LoadingNewColorSvg color="#404040" /> : <div className="w-[20px]" />} Processing
                            </span>
                            <span className="flex font-[SF-Pro-Rounded-light] gap-x-1">
                                00:00:00 <ClockSvg w="10" h="10" />
                            </span>
                        </span>
                        <span className="flex items-center gap-x-1 justify-between w-full">
                            <span className="flex pl-[8px] items-center justify-start gap-x-1 font-[SF-Pro-Rounded-light]">
                                {step === DRISteps.DEPOSIT ? <LoadingNewColorSvg color="#404040" /> : <div className="w-[20px]" />} Waiting RF
                            </span>
                            <span className="flex font-[SF-Pro-Rounded-light] gap-x-1">
                                00:00:00 <ClockSvg w="10" h="10" />
                            </span>
                        </span>
                        <span className="flex items-center gap-x-1 justify-between w-full">
                            <span className="flex items-center justify-start gap-x-1 font-[SF-Pro-Rounded-light]">
                                <ArrowRounded2Svg color="#7BDE25" /> <span className="font-[SF-Pro-Rounded-regular]">Done</span> “System”
                            </span>
                            <span className="flex font-[SF-Pro-Rounded-light] gap-x-1">
                                0 h <ClockSvg w="10" h="10" />
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DRIStepRender;
