export enum LoadingTimeEnum {
    agree = 1000,
    generateQrCode = 3000,
    proccessing = 60000,
    starting_depost = 3000
}

export enum WalletsEnum {
    trustwallet = 1,
    trustwalletLink = 'https://link.trustwallet.com/send?',
    metamaskLink = 'https://metamask.app.link/send/',
    metamask = 2
}
export enum CoinsEnum {
    btc = 0,
    usdt_eth = 195,
    usdt_tron = 60,
    eth = 60
}
export enum CryptoIds {
    btc = 0,
    usdt_eth = 6,
    usdt_tron = 7,
    eth = 2
}
export enum TokensEnum {
    btc = 1,
    usdt_eth = 6,
    usdt_tron = 7,
    eth = 2,
    trx = 3
}
export enum ChainsEnum {
    binance = 3,
    ethereum = 1,
    tron = 2
}
export enum Steps {
    SELECT_TOKEN = 1,
    ENTER_AMOUNT,
    DEPOSIT,
    AGREE,
    GENERATE_QR,
    SHOW_QR,
    WALLET_PAY,
    SCAN_QR,
    BLOCKS,
    CONFIRMED,
    DONE,
    REMAINDER,
    OVERPAY
}

export enum TransactoionSteps {
    WAITING_INFO = 1,
    WAITING_DEPOSIT,
    PROCCESSING,
    CONFIRMED,
    SCAN_SENDER,
    DEPOSIT,
    HAS_RF,
    HOLD,
    BLACK_LIST
}
export enum UserRole {
    BusinessPartner = 1,
    Admin
}

export enum DepositrequestStatus {
    NotPaid = 1,
    Paid,
    Canceled,
    PartialPaid,
    OverPaid,
    Hold,
    Expired
}
export enum CryptoTransactionStatus {
    Accepted = 1,
    Failed,
    NotConfirmed
}

export enum DRISteps {
    WAITING_INFO = 1,
    WAITING_DEPOSIT,
    PROCCESSING,
    PAID,
    PARTIALPAID,
    OVERPAID,
    HOLD,
    CANCELED,
    SCAN_SENDER,
    DEPOSIT,
    HAS_RF,
    EXPIRED
}
