import ContentLoader from 'react-content-loader';
import { useEffect } from 'react';
import NProgress from 'nprogress';
import { Box, CircularProgress } from '@mui/material';

export function SuspenseLoader() {
    useEffect(() => {
        NProgress.start();

        return () => {
            NProgress.done();
        };
    }, []);

    return (
        <Box
            sx={{
                position: 'fixed',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                zIndex: 999900009
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex={999900009}
        >
            <CircularProgress size={30} disableShrink thickness={2} color='info' />
        </Box>
    );
}
export const TableNameRowLoader = (props: any) => (
    <ContentLoader speed={2} width={235} height={50} viewBox="0 0 235 50" backgroundColor="#f3f3f3" foregroundColor="#ecebeb" {...props}>
        <rect x="40" y="23" rx="0" ry="0" width="90" height="14" />
        <circle cx="16" cy="30" r="15" />
    </ContentLoader>
);
export const TableRowLoader = (props: any) => (
    <ContentLoader speed={2} width={235} height={50} viewBox="0 0 235 50" backgroundColor="#f3f3f3" foregroundColor="#ecebeb" {...props}>
        <rect x="-1" y="19" rx="8" ry="8" width="195" height="20" />
    </ContentLoader>
);
export const CardLoader = (props: any) => (
    <ContentLoader speed={2} width={235} height={50} viewBox="0 0 235 50" backgroundColor="#f3f3f3" foregroundColor="#ecebeb" {...props}>
        <rect x="50" y="14" rx="0" ry="0" width="112" height="18" />
        <circle cx="21" cy="28" r="20" />
        <rect x="50" y="37" rx="0" ry="0" width="32" height="8" />
        <rect x="85" y="37" rx="0" ry="0" width="32" height="8" />
        <rect x="125" y="37" rx="0" ry="0" width="32" height="8" />
    </ContentLoader>
);

export default TableRowLoader;

export const TableRowsLoading = (num: number) => {
    return (
        <div className="flex mt-[30px] h-full flex-col w-full justify-start">
            {Array.from({ length: num }, (_, index) => (
                <div key={index} className="flex w-full justify-between">
                    <TableNameRowLoader />
                    <TableRowLoader />
                    <TableRowLoader />
                    <TableRowLoader />
                </div>
            ))}
        </div>
    );
};
export const CardsLoading = (num: number) => {
    return (
        <div className="flex mt-[20px] space-x-[40px] w-full items-center justify-start">
            {Array.from({ length: num }, (_, index) => (
                <CardLoader key={index} />
            ))}
        </div>
    );
};
