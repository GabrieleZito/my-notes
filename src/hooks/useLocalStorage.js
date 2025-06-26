import { useState } from "react";

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const setStoredValue = (value) => {
        setValue(value);
        localStorage.setItem(key, JSON.stringify(value));
    };

    return [value, setStoredValue];
}
