/**
 * Safe localStorage utilities with server-side rendering support.
 * Checks if window is defined before accessing localStorage.
 */

const LocalStorage = {
    getItem: (key: string): string | null => {
        if (typeof window === 'undefined') return null;
        try {
            return localStorage.getItem(key);
        } catch (error) {
            console.error('[LocalStorage] getItem failed', { key, error });
            return null;
        }
    },

    setItem: (key: string, value: string): void => {
        if (typeof window === 'undefined') return;
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            console.error('[LocalStorage] setItem failed', { key, error });
        }
    },

    removeItem: (key: string): void => {
        if (typeof window === 'undefined') return;
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('[LocalStorage] removeItem failed', { key, error });
        }
    },

    clear: (): void => {
        if (typeof window === 'undefined') return;
        try {
            localStorage.clear();
        } catch (error) {
            console.error('[LocalStorage] clear failed', { error });
        }
    },

    hasKey: (key: string): boolean => {
        if (typeof window === 'undefined') return false;
        return localStorage.getItem(key) !== null;
    },
};

export default LocalStorage;
