import { ReactNode, useEffect, useRef, useState } from 'react';
import TableHeader from './Header';
import TableBody from './Body';
import { WalletTypes } from '@/types';
import LoaderTable from './LoaderTable';
import ModalOpenIframe from './Items/ModalOpenIframe';
import { Filters } from '@/app/(dashboard)/transactions/page';
import ModalIframe from './Items/ModalIframe';
import { useLayout } from '@/context/LayoutContext';

const dates = [
    { name: 'Today', selected: false, value: 'today' },
    { name: 'Yesterday', selected: false, value: 'yesterday' },
    { name: 'Week', selected: false, value: 'week' },
    { name: 'Month', selected: false, value: 'month' },
    { name: 'Custom', selected: false, value: 'custom' }
];
interface TransactionsTableProps {
    title?: ReactNode;
    children?: ReactNode;
    depositRequestInvoices?: WalletTypes[];
    partners?: any[];
    cryptoContracts?: any[];
    filters?: Filters;
    refreshing?: any;
    loading?: boolean;
    loadFetch: boolean;
    _refresh: (refetch: boolean) => void;
    _filter: (value: any) => void;
}
export const TransactionsTable = ({ loadFetch, filters, cryptoContracts, _filter, _refresh, refreshing, loading, title, children, depositRequestInvoices, partners }: TransactionsTableProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    // const { notify } = useLayout();
    const modalIframeRef = useRef<HTMLDivElement>(null);
    const [openIframe, setOpenIframe] = useState({ isShow: false, url: '' });
    const [openModalDataIframe, setOpenModalDataIframe] = useState(false);
    const [tokenIframe, setTokenIframe] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const _openIframe = (url: string) => {
        setIsLoading(true);
        setOpenIframe({ isShow: true, url: url });
        _refresh(true);
    };
    const _openModalDataIframe = () => {
        setOpenIframe({ isShow: false, url: '' });
        setOpenModalDataIframe(true);
    };
    const _closeModalDataIframe = () => {
        setOpenModalDataIframe(false);
    };
    const _scrollToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };
    const _scrollToElement = (elementId: any) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const _closeIframe = () => {
        setOpenIframe({ isShow: false, url: '' });
        _refresh(true);
    };

    const handleIframeLoad = () => {
        setIsLoading(false);
        // init();
    };
    useEffect(() => {
        if (openIframe.isShow) {
            setTimeout(() => {
                _scrollToElement('target-element');
                setOpenModalDataIframe(false);
            }, 1000);
        }
    }, [openIframe]);
    const handleMessageFromIframe = (event: any) => {
        if (event.origin === 'https://vision-pay-customer.vercel.app') {
            // console.log('Message from iframe:', event?.data);
            setTokenIframe(event?.data?.data);
        }
    };
    useEffect(() => {
        window.addEventListener('message', handleMessageFromIframe);

        return () => {
            window.removeEventListener('message', handleMessageFromIframe);
        };
    }, []);
    useEffect(() => {
        const backdrop = document.querySelector('.backdrop') as HTMLElement;
        if (backdrop) {
            if (loading) {
                backdrop.style.backdropFilter = 'blur(3px) brightness(1)';
                backdrop.style.display = 'block';
            } else {
                backdrop.style.backdropFilter = 'none';
                backdrop.style.display = 'none';
            }
        }
    }, [loading]);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (openModalDataIframe && modalRef.current && !modalRef.current.contains(target)) {
                _closeModalDataIframe();
            }
            if (modalIframeRef && modalIframeRef.current && !modalIframeRef.current.contains(target)) {
                // _closeIframe();
            }
        };

        if (openModalDataIframe) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        if (modalIframeRef) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openModalDataIframe]);
    useEffect(() => {
        const backdrop = document.querySelector('.backdrop') as HTMLElement;
        const main = document.querySelector('main') as HTMLElement;
        if (backdrop) {
            if (openModalDataIframe) {
                backdrop.style.backdropFilter = 'blur(3px) brightness(0.5)';
                backdrop.style.display = 'block';
            }
            if (main) {
                // main.style.overflow = 'hidden';
            }
        }
    }, [openModalDataIframe]);
    useEffect(() => {
        const backdrop = document.querySelector('.backdrop') as HTMLElement;
        const main = document.querySelector('main') as HTMLElement;
        if (backdrop) {
            if (!!openIframe?.isShow) {
                backdrop.style.backdropFilter = 'blur(3px) brightness(0.5)';
                backdrop.style.display = 'block';
            }
            if (main) {
                // main.style.overflow = 'hidden';
            }
        }
        // console.log(openIframe?.isShow, 'openIframe?.isShow');
    }, [openIframe?.isShow]);

    const handleScroll = (e: any) => {
        if ((e?.target?.scrollTop * 100) / (e?.target?.scrollHeight - e?.target?.clientHeight) > 99) {
            _refresh(false)
        }
        if ((e?.target?.scrollTop * 100) / (e?.target?.scrollHeight - e?.target?.clientHeight) < 1) {
            _refresh(false)
        }
    }

    return (
        <div className="h-full flex flex-col items-start justify-start w-[-webkit-fill-available] font-[SF-Pro-Rounded-light] text-[10px] lg:pr-[50px] relative ml-[10px] mr-[10px] overflow-y-scroll" onScroll={(e) => handleScroll(e)} id="#XD-1" style={{ overflow: "scroll" }}>
            {(openModalDataIframe || !!openIframe?.isShow) && <div className="backdrop fixed inset-0 z-[99999] pointer-events-none"></div>}
            <TableHeader
                loadFetch={loadFetch}
                _openIframe={_openIframe}
                refreshing={refreshing}
                _filter={_filter}
                _refresh={_refresh}
                _openModalDataIframe={_openModalDataIframe}
                title={title}
                dates={dates}
            />
            {loading ? (
                <LoaderTable loading={loading} />
            ) : (
                <>
                    <TableBody
                        filters={filters}
                        _filter={_filter}
                        cryptoContracts={cryptoContracts}
                        depositRequestInvoices={depositRequestInvoices}
                        partners={partners}
                        _openIframe={(url: string) => {
                            _openIframe(url);
                        }}
                        _closeIframe={_closeIframe}
                    />
                    {children}
                </>
            )}
            {openModalDataIframe && (
                <div
                    ref={modalRef}
                    className={` ${openModalDataIframe ? 'z-[99999]' : 'z-0'
                        } flex fixed left-1/2 transform -translate-x-1/2 mt-[50px] p-4 min-w-[390px] text-[12px] gap-[10px] text-[#5D5D5D] items-center justify-start w-fit rounded-[10px] h-fit pl-[10px] bg-[#FCFCFC] border border-dashed border-[#006AFF5b]`}
                >
                    <ModalOpenIframe
                        _openIframe={(url: string) => {
                            _openIframe(url);
                        }}
                        closeModal={_closeModalDataIframe}
                    />
                </div>
            )}
            {openIframe.isShow && (
                <div
                    ref={modalIframeRef}
                    className={` ${openIframe?.isShow ? 'z-[99999]' : 'z-0'
                        } flex fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2   text-[12px] gap-[10px] text-[#5D5D5D] items-center justify-start rounded-[10px] h-fit pl-[10px] bg-[#FCFCFC] border border-dashed border-[#006AFF5b]`}
                >
                    <ModalIframe _closeIframe={_closeIframe} handleIframeLoad={handleIframeLoad} isLoading={isLoading} openIframe={openIframe} />{' '}
                </div>
            )}
        </div>
    );
};
