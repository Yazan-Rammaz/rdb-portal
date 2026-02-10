/**
 * Safe localStorage utilities with server-side rendering support
 * Checks if window is defined before accessing localStorage
 */

const LocalStorage = {
    /**
     * Get item from localStorage
     * @param key - The key to retrieve
     * @returns The value or null if not found or window is undefined
     */
    getItem: (key: string): string | null => {
        if (typeof window === 'undefined') {
            return null;
        }
        try {
            return localStorage.getItem(key);
        } catch (error) {
            console.error(`Error retrieving from localStorage: ${key}`, error);
            return null;
        }
    },

    /**
     * Set item in localStorage
     * @param key - The key to set
     * @param value - The value to store
     */
    setItem: (key: string, value: string): void => {
        if (typeof window === 'undefined') {
            return;
        }
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            console.error(`Error setting localStorage: ${key}`, error);
        }
    },

    /**
     * Remove item from localStorage
     * @param key - The key to remove
     */
    removeItem: (key: string): void => {
        if (typeof window === 'undefined') {
            return;
        }
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing from localStorage: ${key}`, error);
        }
    },

    /**
     * Clear all items from localStorage
     */
    clear: (): void => {
        if (typeof window === 'undefined') {
            return;
        }
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing localStorage', error);
        }
    },
};

export default LocalStorage;
