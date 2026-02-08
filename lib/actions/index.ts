import API from '@/lib/api';


export const isEthereumAddress = (address: string) => {
    return address?.startsWith('0x') && address.length === 42;
};

export const isTronAddress = (address: string) => {
    return address?.startsWith('T') && address.length === 34;
};
export const _getApiKey = async (isAdmin: number, token?: any) => {
    if (token) {
        return await API.get(
            `/api/v1/third_party_keys?third_parties[0]=etherscan&third_parties[1]=tronscan&is_admin=${isAdmin}`,
            {},
            (data: any) => data,
            (e) => {},
            {
                authorization: `Bearer ${token}`
            }
        );
    }
};

export function formatDateAndTime(dateString: string) {
    const inputDate = new Date(dateString) as any;
    const currentDate = new Date() as any;

    const hours = inputDate.getHours().toString().padStart(2, '0');
    const minutes = inputDate.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;

    const timeDiff = currentDate - inputDate;

    const diffInMinutes = Math.floor(timeDiff / (1000 * 60));
    const diffInHours = Math.floor(timeDiff / (1000 * 60 * 60));
    const diffInDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    let timeAgo;
    if (diffInMinutes < 60) {
        timeAgo = `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
        timeAgo = `${diffInHours}h`;
    } else {
        timeAgo = `${diffInDays}d`;
    }

    return `${formattedTime} | ${timeAgo}`;
}
