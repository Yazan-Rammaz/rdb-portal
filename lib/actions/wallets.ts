import { isEthereumAddress, isTronAddress } from '.';
import Web3 from 'web3';
import { formatBalance } from './utils';
import { BalanceInfo, Result, TransactionsCount, WalletTypes } from '@/types';


const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`);
const apiKeyEtherEnv = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
const apiKeyTronEnv = process.env.NEXT_PUBLIC_TRONSCAN_API_KEY1;

const coinKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;


let rates: { usdtEtherToUsd: any; usdtTronToUsd: any; ethToUsd: any; trxToUsd: any };

//***************************   Ether   **************************** */
const fetchEthBalances = async (address: string): Promise<any> => {
    const keysStored = localStorage.getItem('KEYS');
    const apiKeyEther = keysStored ? JSON.parse(keysStored)?.etherscan : apiKeyEtherEnv;
    const response = await fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKeyEther}`);
    if (!response.ok) throw new Error('Failed to fetch ETH balances');
    const res = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 500));
    return res.result;
};

const fetchUsdtBalances = async (address: string): Promise<any> => {
    const keysStored = localStorage.getItem('KEYS');
    const apiKeyEther = keysStored ? JSON.parse(keysStored)?.etherscan : apiKeyEtherEnv;
    const usdtContractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
    const res = await fetch(
        `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${usdtContractAddress}&address=${address}&tag=latest&apikey=${apiKeyEther}`
    ).then((response) => response.json());
    await new Promise((resolve) => setTimeout(resolve, 500));
    return await res.result;
};
const fetchTransactions = async (address: string): Promise<any> => {
    const keysStored = localStorage.getItem('KEYS');
    const apiKeyEther = keysStored ? JSON.parse(keysStored)?.etherscan : apiKeyEtherEnv;
    const usdtContractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

    const transactionOfAddress = await web3.eth.getTransactionCount(address);
    const transactionUsdtOfAddressRes = await fetch(
        `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${usdtContractAddress}&address=${address}&page=1&offset=1000&startblock=0&apikey=${apiKeyEther}`
    );
    const transactionOfAddressCount = Number(transactionOfAddress);
    const transactionUsdtOfAddress = await transactionUsdtOfAddressRes.json();
    const usdtTransactionsCount = transactionUsdtOfAddress.result ? transactionUsdtOfAddress.result.length : 0;
    const totalTranscations = usdtTransactionsCount + transactionOfAddressCount;
    const one = {
        total: totalTranscations,
        in: '0',
        out: '0'
    };
    await new Promise((resolve) => setTimeout(resolve, 500));
    return one;
};

const arrangeResults = (balancesData: any, usdtBalancesRaw: any): any => {
    const ethBalance = (parseFloat(balancesData) / 1e18).toString();
    const usdtBalance = (parseFloat(usdtBalancesRaw) / 1e6).toString();
    const ethInUsd = parseFloat(ethBalance) * rates.ethToUsd;
    const usdtEtherInUsd = parseFloat(usdtBalance) * rates.usdtEtherToUsd;
    const totalInUsd = ethInUsd + usdtEtherInUsd;

    const balanceInfo: BalanceInfo = {
        ethBalance: formatBalance(ethBalance),
        usdtEthBalance: formatBalance(usdtBalance),
        totalInUsd: formatBalance(totalInUsd),
        ethInUsd: formatBalance(ethInUsd),
        usdtEthInUsd: formatBalance(usdtEtherInUsd)
    };
    return balanceInfo;
};

export const _getEtherAddressesDetails = async (address: string): Promise<Result> => {
    const balancesData = await fetchEthBalances(address);
    const usdtBalances = await fetchUsdtBalances(address);
    const transaction = await fetchTransactions(address);
    const balancesInfo = arrangeResults(balancesData, usdtBalances);
    const result = {
        address: address,
        transactions: transaction,
        balanceInfo: balancesInfo
    };
    return result;
};

//***************************   Tron   **************************** */

export const _getTronAddressDetails = async (address: string) => {
    const keysStored = localStorage.getItem('KEYS');
    const apiKeyTron = keysStored ? JSON.parse(keysStored)?.tronscan : apiKeyTronEnv;
    const response = await fetch(`https://apilist.tronscan.org/api/account?address=${address}`, {
        headers: {
            'TRON-PRO-API-KEY': apiKeyTron
        }
    });
    const data = await response.json();
    const trxBalance = data.balance / 1e6;
    const usdtBalanceData = data.tokens?.find((token: { tokenId: string }) => token.tokenId === 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t');
    const usdtBalance = usdtBalanceData ? usdtBalanceData.balance / 1e6 : 0;
    const transactions: TransactionsCount = {
        total: data.transactions,
        in: data.transactions_in,
        out: data.transactions_out
    };
    const balanceInfo = {
        trxBalance: trxBalance.toString(),
        usdtBalance: usdtBalance.toString()
    };
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
        balanceInfo,
        transactions
    };
};
export const _getTronInfoByAddress = async (address: string) => {
    const { transactions, balanceInfo } = await _getTronAddressDetails(address);
    const { trxBalance, usdtBalance } = balanceInfo;
    const trxInUsd = parseFloat(trxBalance) * rates.trxToUsd;
    const usdtTronInUsd = parseFloat(usdtBalance) * rates.usdtTronToUsd;
    const totalInUsd = trxInUsd + usdtTronInUsd;
    const balanceInfoString: BalanceInfo = {
        trxBalance: formatBalance(trxBalance),
        usdtTronBalance: formatBalance(usdtBalance),
        totalInUsd: formatBalance(totalInUsd),
        trxInUsd: formatBalance(trxInUsd),
        usdtTronInUsd: formatBalance(usdtTronInUsd)
    };
    return {
        balanceInfo: balanceInfoString,
        transactions
    };
};

//***************************   Rates   **************************** */

export const getExchangeRates = async (): Promise<{
    ethToUsd: number;
    trxToUsd: number;
    usdtEtherToUsd: number;
    usdtTronToUsd: number;
}> => {
    const fetchRates = async (): Promise<{
        ethToUsd: number;
        trxToUsd: number;
        usdtEtherToUsd: number;
        usdtTronToUsd: number;
    }> => {
        const keysStored = localStorage.getItem('KEYS');
        const apiKeyTron = keysStored ? JSON.parse(keysStored)?.tronscan : apiKeyTronEnv;
        try {
            const headers: Record<string, string> = {};
            if (coinKey) {
                headers['x-cg-api-key'] = coinKey;
            }
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,tron,tether&vs_currencies=usd', {
                headers
            });

            const data = await response.json();

            const ethToUsd = data.ethereum.usd;
            const trxToUsd = data.tron.usd;
            const usdtEtherToUsd = data.tether.usd;

            const usdtTronResponse = await fetch('https://apilist.tronscanapi.com/api/token_trc20?contract=TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', {
                headers: {
                    'TRON-PRO-API-KEY': apiKeyTron
                }
            });
            const usdtTronData = await usdtTronResponse.json();
            // console.log(usdtTronData, 'usdtTronData');
            const usdtTronToUsd = usdtTronData?.trc20_tokens?.length > 0 && usdtTronData?.trc20_tokens[0]?.market_info.priceInUsd;

            return {
                ethToUsd,
                trxToUsd,
                usdtEtherToUsd,
                usdtTronToUsd
            };
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            await new Promise((resolve) => setTimeout(resolve, 120000));
            return await fetchRates();
        }
    };

    const rates = await fetchRates();
    return rates;
};

//***************************   Get Details   **************************** */
export interface UpdatedWallet extends WalletTypes {
    newData?: Result;
}
export const _getBalancesAndTransactionsSequentially = async ({ wallets }: { wallets: WalletTypes }): Promise<UpdatedWallet> => {
    const ratesFromStorage = localStorage.getItem('rates');
    rates = ratesFromStorage && JSON.parse(ratesFromStorage);
    const walletsArr = wallets.crypto_wallets;

    const updatedCryptoWallets = await Promise.all(
        walletsArr.map(async (wallet) => {
            const address = wallet?.address;
            let newData: Result | undefined = undefined;

            if (isEthereumAddress(address)) {
                newData = await _getInfoEtherAccounts(address);
            } else if (isTronAddress(address)) {
                newData = await _getInfoTronAccount(address);
            }

            if (newData) {
                return { ...wallet, ...newData };
            }
            return wallet;
        })
    );

    return { ...wallets, crypto_wallets: updatedCryptoWallets };
};

const _getInfoEtherAccounts = async (account: string): Promise<Result> => {
    const result: Result = await _getEtherAddressesDetails(account);
    return result;
};
const _getInfoTronAccount = async (address: string): Promise<Result> => {
    const { balanceInfo, transactions } = await _getTronInfoByAddress(address);
    const result = {
        address,
        balanceInfo,
        transactions
    };

    return result;
};
