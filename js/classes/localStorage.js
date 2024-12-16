export default new class LocalStorage {
    KEY = 'SEBHA_STORAGE_';
    constructor() {
        // Check if localStorage is available
        if (typeof localStorage === 'undefined') {
            throw new Error('localStorage is not supported in this environment');
        }
    }

    // Set an item in localStorage
    setItem(_key, value) {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(this.KEY + _key, serializedValue);
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    }

    // Get an item from localStorage
    getItem(_key) {
        try {
            const item = localStorage.getItem(this.KEY + _key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    }

    // Delete an item from localStorage
    deleteItem(_key) {
        try {
            localStorage.removeItem(this.KEY + _key);
            return true;
        } catch (error) {
            console.error('Error deleting from localStorage:', error);
            return false;
        }
    }

    // Clear all data from localStorage
    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }

    // Check if key exists in localStorage
    hasItem(key) {
        return localStorage.getItem(key) !== null;
    }
}
