// Import React hooks
import { useState } from 'react';

// Import custom debounce hook
import useDebounce from '../../hooks/useDebounce';

// Debounced search component
export default function DebouncedSearch() {

    // State for immediate input value
    const [searchQuery, setSearchQuery] = useState('');

    // Get debounced version of search query
    const debouncedQuery = useDebounce(searchQuery, 500);

    // Handle input typing
    function handleInputChange(event) {

        // Update immediate input
        setSearchQuery(event.target.value);
    }

    // Derived result
    const searchResult =
        debouncedQuery.trim() === ''
            ? ''
            : `Searching for: ${debouncedQuery}`;

    // Return UI
    return (
        <div className="space-y-4">

            {/* Search input */}
            <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search products..."
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Search result */}
            {searchResult && (
                <p className="text-blue-600 font-medium">
                    {searchResult}
                </p>
            )}

        </div>
    );
}