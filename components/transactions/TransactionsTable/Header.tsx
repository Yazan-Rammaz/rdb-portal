import { useLayout } from '@/context/LayoutContext';
import { SearchSvg, RefreshSvg, LineSvg, PlusSvg } from '@/components/Svgs';
import { UserRole } from '@/types/enum';
import API from '@/lib/api';
import { KeyboardEvent, ReactNode, useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface TableHeaderProps {
    title2?: string;
    refreshing?: any;
    loadFetch: boolean;
    title?: ReactNode;
    dates: any[];
    _openModalDataIframe: () => void;
    _openIframe: (value: string) => void;
    _filter: (value: any) => void;
    _refresh: (refetch: boolean) => void;
}
const TableHeader = ({ _openIframe, loadFetch, refreshing, _filter, _refresh, title2, title, dates, _openModalDataIframe }: TableHeaderProps) => {
    const { user, isMobile } = useLayout();
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [searchText, setSearchText] = useState<string>('');
    const [datesFilter, setDatesFilter] = useState<any[]>(dates);
    const [customDate, setCustomDate] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearchIconClick = () => {
        if (isInputVisible) {
            _filter({ search: searchText });
        } else {
            setIsInputVisible(true);
        }
    };
    const handleClearClick = () => {
        setSearchText('');
        _filter({ search: '' });
    };

    const handleClickOutside = (event: any) => {
        const target = event.target as Node;
        if (inputRef.current && !inputRef.current.contains(target)) {
            setIsInputVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            _filter({ search: searchText });
        }
    };

    const handleFilterDate = (selectedItem: any) => {
        const value = selectedItem?.value;
        let startDate = '';
        let endDate = '';
        setDatesFilter((prev) => {
            return prev.map((item) => {
                if (item.value === value) {
                    return { ...item, selected: !item.selected };
                } else {
                    return { ...item, selected: false };
                }
            });
        });
        const today = new Date();

        switch (value) {
            case 'today':
                startDate = today.toISOString().split('T')[0];
                endDate = startDate;
                break;
            case 'yesterday':
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);
                startDate = yesterday.toISOString().split('T')[0];
                endDate = startDate;
                break;
            case 'week':
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - today.getDay());
                startDate = weekStart.toISOString().split('T')[0];
                endDate = today.toISOString().split('T')[0];
                break;
            case 'month':
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                startDate = monthStart.toISOString().split('T')[0];
                endDate = today.toISOString().split('T')[0];
                break;
            case 'custom':
                setShowCustomDatePicker(true);
                return;
            default:
                break;
        }

        _filter({ from_date: startDate, to_date: endDate });
    };
    const handleDateChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setCustomDate((prev) => {
            return {
                ...prev,
                start: start
            };
        });
        setCustomDate((prev) => {
            return {
                ...prev,
                end: end
            };
        });

        if (start && !end) {
            _filter({ from_date: start.toISOString().split('T')[0], to_date: start.toISOString().split('T')[0] });
        }
    };
    const dayClassName = (date: Date) => {
        if (customDate.start && customDate.end && date >= customDate.start && date <= customDate.end) {
            return 'range-between';
        } else if (date.getTime() === customDate.start?.getTime()) {
            return 'start-date';
        } else if (date.getTime() === customDate.end?.getTime()) {
            return 'end-date';
        }
        return '';
    };
    const applyCustomDate = () => {
        if (customDate.start && customDate.end) {
            _filter({
                from_date: customDate.start.toISOString().split('T')[0],
                to_date: customDate.end.toISOString().split('T')[0]
            });
            setShowCustomDatePicker(false);
        } else if (customDate.start) {
            _filter({
                from_date: customDate.start.toISOString().split('T')[0],
                to_date: customDate.start.toISOString().split('T')[0]
            });
            setShowCustomDatePicker(false);
        }
    };
    const _openDirectModalIframe = () => {
        API.post(
            '/api/v1/deposit_request_invoice/create',
            {},
            (data) => {
                if (data?.data?.url) {
                    _openIframe(data?.data?.url);
                }
            },
            (e) => { },
            { Authorization: user?.authorization_token }
        );
    };
    const handlePlusClick = () => {
        if (process.env.NEXT_PUBLIC_IS_STAGING === 'false') {
            _openDirectModalIframe();
        } else {
            _openModalDataIframe();
        }
    };
    return (
        <>
            <div className="flex items-center flex-wrap justify-between w-full relative mt-[13px] gap-[10px]">
                <div className={isMobile ? "flex items-center text-[12px] md:text-[14px] pl-[15px] pr-[15px] [&>span]:text-[16px] [&>span]:font-[SF-Pro-Rounded-light] h-[40px] justify-between bg-[#F7F7F7] rounded-[15px] w-full" :
                    "flex items-center text-[12px] md:text-[14px] space-x-[10px] justify-center"}>
                    {title}
                    <div></div>
                </div>
                <div className={`flex items-center justify-center ${isMobile ? "w-full" : "w-fit"}`}>
                    <div ref={inputRef} className="relative cursor-pointer lg:w-[200px] flex justify-end items-center mr-[20px]">
                        <div className="cursor-pointer flex items-center justify-end" onClick={handleSearchIconClick}>
                            {refreshing?.search ? (
                                <div
                                    className="ms-auto inline-block h-[15px] w-[15px] animate-spin rounded-full border-[#404040] border-1 border border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                                    role="status"
                                ></div>
                            ) : (
                                <SearchSvg />
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="relative flex items-center flex-wrap justify-center space-x-[5px]">
                            <div className="flex items-center justify-start gap-[8px]">
                                {datesFilter.map((one, key) => {
                                    return (
                                        <div
                                            onClick={() => handleFilterDate(one)}
                                            className={`w-auto px-[10px] text-center h-[24px] cursor-pointer hover:scale-[0.98] transition-all duration-150 place-content-center border border-dashed rounded-[20px] text-[#404040] border-[#70707065] ${one.selected ? 'bg-[#E3FDED]' : ' bg-transparent'
                                                }`}
                                            key={key}
                                        >
                                            {one.name}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="absolute top-[30px] right-1 z-[99]">
                                {showCustomDatePicker && (
                                    <div className="custom-date-picker">
                                        <DatePicker
                                            selected={customDate.start}
                                            onChange={handleDateChange}
                                            startDate={customDate.start || undefined}
                                            endDate={customDate.end || undefined}
                                            selectsRange
                                            inline
                                            dayClassName={dayClassName}
                                        />
                                        <div className="flex items-center justify-end w-full">
                                            <button
                                                className={`w-auto px-[10px] text-center h-[24px] cursor-pointer hover:scale-[0.98] transition-all duration-150 place-content-center border rounded-[20px] text-[#404040] border-[#E3FDED] bg-[#E3FDED]`}
                                                onClick={applyCustomDate}
                                            >
                                                Apply
                                            </button>
                                            <button
                                                className={`w-auto px-[10px] text-center h-[24px] cursor-pointer hover:scale-[0.98] transition-all duration-150 place-content-center border rounded-[20px] text-[#404040] border-[#fde3ec] bg-[#fde3ec]`}
                                                onClick={() => setShowCustomDatePicker(false)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end space-x-[15px] pr-[20px] relative w-full md:w-fit right-0">
                    {!isMobile && <div onClick={() => _refresh(true)} className={loadFetch ? 'cursor-not-allowed' : 'cursor-pointer'}>
                        <RefreshSvg />
                    </div>}
                    {user?.user?.type === UserRole.BusinessPartner && (
                        <div className="cursor-pointer">
                            <LineSvg />
                        </div>
                    )}
                    {user?.user?.type === UserRole.BusinessPartner && (
                        <div onClick={handlePlusClick} className="cursor-pointer">
                            <PlusSvg />
                        </div>
                    )}
                </div>
                {isInputVisible && (
                    <div className="relative rounded-[10px] border border-[#ddddddc5] p-[4px] text-[#404040] w-full flex items-center">
                        <input
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            type="text"
                            className="pl-[10px] pr-[25px] w-full"
                            placeholder="Search..."
                            autoFocus
                        />
                        {searchText && (
                            <button
                                onClick={handleClearClick}
                                className="absolute rounded-full border boorder-[#ddddddc5] px-[4px] right-[5px] text-[#404040]"
                            >
                                &#10005;
                            </button>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default TableHeader;
