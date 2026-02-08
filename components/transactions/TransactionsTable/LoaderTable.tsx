import { CardsLoading, TableRowsLoading } from '@/components/ui/Loaders';

const LoaderTable = ({ loading = false }: { loading: boolean }) => {
    return loading ? (
        <>
            <>{CardsLoading(3)}</> <>{TableRowsLoading(10)}</>
        </>
    ) : null;
};
export default LoaderTable;
