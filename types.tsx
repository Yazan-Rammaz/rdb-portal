import { CryptoTransactionStatus } from './types/enum';

export interface CryptoContractInterface {
    coin: any;
    id: number;
    name: string;
    icon_path: string;
    admin_wallet_address: string;
    price_in_dollar: number | null;
    hash: string;
    abi: string;
    created_at: string;
    updated_at: string;
    crypto_chain_id: number;
    decimal: number;
    is_deployed: number;
    is_active: number;
    symbol: string;
    is_btc: number;
}

export interface DRIDataInterface {
    id: number;
    crypto_contract_id?: number;
    user_id: number | null;
    token: string;
    amount: string;
    received_amount: number | null;
    remaining: number;
    status: number;
    to: string | null;
    client: string;
    trading_number: string;
    public_key: string;
    crypto_wallet_address: string;
    crypto_contract: CryptoContractInterface;
    created_at: string;
    updated_at: string;
    crypto_transactions: any[];
}

export interface CryptoTransactionInterface {
    id: number;
    confirmed_by_frontend: number;
    confirmed_by_backend: number;
    amount: string;
    status: CryptoTransactionStatus;
    from: string | null;
    to: string;
    hash: string;
    crypto_contract: CryptoContractInterface;
    created_at: string;
    updated_at: string;
}
export interface CheckResponseTypes extends DRIDataInterface {
    step: number;
}
export const defaultCryptoTransactionRes: DRIDataInterface = {
    crypto_contract_id: 0,
    user_id: null,
    amount: '',
    status: 0,
    created_at: '',
    updated_at: '',
    to: null,
    client: '',
    public_key: '',
    crypto_wallet_address: '',
    trading_number: '',
    crypto_contract: {} as CryptoContractInterface,
    crypto_transactions: [],
    remaining: 0,
    id: 0,
    token: '',
    received_amount: null
};

export interface UserInterface {
    access_token?: string;
    id?: number;
    username: string;
    avatar: string;
    user: any
}
export type BalanceInfo = {
    trxBalance?: string;
    ethBalance?: string;
    usdtTronBalance?: string;
    usdtEthBalance?: string;
    totalInUsd?: string;
    trxInUsd?: string;
    ethInUsd?: string;
    usdtTronInUsd?: string;
    usdtEthInUsd?: string;
};
export type TransactionsCount = {
    total?: string;
    in?: string;
    out?: string;
};

export type Result = {
    address: string;
    balanceInfo: BalanceInfo | null;
    transactions?: TransactionsCount | any;
};
export interface CryptoChain {
    id: number;
    chainName: string;
    symbol: string;
}
export interface CryptoContract {
    abi?: any[];
    admin_wallet_address?: string;
    coin?: null;
    created_at?: string;
    crypto_chain_id?: number;
    decimal?: number;
    hash?: string;
    icon_path?: string;
    id?: number;
    is_active?: number;
    is_btc?: number;
    is_deployed?: number;
    name?: string;
    pivot?: { crypto_wallet_id?: number; crypto_contract_id?: number; balance?: string; usdtbalance?: string; usdtBalance?: string };
    balance?: string;
    crypto_contract_id?: 5;
    crypto_wallet_id?: 49;
    price_in_dollar?: any;
    symbol?: string;
    updated_at?: string;
}

export interface CryptoWallet {
    totalInUsd: string;
    totalTranscations: string;
    transactionsIn: string;
    transactionsOut: string;
    address: any;
    id: number;
    balance: string;
    crypto_chain_id: number;
    crypto_chain: CryptoChain;
    crypto_transactions: any[];
    transactions?: any;
    crypto_contracts: CryptoContract[];
    balanceInfo?: BalanceInfo | any;
}
export interface ChainInfo {
    name: string;
    id: number;
    wallets: number;
    wallet_transactions: number;
    balance: string;
    crypto_contracts: CryptoContract[];
}
export interface WalletTypes {
    id: number;
    name: string;
    trust?: number;
    is_main: number;
    loading: boolean;
    crypto_wallets: CryptoWallet[];
    totalBalance?: string;
    ethereumBalance?: string;
    totalTranscations?: string;
    ethereum?: ChainInfo;
    tron?: ChainInfo;
    binance?: ChainInfo;
}
export interface WalletsInfo {
    walletsBalances: string;
    walletsTransactions: number;
    walletsCount: number;
}
