import React, { JSX } from 'react';
import { BTCSvg, BinanceSvg, EthSvg, EthereumSvg, TronSvg, TrxSvg, UsdtEthSvg, UsdtTronSvg } from '@/components/Svgs';
import { ChainsEnum, TokensEnum } from '@/types/enum';
import { ChainInfo, CryptoContract, CryptoWallet, Result, WalletsInfo, WalletTypes } from '@/types';
import { UpdatedWallet } from './wallets';


export const _getTokenLogoByid = ({
  id,
  w,
  h,
  color,
}: {
  id: number;
  w?: string;
  h?: string;
  color?: string;
}): JSX.Element => {
  switch (id) {
    case TokensEnum.eth:
      return <EthSvg w={w} h={h} color={color} />;
    case TokensEnum.trx:
      return <TrxSvg w={w} h={h} color={color} />;
    case TokensEnum.usdt_eth:
      return <UsdtEthSvg w={w} h={h} color={color} />;
    case TokensEnum.usdt_tron:
      return <UsdtTronSvg w={w} h={h} color={color} />;
    case TokensEnum.btc:
      return <BTCSvg w={w} h={h} color={color} />;
    default:
      return <></>;
  }
};


export const _getChainLogoByid = ({ id, w, h, color }: { id: number; w?: string; h?: string; color?: string }) => {
    switch (id) {
        case ChainsEnum.binance:
            return <BinanceSvg w={w} h={h} color={color} />;
        case ChainsEnum.ethereum:
            return <EthereumSvg w={w} h={h} color={color} />;
        case ChainsEnum.tron:
            return <TronSvg w={w} h={h} color={color} />;
    }
};
export const _getChainNameById = (chainId?: number) => {
    if (chainId)
        switch (chainId) {
            case ChainsEnum.ethereum:
                return 'ethereum';
            case ChainsEnum.tron:
                return 'tron';
            case ChainsEnum.binance:
                return 'binance';
            default:
                return null;
        }
};

export const _analysData = (
    fetchedWallets: WalletTypes[]
): {
    chains: ChainInfo[];
    walletsInfo: WalletsInfo;
    wallets: WalletTypes[];
} => {
    let ethereum: ChainInfo = {
        name: 'ETHEREUM',
        id: ChainsEnum.ethereum,
        wallets: 0,
        wallet_transactions: 0,
        balance: '0.00',
        crypto_contracts: []
    };

    let tron: ChainInfo = {
        name: 'TRON',
        id: ChainsEnum.tron,
        wallets: 0,
        wallet_transactions: 0,
        balance: '0.00',
        crypto_contracts: []
    };

    let binance: ChainInfo = {
        name: 'BINANCE',
        id: ChainsEnum.binance,
        wallets: 0,
        wallet_transactions: 0,
        balance: '0.00',
        crypto_contracts: []
    };

    let totalBalance = 0;
    let totalTranscations = 0;
    let totalWallets = 0;

    fetchedWallets.forEach((wallet) => {
        totalWallets += 1;
        wallet.crypto_wallets.forEach((cw) => {
            const balance = parseFloat(cw.balance);
            const transactionsCount = parseFloat(cw?.totalTranscations) ? parseFloat(cw?.totalTranscations) : cw.crypto_transactions?.length;
            const contracts = cw.crypto_contracts.map((contract: any) => ({ id: contract.id }));
            totalBalance += balance;
            totalTranscations += transactionsCount;

            switch (cw.crypto_chain_id) {
                case ChainsEnum.ethereum:
                    ethereum.balance = formatBalance(parseFloat(ethereum.balance) + balance);
                    ethereum.wallet_transactions += transactionsCount;
                    ethereum.wallets += 1;
                    ethereum.crypto_contracts.push(...contracts);
                    break;
                case ChainsEnum.tron:
                    tron.balance = formatBalance(parseFloat(tron.balance) + balance);
                    tron.wallet_transactions += transactionsCount;
                    tron.wallets += 1;
                    tron.crypto_contracts.push(...contracts);
                    break;
                case ChainsEnum.binance:
                    binance.balance = formatBalance(parseFloat(binance.balance) + balance);
                    binance.wallet_transactions += transactionsCount;
                    binance.wallets += 1;
                    binance.crypto_contracts.push(...contracts);
                    break;
                default:
                    break;
            }
        });
    });

    ethereum.crypto_contracts = Array.from(new Set(ethereum.crypto_contracts.map((a) => a.id))).map((id) => ({ id }));
    tron.crypto_contracts = Array.from(new Set(tron.crypto_contracts.map((a) => a.id))).map((id) => ({ id }));
    binance.crypto_contracts = Array.from(new Set(binance.crypto_contracts.map((a) => a.id))).map((id) => ({ id }));

    const processedWallets = fetchedWallets.map((wallet) => {
        let walletTotalBalance = 0;
        wallet.crypto_wallets.forEach((cw) => {
            walletTotalBalance += parseFloat(cw.balance);
        });
        let walletTransactions = 0;
        wallet.crypto_wallets.forEach((cw) => {
            walletTransactions = parseFloat(cw?.totalTranscations)
                ? parseFloat(cw?.totalTranscations) + walletTransactions
                : walletTransactions + cw.crypto_transactions?.length;
        });

        return {
            ...wallet,
            totalBalance: formatBalance(walletTotalBalance),
            totalTranscations: walletTransactions.toString()
        };
    });

    return {
        chains: [ethereum, tron, binance],
        walletsInfo: {
            walletsBalances: formatBalance(totalBalance),
            walletsTransactions: totalTranscations,
            walletsCount: totalWallets
        },
        wallets: processedWallets
    };
};
export const _getWalletsAddresses = (
    fetchedWallets: WalletTypes[]
): {
    addresses: string[];
} => {
    let addresses = fetchedWallets.flatMap((wallet) => wallet.crypto_wallets.map((cw) => cw.address));
    return {
        addresses
    };
};

export function formatBalance(value: any): string {
    if (value === undefined || value === null) {
        return '0';
    }

    const number = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(number)) {
        return '0';
    }

    const formatted = number.toFixed(10);

    const realNumber = parseFloat(formatted).toLocaleString('fullwide', { useGrouping: false, maximumFractionDigits: 10 });

    return realNumber;
}
const _getNewBalance = (cryptoContract: CryptoContract, match: Result) => {
    switch (cryptoContract?.id) {
        case TokensEnum.eth:
            return match.balanceInfo?.ethBalance;
        case TokensEnum.usdt_eth:
            return match.balanceInfo?.usdtEthBalance;
        case TokensEnum.usdt_tron:
            return match.balanceInfo?.usdtTronBalance;
        case TokensEnum.trx:
            return match.balanceInfo?.trxBalance;
        default:
            return cryptoContract.pivot?.balance;
    }
};
const _getNewDollarBalance = (cryptoContract: CryptoContract, match: Result) => {
    switch (cryptoContract?.id) {
        case TokensEnum.eth:
            return match.balanceInfo?.ethInUsd;
        case TokensEnum.usdt_eth:
            return match.balanceInfo?.usdtEthInUsd;
        case TokensEnum.usdt_tron:
            return match.balanceInfo?.usdtTronInUsd;
        case TokensEnum.trx:
            return match.balanceInfo?.trxInUsd;
        default:
            return cryptoContract.pivot?.balance;
    }
};
const updateCryptoContracts = (newData: any, crypto_contracts: CryptoContract[]) => {
    if (!newData) {
        return crypto_contracts;
    }
    return crypto_contracts.map((one) => {
        const balance = _getNewBalance(one, newData);
        const usdtBalance = _getNewDollarBalance(one, newData);
        return {
            ...one,
            pivot: {
                ...one.pivot,
                balance: balance,
                usdtBalance: usdtBalance
            }
        };
    });
};
export const updateWallets = (wallets: WalletTypes[], newWallet: UpdatedWallet): WalletTypes[] => {
    return wallets.map((wallet) => {
        if (wallet.id === newWallet.id) {
            const updatedCryptoWallets = wallet.crypto_wallets.map((cryptoWallet) => {
                const match = newWallet.crypto_wallets.find((infoItem: CryptoWallet) => infoItem.address.toLowerCase() === cryptoWallet.address.toLowerCase());
                if (match) {
                    return {
                        ...cryptoWallet,
                        balance: match?.balanceInfo?.totalInUsd || match?.balance,
                        crypto_contracts: updateCryptoContracts(match, cryptoWallet.crypto_contracts),
                        totalInUsd: match?.balanceInfo?.totalInUsd,
                        totalTranscations: match?.transactions?.total,
                        transactionsIn: match?.transactions?.in,
                        transactionsOut: match?.transactions?.out
                    };
                }
                return cryptoWallet;
            });

            return {
                ...wallet,
                crypto_wallets: updatedCryptoWallets,
                loading: false
            };
        }
        return wallet;
    });
};
