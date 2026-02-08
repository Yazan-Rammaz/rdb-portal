import { SunSvg, BrokerFilterSvg as BrokerCardSvg, UserFilterSvg as UserCardSvg } from '@/components/Svgs';
import { Filters } from '@/app/(dashboard)/transactions/page';
import { _getTokenLogoByid } from '@/lib/actions/utils';



const BrokerCard = ({ data, filters, _filter }: { data: any; _filter: (value: any) => void; filters?: Filters }) => {
    const _filterByUser = (id: any) => {
        if (id) {
            _filter({ user_ids: [id] });
        }
    };
    const _filterdById = (id: any) => {
        if (filters?.user_ids) {
            return filters?.user_ids?.includes(id);
        }
    };
    return (
        <div
            onClick={() => _filterByUser(data?.id)}
            className={`${_filterdById(data?.id) ? 'bg-[#c7c5c521] shadow-md' : ''
                } cursor-pointer text-[#5D5D5D] w-[237px] h-[50px] custom-dashed-border px-[10px] grid grid-cols-[70%_30%] border  border-dashed rounded-[10px] py-[5px] `}
        >
            <div className="relative h-full flex items-center justify-start">
                <div>{data?.type === 1 ? <BrokerCardSvg /> : <UserCardSvg />}</div>
                <div className="flex flex-col items-center justify-start ml-[10px]">
                    <div className="flex text-[12px] justify-start w-full">{data?.name}</div>
                    <span className="flex items-start w-full justify-start h-full space-x-1">
                        <span>{data?.orders_count}</span>
                        <SunSvg w="14" color="#7C7C7C" />
                        <span> /</span>
                        <span className="text-[#5D5D5D] font-bold"> $ {data?.balance || 100}</span>
                    </span>
                </div>
            </div>
            <div className="relative py-[4px] flex h-full justify-end gap-x-[5px] items-end">
                {data?.crypto_contracts && Object.keys(data.crypto_contracts).length > 0 ? (
                    Object.entries(data.crypto_contracts).map(([key, value]: [string, any]) => {
                        return <div key={key}>{_getTokenLogoByid({ id: value, h: '10', w: '10' })}</div>;
                    })
                ) : (
                    <div>{_getTokenLogoByid({ id: 7, h: '10', w: '10' })}</div>
                )}
                {/* {data?.crypto_contracts?.length > 0 &&
                    data?.crypto_contracts?.map((token: any, key: number) => {
                        return <div key={key}>{_getTokenLogoByid({ id: token?.id, h: '10', w: '10' })}</div>;
                    })} */}
            </div>
        </div>
    );
};
export default BrokerCard;
