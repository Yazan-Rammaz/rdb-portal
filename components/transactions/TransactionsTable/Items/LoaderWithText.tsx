import { LoadingColorSvg } from '@/components/Svgs';

export const LoaderWithText = ({ text, loading = false }: { text: string; loading?: boolean }) => {
    return (
        <div className="flex flex-col font-[SF-Pro-Rounded-light] text-[11px] text-[#A2A0A0] items-center justify-center gap-1 pt-1">
            <LoadingColorSvg w="20" h="20" loading={loading} />
            {text}
        </div>
    );
};
