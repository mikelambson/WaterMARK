import { useEffect, useState } from "react";

/**
 * Debounce hook
 * @param value - Value to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced value
*/

export const useDebounce = <T,>( value:T, delay:number ): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    
    delay = delay || 1000;

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}