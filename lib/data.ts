export const operation_units = [
    {
        id: 1,
        name: 'Equiti Jordan',
        is_jordon: 1,
        is_seychelles: 0,
        is_vcg: 0,
        code: 'J',
        shortcuts: [
            {
                id: 1,
                ticket_operating_unit_id: 1,
                shortcut: 'jo',
                created_at: '2024-03-17T08:14:27.000000Z',
                updated_at: '2024-03-17T08:14:27.000000Z',
                deleted_at: null
            },
            {
                id: 2,
                ticket_operating_unit_id: 1,
                shortcut: 'jordan',
                created_at: '2024-03-17T08:14:33.000000Z',
                updated_at: '2024-03-17T08:14:33.000000Z',
                deleted_at: null
            },
            {
                id: 12,
                ticket_operating_unit_id: 1,
                shortcut: 'J',
                created_at: '2024-05-08T10:40:36.000000Z',
                updated_at: '2024-05-08T10:40:36.000000Z',
                deleted_at: null
            },
            {
                id: 13,
                ticket_operating_unit_id: 1,
                shortcut: 'Equiti Jordan',
                created_at: '2024-05-08T10:40:44.000000Z',
                updated_at: '2024-05-08T10:40:44.000000Z',
                deleted_at: null
            }
        ]
    },
    {
        id: 2,
        name: 'Equiti Seychelles',
        is_jordon: 0,
        is_seychelles: 1,
        is_vcg: 0,
        code: 'OU1',
        shortcuts: [
            {
                id: 3,
                ticket_operating_unit_id: 2,
                shortcut: 'seychelles',
                created_at: '2024-03-17T08:16:30.000000Z',
                updated_at: '2024-03-17T08:16:30.000000Z',
                deleted_at: null
            },
            {
                id: 4,
                ticket_operating_unit_id: 2,
                shortcut: 'sey',
                created_at: '2024-03-17T08:16:35.000000Z',
                updated_at: '2024-03-17T08:16:35.000000Z',
                deleted_at: null
            },
            {
                id: 10,
                ticket_operating_unit_id: 2,
                shortcut: 'Equiti Seychelles',
                created_at: '2024-05-08T10:39:50.000000Z',
                updated_at: '2024-05-08T10:39:50.000000Z',
                deleted_at: null
            },
            {
                id: 11,
                ticket_operating_unit_id: 2,
                shortcut: 'OU1',
                created_at: '2024-05-08T10:40:11.000000Z',
                updated_at: '2024-05-08T10:40:11.000000Z',
                deleted_at: null
            },
            {
                id: 14,
                ticket_operating_unit_id: 2,
                shortcut: 'Seychelles',
                created_at: '2024-05-08T10:58:44.000000Z',
                updated_at: '2024-05-08T10:58:44.000000Z',
                deleted_at: null
            }
        ]
    },
    {
        id: 3,
        name: 'VCG',
        is_jordon: 0,
        is_seychelles: 0,
        is_vcg: 1,
        code: 'VCG',
        shortcuts: [
            {
                id: 5,
                ticket_operating_unit_id: 3,
                shortcut: 'vcg',
                created_at: '2024-03-17T08:17:02.000000Z',
                updated_at: '2024-03-17T08:17:02.000000Z',
                deleted_at: null
            }
        ]
    },
    {
        id: 4,
        name: 'Ilimits',
        is_jordon: 0,
        is_seychelles: 0,
        is_vcg: 0,
        code: null,
        shortcuts: []
    },
    {
        id: 5,
        name: 'VCG Istanbul',
        is_jordon: 0,
        is_seychelles: 0,
        is_vcg: 1,
        code: 'vcg_Istanbul',
        shortcuts: [
            {
                id: 8,
                ticket_operating_unit_id: 5,
                shortcut: 'vcg_Istanbul',
                created_at: '2024-05-08T10:39:19.000000Z',
                updated_at: '2024-05-08T10:39:19.000000Z',
                deleted_at: null
            },
            {
                id: 9,
                ticket_operating_unit_id: 5,
                shortcut: 'VCG Istanbul',
                created_at: '2024-05-08T10:39:29.000000Z',
                updated_at: '2024-05-08T10:39:29.000000Z',
                deleted_at: null
            }
        ]
    },
    {
        id: 6,
        name: 'VCG Erbil',
        is_jordon: 0,
        is_seychelles: 0,
        is_vcg: 1,
        code: 'V',
        shortcuts: [
            {
                id: 6,
                ticket_operating_unit_id: 6,
                shortcut: 'V',
                created_at: '2024-05-08T10:38:21.000000Z',
                updated_at: '2024-05-08T10:38:21.000000Z',
                deleted_at: null
            },
            {
                id: 7,
                ticket_operating_unit_id: 6,
                shortcut: 'VCG Erbil',
                created_at: '2024-05-08T10:38:31.000000Z',
                updated_at: '2024-05-08T10:38:31.000000Z',
                deleted_at: null
            }
        ]
    },
    {
        id: 7,
        name: 'VCG Iraq',
        is_jordon: 0,
        is_seychelles: 0,
        is_vcg: 1,
        code: 'Vcg_Iraq',
        shortcuts: [
            {
                id: 15,
                ticket_operating_unit_id: 7,
                shortcut: 'Vcg_Iraq',
                created_at: '2024-05-10T10:13:25.000000Z',
                updated_at: '2024-05-10T10:13:25.000000Z',
                deleted_at: null
            },
            {
                id: 16,
                ticket_operating_unit_id: 7,
                shortcut: 'VCG Iraq',
                created_at: '2024-05-10T10:13:34.000000Z',
                updated_at: '2024-05-10T10:13:34.000000Z',
                deleted_at: null
            }
        ]
    }
];

export const _getOperationName = (id: number): string => {
    return operation_units.find((one) => one.id === id)?.name || '';
};

export const testDri = {
    id: 134,
    total: null,
    user_id: 8,
    created_at: '2024-08-21T12:57:18.000000Z',
    updated_at: '2024-08-21T12:57:40.000000Z',
    client: null,
    trading_number: null,
    amount: '101',
    received_amount: null,
    token: 'jhykgEeU8FJuKMuJ',
    status: 2,
    crypto_contract_id: 6,
    crypto_wallet_id: 53,
    ticket_id: null,
    client_id: null,
    deposit_request_id: 'dasd',
    rf: null,
    ticket_operating_unit_id: null,
    user: {
        id: 8,
        name: 'yazan',
        city_code: null
    },
    crypto_contract: {
        id: 6,
        name: 'Ethereum'
    },
    crypto_wallet: {
        id: 53,
        name: '004',
        address: '0x8aC26e206B5584F9A0872910a664f41f7dC21666'
    },
    crypto_transactions: []
};
