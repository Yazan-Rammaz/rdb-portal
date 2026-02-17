interface ErrorFetchInterFace {
    error: string;
    fetch: () => void;
}

const ErrorFetch = ({ error, fetch }: ErrorFetchInterFace) => {
    return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">Error: {error}</p>
            <button
                onClick={() => fetch()}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
                Retry
            </button>
        </div>
    );
};
export default ErrorFetch;
