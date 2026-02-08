import { BlackListLogoSvg, ClockSvg, LoadingNewColorSvg, SunSvg, BrokerFilterSvg as BrokerCardSvg, LocationSvg as Iraq12svg, UserFilterSvg as UserCardSvg } from '@/components/Svgs';
import { DRISteps, UserRole } from '@/types/enum';
import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { useLayout } from '@/context/LayoutContext';
import { _getTokenLogoByid } from '@/lib/actions/utils';
import { _getTokenByUsd } from '@/lib/actions/transactions';
import { formatDateAndTime } from '@/lib/actions';
import { _getOperationName } from '@/lib/data';


const ToolTip = ({ children, title }: any) => <div title={title}>{children}</div>;


interface StepRenderProps extends HTMLAttributes<HTMLDivElement> {
    depositRequestInvoice: any;
    showTransactions: boolean;
    step: DRISteps;
    setCurrentStep: (value: any) => void;
    handleOpenTransactions: () => void;
    _openIframeByToken: (value: any) => void;
    divProps?: React.HTMLAttributes<HTMLDivElement>;
}
const MobileDRIStepRender = ({
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
            className={`border-b pl-[20px] rounded-[10px] relative ${_getBgColor()} items-center w-full h-[110px] mr-[5px]`}
            onClick={(e) => handleOpen(e)}
        >
            <div className="text-[#A2A0A0] h-[39px] group relative text-[12px] font-[SF-Pro-Rounded-light] w-full text-start flex flex-row justify-start items-center">
                <>
                    {depositRequestInvoice.crypto_contract?.id ? (<>
                        <div ref={iconRef} className="w-[29px] h-[29px] mt-[10px] mr-[10px]">
                            {_getTokenLogoByid({ id: depositRequestInvoice.crypto_contract?.id, h: '29', w: '29' })}
                        </div>
                        <div className="w-full flex flex-row items-center justify-between max-h-[24px] overflow-hidden">
                            {depositRequestInvoice.amount ? <div className="font-bold text-[16px] text-[#404040] text-start w-[30%]">{depositRequestInvoice.amount}</div> : <div className="font-bold text-[16px] text-[#E8E8E8] text-start w-[30%]">000,000</div>}
                            {depositRequestInvoice.failure_message ? <ToolTip text={depositRequestInvoice.failure_message}>
                                <div className='text-red-500 text-[10px] font-light w-[70%] p-[2px] text-start max-h-[24px]'>
                                    {depositRequestInvoice.failure_message.length < 41 ? depositRequestInvoice.failure_message : depositRequestInvoice.failure_message.slice(0, 41) + "..."}
                                </div></ToolTip> : <></>}
                        </div>

                    </>
                    ) : (<>
                        <div className="w-[29px] h-[29px] mt-[10px] mr-[10px]">
                            <SunSvg color="#E8E8E8" h="29" w="29" />
                        </div>
                        <div className="text-[#E8E8E8] font-bold text-[24px] w-full text-start mt-[7px] ml-[3px]">
                            000,000
                        </div>
                    </>)}
                </>
                <div className="flex flex-row gap-[5px] mr-[12px] mt-[19px]">
                    <div className=" text-[#404040] text-[16px] text-center font-[SF-Pro-Rounded-Regular]">RS</div>
                    <div className="text-[#404040] text-[16px] font-[SF-Pro-Rounded-light] text-center">{depositRequestInvoice?.id}</div>
                </div>
            </div>
            <div className="text-[#A2A0A0] h-[16px] group relative text-[12px] font-[SF-Pro-Rounded-light] w-auto text-start flex flex-row justify-between items-center ml-[37px] mr-[10px]">
                <div className='flex'>
                    <div className={`font-bold ${depositRequestInvoice.balanceInUsd ? "text-[#404040]" : "text-[#E8E8E8]"} text-[12px] mr-[3px]`}>$ </div>
                    <div className={`font-bold ${depositRequestInvoice.balanceInUsd ? "text-[#404040]" : "text-[#E8E8E8]"} text-[12px] font-[SF-Pro-Rounded-light]`}>{depositRequestInvoice.balanceInUsd || "000,000"} </div>
                </div>
                <div className="flex items-center justify-between h-[16px]">
                    <div className="text-[#404040] w-full gap-[6px] flex items-center justify-center flex-row text-[16px] text-center mt-[3px]">
                        <div className="text-[#A2A0A0] text-[12px] font-[SF-Pro-Rounded-light] text-center">
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
                                                    : ''}
                        </div>
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
                    </div>
                </div>
            </div>
            <div className="text-[#A2A0A0] group relative text-[12px] h-[21px] font-[SF-Pro-Rounded-light] w-auto text-start flex flex-row justify-between items-center ml-[9px] mr-[10px] mt-[8px]">
                <div className='flex flex-row gap-[16px] items-center select-text'>
                    {depositRequestInvoice?.user_id ? <BrokerCardSvg w="12" h="12" /> : <UserCardSvg />}
                    {depositRequestInvoice?.user?.name && (
                        <div className="text-[#404040] text-[16px] text-start select-text">{depositRequestInvoice?.user?.name}</div>
                    )}
                </div>
                <div>

                    <div
                        className={'cursor-pointer'}
                        title={user?.user?.type === UserRole.Admin ? '' : 'Open Deposit'}
                        onClick={() => {
                            _openIframeByToken(depositRequestInvoice?.token);
                        }}
                    >
                        <div className="flex flex-row gap-[5px] select-text">
                            <div className=" text-[#404040] text-[16px] text-center font-[SF-Pro-Rounded]">RF</div>
                            <div className="text-[#404040] text-[16px] font-[SF-Pro-Rounded-light] text-center">{depositRequestInvoice?.rf ? depositRequestInvoice?.rf : "no RF"}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-[#A2A0A0] group relative text-[12px] h-[16px] font-[SF-Pro-Rounded-light] w-auto text-start flex flex-row justify-between items-center ml-[9px] mr-[10px] mt-[3px]">
                <div className='flex flex-row gap-[16px] items-center'>
                    <Iraq12svg />
                    <div className={orderEntity.trim().length > 0 ? "text-[#404040] text-[12px] font-[SF-Pro-Rounded-light] text-start" : "text-[#E8E8E8] text-[12px] font-[SF-Pro-Rounded-light] text-start"}>{orderEntity || "Client Name | Trading No | Entity"}</div>
                </div>
                <div className='h-[12px]'>
                    <div
                        onClick={handleOpenTimes}
                        className="flex relative cursor-pointer justify-center group w-full h-full text-[10px] font-[SF-Pro-Rounded-light] text-[#404040] gap-2 items-center"
                    >
                        {formatDateAndTime(depositRequestInvoice?.updated_at) || '00:00 | 0m'}
                        <span className="w-[12px] h-[12px]">
                            <ClockSvg w='12' h='12' />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileDRIStepRender;
