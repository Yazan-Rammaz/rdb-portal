import { SunSvg } from '@/components/Svgs';
import { Filters } from '@/app/(dashboard)/transactions/page';

import { _getTokenLogoByid } from '@/lib/actions/utils';



const TokenCard = ({ _filter, data, filters }: { data: any; _filter: (value: any) => void; filters?: Filters }) => {
    const _filterByToken = (id: any) => {
        if (id) {
            _filter({ crypto_contract_ids: [id] });
        }
    };
    const _filterdById = (id: any) => {
        if (filters?.crypto_contract_ids) {
            return filters?.crypto_contract_ids?.includes(id);
        }
    };
    return (
        <div
            onClick={() => _filterByToken(data?.id)}
            className={`${_filterdById(data?.id) ? 'bg-[#c7c5c521] shadow-md' : ''
                }  cursor-pointer text-[#5D5D5D] w-[237px] h-[50px] custom-dashed-border py-[10px] px-[10px]`}
        >
            <div className="flex items-center justify-start h-full w-full">
                {/* <div>{_getTokenLogoByid({ id: data.id, h: '20', w: '20' })}</div> */}
                <div>{data?.icon_path && <img src={process.env.NEXT_PUBLIC_IMAGE_BASE_URL + data?.icon_path} />}</div>
                <div className="flex flex-col gap-[1px]  items-center justify-start ml-[10px]">
                    <div className="flex text-[12px] text-[#2C2A2A] justify-start w-full gap-1">
                        <p> {data?.symbol},</p>
                        <p>{data?.name}</p>
                    </div>
                    <span className="flex w-full font-[SF-Pro-Rounded-light] text-[#5D5D5D] gap-x-[3px] items-center justify-start">
                        <span className="flex gap-x-[1px] items-center pr-[2px] font-medium justify-center">
                            <SunSvg h="10" w="10" /> {data?.depositRequestInvoices ?? 0}
                        </span>{' '}
                        <span className="flex gap-x-[3px] font-[SF-Pro-Rounded-light] text-[10px] text-[#5D5D5D] items-center justify-center">
                            {_getTokenLogoByid({ id: data.id, h: '12', w: '12' })}
                            {data?.balance ?? 100}
                        </span>{' '}
                        <span className="font-[SF-Pro-Rounded-light] text-[#5D5D5D]">/</span>{' '}
                        <span className="text-[#5D5D5D] font-[SF-Pro-Rounded-light] line-clamp-6 truncate">$ {data?.balanceUsdt ?? 101}</span>
                    </span>
                </div>
            </div>
        </div>
    );
};
export default TokenCard;
