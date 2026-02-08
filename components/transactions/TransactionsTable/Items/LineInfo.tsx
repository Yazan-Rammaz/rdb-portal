import { LoadingNewColorSvg } from '@/components/Svgs';
import { TransactoionSteps } from '@/types/enum';
import { useEffect, useState } from 'react';


const LineInfo = ({ dri, showTransactions, step, transaction }: { dri: any; showTransactions: any; transaction: any; step: TransactoionSteps }) => {
    // const step = TransactoionSteps.HAS_RF;
    const [show, setShow] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, 1000);
    }, [showTransactions]);
    useEffect(() => {
        // console.log(step, 'stepstepstep');
    }, [step]);
    useEffect(() => {
        // console.log(dri, 'dri');
    }, [dri]);
    useEffect(() => {
        // console.log(transaction, 'transaction');
    }, [transaction]);
    const remaining = Number(dri?.amount) - Number(dri?.received_amount);
    const _getInfo = () => {
        if (step === TransactoionSteps.PROCCESSING) {
            return {
                color: '#FFDF74',
                text: (
                    <span className="flex items-end h-[14px] text-[#404040] gap-1 justify-center">
                        <LoadingNewColorSvg w="14" h="14" color="#404040" /> <span className="h-[14px]">Waiting Blocks Confirm</span>

                    </span>
                )
            };
        } else if (!!remaining && Number(remaining) > 0) {
            return {
                color: 'black',
                text: (
                    <span className="flex items-center gap-1 justify-center">
                        <LoadingNewColorSvg w="14" h="14" color="#FFFFFF" />
                        <span className="h-[14px]">
                            Remaining {remaining} {dri?.crypto_contract?.name}
                        </span>
                    </span>
                )
            };
        } else if (!!remaining && Number(remaining) < 0) {
            return {
                color: 'black',
                text: (
                    <span className="flex items-center gap-1 justify-center">
                        {/* <LoadingNewColorSvg w="14" h="14" color="#FFFFFF" /> */}
                        <span className="h-[14px]">
                            Over paid {-remaining} {dri?.crypto_contract?.name}
                        </span>
                    </span>
                )
            };
        } else if (step === TransactoionSteps.CONFIRMED) {
            return {
                color: '#74AFFF',
                text: (
                    <span className="flex items-center gap-1 justify-center">
                        <span className="h-[14px]">Confirmed</span>
                    </span>
                )
            };
        } else if (step === TransactoionSteps.SCAN_SENDER) {
            return {
                color: '', // '#B16307'
                text: null
            };
            // (
            //         <span className="flex items-end h-[14px] gap-1 justify-center">
            //             <LoadingNewColorSvg w="14" h="14" color="#FFFFFF" /> <span className="h-[14px]">Scan Sender Wallet Risk</span>
            //         </span>
            //     )
        } else if (step === TransactoionSteps.HAS_RF) {
            _hideAfterTimeout();
            return {
                color: '#07B134',
                text: (
                    <span className="flex items-center gap-1 justify-center">
                        <span>Low Risk Sender Wallet</span>
                    </span>
                )
            };
        }
    };
    const _hideAfterTimeout = () => {
        setTimeout(() => {
            setShow(false);
        }, 2000);
    };
    return _getInfo()?.text ? (
        <div
            style={{ backgroundColor: _getInfo()?.color, opacity: show ? 100 : 0, height: show ? '22px' : 0 }}
            className="font-[SF-Pro-Rounded-light] z-[99] delay-1000 text-[10px] transition-all w-[410px] opacity-0 h-0  rounded-b-[10px] text-white flex translate-y-[2px] items-center justify-center absolute left-1/2 transform -translate-x-1/2"
        >
            {_getInfo()?.text}
        </div>
    ) : null;
};

export default LineInfo;
