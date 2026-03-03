interface ErrorFetchInterFace {
    error: string;
    fetch: () => void;
}

const ErrorFetch = ({ error, fetch }: ErrorFetchInterFace) => {
    return (
        <div className="flex flex-col items-center justify-center gap-3 py-12 px-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 border border-red-100">
                <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            </div>
            <div className="text-center">
                <p className="text-sm font-medium text-gray-700">Failed to load data</p>
                <p className="text-xs text-gray-400 mt-0.5">{error}</p>
            </div>
            <button
                onClick={() => fetch()}
                className="mt-1 px-4 py-1.5 text-sm font-medium bg-[#002486] text-white rounded-md hover:bg-[#001a6e] transition-colors cursor-pointer"
            >
                Retry
            </button>
        </div>
    );
};
export default ErrorFetch;
