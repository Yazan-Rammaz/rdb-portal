import { LoadingColorSvg } from '@/components/Svgs';
import { useEffect, useRef } from 'react';

interface ModalIframeProps {
    _closeIframe: () => void;
    handleIframeLoad?: () => void;
    isLoading?: boolean;
    openIframe?: any;
}

const ModalIframe = ({ openIframe, isLoading, handleIframeLoad, _closeIframe }: ModalIframeProps) => {
    const iframeRef = useRef(null);
    useEffect(() => {
        const handleMessage = (event: any) => {
            if (event.data === 'close-iframe') {
                if (iframeRef.current) {
                    _closeIframe();
                }
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);
    return (
        <div className="relative w-[430px] h-[880px] pt-0 grid grid-cols-1 grid-flow-row auto-rows-max justify-between content-between ">
            <div className="relative flex w-[430px] h-[880px]  flex-grow flex-col items-center justify-start">
                <div className="absolute top-0 right-0 p-2 z-[9999]">
                    <button onClick={_closeIframe} className="text-red-500 text-2xl cursor-pointer px-3">
                        X
                    </button>
                </div>
                {isLoading && (
                    <div className="absolute inset-0 flex items-center w-full h-full overflow-hidden justify-center bg-white bg-opacity-75 z-[999]">
                        <LoadingColorSvg loading={isLoading} />
                    </div>
                )}
                <iframe
                    ref={iframeRef}
                    onLoad={handleIframeLoad}
                    className="w-full transform  origin-top h-[90dvh] overflow-hidden"
                    src={`${openIframe.url}`}
                ></iframe>
            </div>
        </div>
    );
};
export default ModalIframe;
