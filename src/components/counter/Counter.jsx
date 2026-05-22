// Import useState hook from React for managing state
import { useState } from 'react';

// Import reusable Button component
import Button from '../common/Button';

// Counter component
export default function Counter() {

    // Create state variable 'count' with initial value 0
    const [count, setCount] = useState(0);

    // Function to increase counter by 1
    function incrementHandler() {

        // Update count with previous value + 1
        setCount((prevCount) => prevCount + 1);
    }

    // Function to decrease counter by 1
    function decrementHandler() {

        // Update count with previous value - 1
        setCount((prevCount) => prevCount - 1);
    }

    // Function to reset counter back to 0
    function resetHandler() {

        // Set counter directly to 0
        setCount(0);
    }

    // Return UI
    return (

        // Wrapper container with vertical spacing
        <div className="space-y-4">

            {/* Counter value display */}
            <p className="text-lg font-medium">
                Current Count: {count}
            </p>

            {/* Buttons container */}
            <div className="flex flex-wrap gap-3">

            {/* Increment button */}
            <Button onClick={incrementHandler}>
                + Increment
            </Button>

            {/* Decrement button */}
            <Button onClick={decrementHandler}>
                - Decrement
            </Button>

            {/* Reset button */}
            <Button onClick={resetHandler}>
                Reset
            </Button>

        </div>
    </div>
    );
}