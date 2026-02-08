import { CryptoTransactionStatus, DepositrequestStatus, DRISteps, TokensEnum, TransactoionSteps } from '@/types/enum';

import { getExchangeRates } from './wallets';
import { formatBalance } from './utils';

export const _getTokenByUsd = async (tokenId: TokensEnum, balance: any) => {
    const ratesStored = localStorage.getItem('rates');
    let rates = ratesStored && JSON.parse(ratesStored);
    if (!rates) {
        rates = await getExchangeRates();
        localStorage.setItem('rates', JSON.stringify(rates));
    }
    if (tokenId)
        switch (tokenId) {
            case TokensEnum.eth:
                const EthInUsd = parseFloat(balance) * rates.ethToUsd;
                return formatBalance(EthInUsd);
            case TokensEnum.trx:
                const TrxInUsd = parseFloat(balance) * rates.trxToUsd;
                return formatBalance(TrxInUsd);
            case TokensEnum.usdt_tron:
                const UsdtEthInUsd = parseFloat(balance) * rates.usdtEtherToUsd;
                return formatBalance(UsdtEthInUsd);
            case TokensEnum.usdt_eth:
                const UsdtTronInUsd = parseFloat(balance) * rates.usdtTronToUsd;
                return formatBalance(UsdtTronInUsd);
            default:
                return balance;
        }
};

export const _getUpdatedDRIData = async (DRIData: any) => {
    const balanceInUsd = await _getTokenByUsd(DRIData?.crypto_contract?.id, DRIData?.amount);
    const commission = _getCommission(balanceInUsd);
    return {
        ...DRIData,
        balanceInUsd: balanceInUsd,
        commission: commission
    };
};
export const _getTokenName = (tokenId: any) => {
    if (tokenId)
        switch (tokenId) {
            case TokensEnum.eth:
                return 'ETH';
            case TokensEnum.trx:
                return 'TRX';
            case TokensEnum.usdt_tron:
                return 'USDT';
            case TokensEnum.usdt_eth:
                return 'USDT';
            default:
                return tokenId;
        }
};

export const _getCommission = (amount: number): string => {
    const commissionRate = 0.0005;
    const commission = amount * commissionRate;
    return formatBalance(commission);
};
export const _calcDRIStep = (depositRequestInvoice: any): DRISteps => {
    // return TransactoionSteps.HAS_RF;

    switch (depositRequestInvoice?.status) {
        case DepositrequestStatus.NotPaid:
            if (depositRequestInvoice?.crypto_transactions?.lenght > 0) {
                return DRISteps.PROCCESSING;
            }
            if (!depositRequestInvoice?.amount) {
                return DRISteps.WAITING_INFO;
            } else {
                return DRISteps.WAITING_DEPOSIT;
            }
        case DepositrequestStatus.Paid:
            return DRISteps.PAID;
        case DepositrequestStatus.PartialPaid:
            return DRISteps.PARTIALPAID;
        case DepositrequestStatus.OverPaid:
            return DRISteps.OVERPAID;
        case DepositrequestStatus.Hold:
            return DRISteps.HOLD;
        case DepositrequestStatus.Canceled:
            return DRISteps.CANCELED;
        case DepositrequestStatus.Expired:
            return DRISteps.EXPIRED;
        default:
            return DRISteps.HAS_RF;
    }
};
export const _calcTransactionStep = (cryptoTransaction: any): TransactoionSteps => {
    // return CryptoTransactionStatus.Failed;
    switch (cryptoTransaction?.status) {
        case CryptoTransactionStatus.Accepted:
            return TransactoionSteps.CONFIRMED;
        case CryptoTransactionStatus.Failed:
            return TransactoionSteps.HOLD;
        case CryptoTransactionStatus.NotConfirmed:
            return TransactoionSteps.PROCCESSING;
        default:
            return TransactoionSteps.SCAN_SENDER;
    }
};
