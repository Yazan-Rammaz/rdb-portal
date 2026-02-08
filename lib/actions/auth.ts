import { UserInterface } from '@/types';


export const isAuthenticated = (user: UserInterface) => {
    return !!user?.access_token;
};
