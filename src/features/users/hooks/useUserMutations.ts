'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { blockUser, unblockUser, deleteUser } from '../services';
import { notify } from '@/shared/utils/notify';

export const useUserMutations = () => {
    const queryClient = useQueryClient();
    const invalidateUsers = () => queryClient.invalidateQueries({ queryKey: ['users'] });

    const blockMutation = useMutation({
        mutationFn: blockUser,
        onSuccess: () => {
            notify({ type: 'success', message: 'User blocked successfully.' });
            invalidateUsers();
        },
        onError: (e: Error) => notify({ type: 'error', message: e.message }),
    });

    const unblockMutation = useMutation({
        mutationFn: unblockUser,
        onSuccess: () => {
            notify({ type: 'success', message: 'User unblocked successfully.' });
            invalidateUsers();
        },
        onError: (e: Error) => notify({ type: 'error', message: e.message }),
    });

    const deleteMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            notify({ type: 'success', message: 'User deleted successfully.' });
            invalidateUsers();
        },
        onError: (e: Error) => notify({ type: 'error', message: e.message }),
    });

    return {
        blockUser: blockMutation.mutate,
        unblockUser: unblockMutation.mutate,
        deleteUser: deleteMutation.mutate,
        isBlocking: blockMutation.isPending,
        isUnblocking: unblockMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
};
