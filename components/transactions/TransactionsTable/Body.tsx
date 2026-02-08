import BrokerCard from './Items/BrokerCard';
import { TokensEnum, UserRole } from '@/types/enum';
import TokenCard from './Items/TokenCard';
import {
    BuildFilterSvg,
    CardFilterSvg,
    CircleFilterSvg,
    LinkFilterSvg,
    LocationSvg,
    OneFilterSvg,
    TransactionFilterSvg,
    UserFilterSvg,
    UsersFilterSvg,
    WalletFilterSvg
} from '@/components/Svgs'; // Changed to '@/components/Svgs' as the other path doesn't exist
import TransactionRow from './Items/TransactionRow';
import { useLayout } from '@/context/LayoutContext';
import { Filters } from '@/app/(dashboard)/transactions/page';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState } from 'react';

import { testDri } from '@/lib/data';


const cards = [
    {
        id: 1,
        name: 'B2B Broker',
        depositRequestInvoices: 10,
        balance: '101,000',
        tokens: [{ id: TokensEnum.usdt_eth }, { id: TokensEnum.usdt_tron }],
        isBroker: true
    },
    {
        id: 2,
        name: 'VCG ERBIl',
        depositRequestInvoices: 10,
        balance: '101,000',
        tokens: [{ id: TokensEnum.usdt_eth }, { id: TokensEnum.usdt_tron }, { id: TokensEnum.btc }, { id: TokensEnum.eth }],
        isBroker: false
    }
];
const tokens = [
    { name: 'TRC20, USDT, TRON', id: TokensEnum.usdt_tron, depositRequestInvoices: 0, balance: '101,000', balanceUsdt: '100,000' },
    { name: 'ERC20, USDT, Ethereum', id: TokensEnum.usdt_eth, depositRequestInvoices: 11, balance: '101,000', balanceUsdt: '100,000' },
    { name: 'ETH, Ethereum', id: TokensEnum.eth, depositRequestInvoices: 10, balance: '101,000', balanceUsdt: '100,000' },
    { name: 'BTC, Bitcoin', id: TokensEnum.btc, depositRequestInvoices: 5, balance: '101,000', balanceUsdt: '100,000' }
];

const cols = [
    <OneFilterSvg />,
    <LocationSvg />,
    <UsersFilterSvg />,
    <UserFilterSvg />,
    <BuildFilterSvg />,
    <TransactionFilterSvg />,
    <CardFilterSvg />,
    <CircleFilterSvg />,
    <WalletFilterSvg color={'#28B91C'} />,
    <WalletFilterSvg color={'#487CE0'} />,
    <LinkFilterSvg />
];

interface TableBodyProps {
    _openIframe: (value: string) => void;
    _filter: (value: any) => void;
    filters?: Filters;
    _closeIframe?: () => void;
    cryptoContracts?: any[];
    depositRequestInvoices?: any[];
    partners?: any[];
}
const TableBody = ({ _filter, cryptoContracts, filters, _openIframe, _closeIframe, depositRequestInvoices = [], partners = [] }: TableBodyProps) => {
    const { user, isMobile } = useLayout();
    const [testStep, setTestStep] = useState(1);
    const [testData, setTestData] = useState(testDri);
    return (
        <div className="flex w-full flex-col items-start justify-between mt-[10px] gap-[10px]">
            <div className="max-w-full">
                <Swiper spaceBetween={'10px'} slidesPerView={'auto'}>
                    {user?.user?.type === UserRole.Admin &&
                        partners.map((card: any, key:any) => {
                            return (
                                <SwiperSlide className="!w-[237px] !p-2" key={key}>
                                    <BrokerCard filters={filters} _filter={_filter} data={card} />
                                </SwiperSlide>
                            );
                        })}
                </Swiper>
            </div>
            <div className="max-w-full">
                <Swiper spaceBetween={'10px'} slidesPerView={'auto'}>
                    {cryptoContracts?.map((token, key) => {
                        return (
                            <SwiperSlide className="!w-[237px] !p-2" key={key}>
                                <TokenCard filters={filters} _filter={_filter} data={token} />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
            {isMobile ? <></> : <div className="flex w-full h-[30px] rounded-[15px] bg-[#F7F7F7] px-[20px] py-[5px] items-center justify-between">
                {cols.map((col: any, key: number) => {
                    return <div key={key}>{col}</div>;
                })}
            </div>}
            <div className=" w-full flex flex-col gap-y-[10px]">
                {/* {depositRequestInvoices && depositRequestInvoices?.length > 0 && (
                    <DataTable
                        cols={[]}
                        data={depositRequestInvoices}
                        rowElement={<TransactionRow _openIframe={_openIframe} _closeIframe={_closeIframe} />}
                    />
                )} */}
                {depositRequestInvoices &&
                    depositRequestInvoices?.length > 0 &&
                    depositRequestInvoices.map((depositRequestInvoice : any, i:any) => {
                        return (
                            <TransactionRow
                                _openIframe={_openIframe}
                                filters={filters}
                                cryptoContracts={cryptoContracts}
                                key={i}
                                data={depositRequestInvoice}
                            />
                        );
                    })}
                {/* <DRIStepRender
                    _openIframeByToken={() => {}}
                    onDoubleClick={() => {}}
                    onClick={() => {}}
                    setCurrentStep={() =>
                        setTestStep((prev: any) => {
                            return prev + 1;
                        })
                    }
                    depositRequestInvoice={testData}
                    // step={_calcDRIStep(testData)}
                    step={testStep}
                />

                <input className="p-2 border" placeholder="step" onChange={(e: any) => setTestStep(Number(e.target.value))} />
                <input
                    className="p-2 border"
                    placeholder="status"
                    onChange={(e: any) =>
                        setTestData((prev: any) => {
                            return { ...prev, status: Number(e.target.value) };
                        })
                    }
                /> */}
            </div>
        </div>
    );
};
export default TableBody;
