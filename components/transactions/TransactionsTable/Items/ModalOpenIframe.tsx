import { useLayout } from '@/context/LayoutContext';
import AmountInput from './AmountInput';
import SelectUser from './SelectUser';
import Button from './Button';
import Select, { Token } from './Select';
import { ArrowRoundedSvg, CloseSvg } from '@/components/Svgs';
import { useEffect, useState } from 'react';
import axios from 'axios';
import API from '@/lib/api';


interface ModalOpenIframeProps {
    _openIframe: (value: string) => void;
    closeModal?: () => void;
}

interface DepositPayload {
    ticket_operating_unit_id?: number;
    deposit_request_id?: string;
    client_name?: string;
    client_id?: string;
    trading_number?: string;
    crypto_contract_name?: string;
    amount?: number;
}
const ModalOpenIframe = ({ _openIframe, closeModal }: ModalOpenIframeProps) => {
    const { user } = useLayout();

    const [clients, setClients] = useState({
        data: [],
        selected: { name: null, trading_number: null, id: null },
        open: false
    });
    const [entities, setEntities] = useState({
        data: [],
        selected: { name: null, id: null },
        open: false
    });

    const [tokens, setTokens] = useState<any[]>([]);
    const [tokenSelected, setTokenSelected] = useState<Token | null>();
    const [amount, setAmount] = useState<any>('0.00');
    const [depositRequestId, setDepositRequestId] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSelectUser = () => {};
    const handleSelectToken = (token: any) => {
        setTokenSelected(token);
    };
    const handleEnterAmount = (e: any) => {
        if (parseFloat(e.target.value) > 0) {
            setAmount(e.target.value);
        } else {
            setAmount('0.00');
        }
    };
    const _getTokens = async (): Promise<any> => {
        return await API.get(
            '/api/v1/crypto_contracts',
            {},
            (response) => {
                if (response?.data?.length > 0) {
                    return response?.data;
                } else {
                    return [];
                }
            },
            (error) => {
                console.error('GET Error:', error);
                return [];
            },
            { Authorization: 'Bearer ' + user?.access_token }
        );
    };
    const _getEntities = () => {
        API.get(
            '/api/v1/operating_units',
            {},
            (res) => {
                if (res?.data) {
                    setEntities((prev) => {
                        return {
                            ...prev,
                            data: res?.data
                        };
                    });
                }
            },
            (error) => {
                console.error('GET Entities Error:', error);
            },
            { Authorization: 'Bearer ' + user?.access_token }
        );
    };
    const getTokensAsync = async () => {
        const tokens = await _getTokens();
        setTokens(tokens);
    };

    const _createDeposit = () => {
        setLoading(true);
        const payload: DepositPayload = {};
        if (depositRequestId) {
            payload.deposit_request_id = depositRequestId;
        }
        if (clients.selected?.name) {
            payload.client_name = clients.selected?.name;
        }
        if (clients.selected?.id) {
            payload.client_id = clients.selected?.id;
        }
        if (clients.selected?.trading_number) {
            payload.trading_number = clients.selected?.trading_number;
        }
        if (entities?.selected?.id) {
            payload.ticket_operating_unit_id = entities?.selected?.id;
        }
        if (tokenSelected) {
            payload.crypto_contract_name = tokenSelected?.key;
        }

        if (parseFloat(amount) > 0) {
            payload.amount = amount;
        }
        API.post(
            '/api/v1/deposit_request_invoice/create',
            payload,
            (data) => {
                if (data?.data?.url) {
                    _openIframe(data?.data?.url);
                    setLoading(false);
                }
            },
            (e) => {
                setLoading(false);
            },
            { Authorization: 'Bearer ' + user?.access_token }
        );
    };
    useEffect(() => {
        getTokensAsync();
        _getEntities();
    }, []);
    return (
        <div className="h-full w-full pt-0 grid grid-cols-1 grid-flow-row auto-rows-max justify-between content-between ">
            <div className="absolute cursor-pointer right-[10px] bg-white z-[9] md:right-[20px] top-[10px] " onClick={closeModal}>
                <CloseSvg />
            </div>
            <div className="flex w-full flex-grow flex-col items-center mt-4 justify-start">
                <div
                    className={`max-w-[350px] my-[10px] h-[45px] relative bg-[#fafafa] flex flex-row justify-between items-center rounded-[15px] w-full border border-[#DDDDDD]`}
                >
                    <input
                        placeholder={'Deposit Request Id'}
                        className={`w-full flex justify-center items-center text-center text-[#8E8E8E] placeholder:text-[#8E8E8E] bg-[#fafafa] text-[14px] text-nowrap whitespace-nowrap overflow-hidden ${
                            clients?.selected?.name ? 'family-reg' : 'family-light'
                        }`}
                        value={depositRequestId}
                        onChange={(e) => setDepositRequestId(e?.target?.value)}
                    />
                </div>
                <Select
                    disabled={false}
                    className={' w-[350px] h-[40px]'}
                    label={tokenSelected?.symbol || 'Please Select Token'}
                    arrowLogo={<ArrowRoundedSvg />}
                    data={tokens?.length ? tokens : []}
                    selectedItem={tokenSelected}
                    setSelectedItem={(t: any) => handleSelectToken(t)}
                    // changeSelectedItem={changeSelectedItem}
                />
                <AmountInput
                    className=""
                    amount={amount}
                    logo={tokenSelected?.icon_path}
                    disabled={false}
                    placeholder={'0.00'}
                    onChange={(e) => {
                        handleEnterAmount(e);
                    }}
                    autoFocus={!!tokenSelected}
                    unit={tokenSelected?.symbol}
                />
                <SelectUser
                    entities={entities}
                    setEntities={setEntities}
                    clients={clients}
                    setClients={setClients}
                    handleSelectUser={handleSelectUser}
                    disabled={false}
                    token={'token'}
                />
            </div>
            <div className="mt-auto h-full flex flex-col items-center justify-start w-full">
                <div className="relative pt-[10px] flex items-center justify-center w-full">
                    <Button
                        onClick={_createDeposit}
                        disabled={loading}
                        text={loading ? 'Waiting…' : 'Create Deposit Request'}
                        className="bg-[#3066CC]  text-[#FAFAFA] disabled:bg-[#3066cc78] border-[#DDDDDD]"
                    />
                </div>
            </div>
        </div>
    );
};
export default ModalOpenIframe;
