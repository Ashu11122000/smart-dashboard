// Import useEffect hook
import { useEffect, useState } from 'react';

// Custom debounce hook
export default function useDebounce(value, delay) {

    // State for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);

    // Effect runs when value or delay changes
    useEffect(() => {

        // Start timer
        const timerId = setTimeout(() => {

            // Update debounced value after delay
            setDebouncedValue(value);

        }, delay);

        // Cleanup function
        return () => {

            // Cancel previous timer
            clearTimeout(timerId);

        };

    }, [value, delay]);

    // Return debounced value
    return debouncedValue;
}