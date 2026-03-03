export type ToastType = 'success' | 'error' | 'info';

export interface NotifyOptions {
    type?: ToastType;
    message: string;
    timeout?: number;
}

export interface ToastItem {
    id: string;
    type: ToastType;
    message: string;
    timeout: number;
}

type ToastHandler = (item: ToastItem) => void;

let _handler: ToastHandler | null = null;

/** Called by ToastProvider to register/unregister itself */
export const _registerToastHandler = (fn: ToastHandler | null): void => {
    _handler = fn;
};

/**
 * Show a notification from anywhere — components, hooks, services, or api-client.
 * Requires ToastProvider to be mounted in the component tree.
 */
export const notify = ({ type = 'info', message, timeout = 3000 }: NotifyOptions): void => {
    if (!_handler) {
        console.error(`[notify] No ToastProvider mounted. Message: ${message}`);
        return;
    }
    _handler({
        id: crypto.randomUUID(),
        type,
        message,
        timeout,
    });
};
