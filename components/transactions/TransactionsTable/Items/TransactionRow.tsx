import { useLayout } from '@/context/LayoutContext';
import { DRISteps, UserRole } from '@/types/enum';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material';
import TransactionStatusColor from './TransactionStatusColor';
import TransactionStepRender from './TransactionStepRender';
import DRIStepRender from './DRIStepRender';
import API from '@/lib/api';
import MobileTransactionStatusColor from './MobileTransactionStatusColor';
import MobileDRIStepRender from './MobileDRIStepRender';
import MobileTransactionStepRender from './MobileTransactionStepRender';
import { ArrowRounded2Svg, ClockSvg, LoadingNewColorSvg, ArrowRoundedSvg } from '@/components/Svgs'; // Fixed missing SVG names
import { _calcDRIStep } from '@/lib/actions/transactions';

const Container = styled('div')(
    ({ showTransactions, cryptoTransactionsLength }: { showTransactions: boolean; cryptoTransactionsLength: number }) => `
  position: relative;
  height: 100%;
  padding-bottom: auto;
  margin-bottom:0;
`
);
const MobileContainer = styled('div')(
    ({ showTransactions, cryptoTransactionsLength }: { showTransactions: boolean; cryptoTransactionsLength: number }) => `
  position: relative;
  height: 100%;
  padding-bottom: auto;
  margin-bottom:0;
`
);
const ContentWrapper = styled('div')(
    ({ showTransactions }: { showTransactions: boolean }) => `
  position: relative;
  transition: all 0.1s ease-in-out;
  border-radius: 10px;
  background-color: white;
  border: 0.5px solid #dddddd75;
  border-bottom: ${showTransactions ? '' : 'none'};
  font-weight: light;
  font-size: 12px;
  color: #5d5d5d;
`
);
const MobileContentWrapper = styled('div')(
    ({ showTransactions }: { showTransactions: boolean }) => `
  position: relative;
  transition: all 0.1s ease-in-out;
  border-radius: 10px;
  background-color: white;
  border: 0.5px solid #dddddd75;
  border-bottom: ${showTransactions ? '' : 'none'};
  font-weight: light;
  font-size: 12px;
  color: #5d5d5d;
`
);
const TransactionRow = ({ data, _openIframe, _closeIframe, filters, cryptoContracts, isTest = false }: any) => {
    const { user, isMobile } = useLayout();
    const [DRIStep, setDRIStep] = useState<DRISteps>(DRISteps.WAITING_INFO);
    const [showTransactions, setShowTransactions] = useState<boolean>(false);

    const _getDRIStep = (depositRequestInvoice: any) => {
        const step = _calcDRIStep(depositRequestInvoice);
        if (step === DRISteps.PROCCESSING) {
            setShowTransactions(true);
        }
        setDRIStep(step);
    };
    useEffect(() => {
        // _updateDRIData();
        _getDRIStep(data);
    }, [data]);
    const _openIframeByToken = async (token: any) => {
        if (user?.user?.type !== UserRole.Admin && DRIStep !== DRISteps.EXPIRED) {
            if (token) {
                const url = await API.get(
                    `/api/v1/deposit_request_invoice/urlByToken/${token}`,
                    {},
                    (data) => data?.data?.url,
                    (e) => e,
                    {
                        authorization: `Bearer ${user?.access_token}`
                    }
                );
                // if (url) {
                    _closeIframe;
                    _openIframe(url);
                // }
            }
        }
    };
    const _handleOpenClosetransactions = () => {
        setShowTransactions(!showTransactions);
        if (data?.crypto_transactions?.length === 0) {
            setTimeout(() => {
                setShowTransactions(false);
            }, 1000);
        }
    };
    return (
        <div className={`${showTransactions ? 'mb-[15px]' : 'mb-0'} transition-all duration-200 ease-in-out flex flex-col w-[-webkit-fill-available]  gap-y-[5px] ${isMobile ? "min-h-[110px]" : "min-h-[60px]"}`}>
            {isMobile ? <MobileContainer showTransactions={showTransactions} cryptoTransactionsLength={data?.crypto_transactions?.length} className='flex flex-row overflow-x-scroll overflow-y-hidden no-scrollbar'>
                <MobileContentWrapper className={`${showTransactions ? 'h-[calc(100%)]' : 'h-full'} mr-[5px]`} showTransactions={showTransactions} style={{
                    minWidth: "calc(100vw - 25px)"
                }}>
                    <MobileTransactionStatusColor step={DRIStep} />
                    <div className="relative">
                        <MobileDRIStepRender
                            _openIframeByToken={_openIframeByToken}
                            showTransactions={showTransactions}
                            handleOpenTransactions={_handleOpenClosetransactions}
                            setCurrentStep={setDRIStep}
                            depositRequestInvoice={data}
                            step={DRIStep}
                        />
                    </div>
                    {data?.crypto_transactions?.length > 0 && (
                        <div
                            style={{
                                opacity: showTransactions ? 1 : 0,
                                height: showTransactions ? 50 + data?.crypto_transactions?.length * 80 : 0
                            }}
                            className={`flex items-center  transition-all rounded-b-[10px] justify-start flex-col bg-[#F7F7F7]`}
                        >
                            <div className="flex items-center pt-[10px] pb-[10px] px-[20px] w-full justify-start">
                                <div className="border-b-[#DDDDDD] border-b text-[#A2A0A0] w-full pb-2">Transactions</div>
                            </div>
                            <div className="relative flex flex-col w-full">
                                {data?.crypto_transactions?.map((crypto_transaction: any, key: number) => (
                                    <MobileTransactionStepRender showTransactions={showTransactions} key={key} transaction={crypto_transaction} dri={data} />
                                ))}
                            </div>
                        </div>
                    )}
                </MobileContentWrapper>
                <div
                    className={`min-w-[256px] transition-opacity h-[110px] px-[10px]
                         py-[4px] ease-in-out duration-500 text-[10px] font-[SF-Pro-Rounded-light] z-[9999] rounded-[10px]
                          bg-[#F3F3F3]`}
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
                                {DRIStep === DRISteps.WAITING_INFO ? <LoadingNewColorSvg color="#404040" /> : <div className="w-[20px]" />}Waiting Info
                            </span>
                            <span className="flex font-[SF-Pro-Rounded-light] gap-x-1">
                                00:00:00 <ClockSvg w="10" h="10" />
                            </span>
                        </span>
                        <span className="flex items-center gap-x-1 justify-between w-full">
                            <span className="flex pl-[8px] items-center justify-start gap-x-1 font-[SF-Pro-Rounded-light]">
                                {DRIStep === DRISteps.WAITING_DEPOSIT ? <LoadingNewColorSvg color="#404040" /> : <div className="w-[20px]" />} Waiting Transaction
                            </span>
                            <span className="flex font-[SF-Pro-Rounded-light] gap-x-1">
                                00:00:00 <ClockSvg w="10" h="10" />
                            </span>
                        </span>
                        <span className="flex items-center gap-x-1 justify-between w-full">
                            <span className="flex pl-[8px] items-center justify-start gap-x-1 font-[SF-Pro-Rounded-light]">
                                {DRIStep === DRISteps.PROCCESSING ? <LoadingNewColorSvg color="#404040" /> : <div className="w-[20px]" />} Processing
                            </span>
                            <span className="flex font-[SF-Pro-Rounded-light] gap-x-1">
                                00:00:00 <ClockSvg w="10" h="10" />
                            </span>
                        </span>
                        <span className="flex items-center gap-x-1 justify-between w-full">
                            <span className="flex pl-[8px] items-center justify-start gap-x-1 font-[SF-Pro-Rounded-light]">
                                {DRIStep === DRISteps.DEPOSIT ? <LoadingNewColorSvg color="#404040" /> : <div className="w-[20px]" />} Waiting RF
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
            </MobileContainer> : <Container showTransactions={showTransactions} cryptoTransactionsLength={data?.crypto_transactions?.length}>
                <ContentWrapper className={`${showTransactions ? 'h-[calc(100%)]' : 'h-full'}`} showTransactions={showTransactions}>
                    <TransactionStatusColor step={DRIStep} />
                    <div className="relative">
                        <DRIStepRender
                            _openIframeByToken={_openIframeByToken}
                            showTransactions={showTransactions}
                            handleOpenTransactions={_handleOpenClosetransactions}
                            setCurrentStep={setDRIStep}
                            depositRequestInvoice={data}
                            step={DRIStep}
                        />
                    </div>
                    {data?.crypto_transactions?.length > 0 && (
                        <div
                            style={{
                                opacity: showTransactions ? 1 : 0,
                                height: showTransactions ? 50 + data?.crypto_transactions?.length * 44 : 0
                            }}
                            className={`flex items-center  transition-all rounded-b-[10px] justify-start flex-col bg-[#F7F7F7]`}
                        >
                            <div className="flex items-center pt-[10px] pb-[10px] px-[20px] w-full justify-start">
                                <div className="border-b-[#DDDDDD] border-b text-[#A2A0A0] w-full pb-2">Transactions</div>
                            </div>
                            <div className="relative flex flex-col w-full">
                                {data?.crypto_transactions?.map((crypto_transaction: any, key: number) => (
                                    <TransactionStepRender showTransactions={showTransactions} key={key} transaction={crypto_transaction} dri={data} />
                                ))}
                            </div>
                        </div>
                    )}
                </ContentWrapper>
            </Container>}
        </div>
    );
};
export default TransactionRow;
