import { DRISteps } from '@/types/enum';
import { useEffect, useState } from 'react';

const MobileTransactionStatusColor = ({ step }: { step: DRISteps }) => {

    const [color, setColor] = useState<string>('');
    useEffect(() => {
        const color = _getColor(step);
        setColor(color);
    }, [step]);

    const _getColor = (step: DRISteps) => {
        switch (step) {
            case DRISteps.WAITING_INFO:
                return '#D1D1D1';
            case DRISteps.EXPIRED:
                return '#D1D1D1';
            case DRISteps.WAITING_DEPOSIT:
                return '#A2A0A0';
            case DRISteps.PROCCESSING:
                return '#FFDF74';
            case DRISteps.OVERPAID:
                return '#70EF79';
            case DRISteps.PARTIALPAID:
                return '#74AFFF';
            case DRISteps.PAID:
                return '#70EF79';
            case DRISteps.HAS_RF:
                return '#70EF79';
            case DRISteps.HOLD:
                return '#74AFFF';
            case DRISteps.CANCELED:
                return '#FFAC65';
            case DRISteps.DEPOSIT:
                return '#70EF79';
            case DRISteps.SCAN_SENDER:
                return '#B16307';
            default:
                return '#D1D1D1';
        }
    };
    return (
        <div
            style={{
                backgroundColor: color
            }}
            className={`z-[999] absolute h-[110px] w-[10px] left-0 rounded-l-[10px]`}
        />
    );
};
export default MobileTransactionStatusColor;
