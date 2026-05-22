// Import React icons for dashboard logo
import { FaTachometerAlt } from 'react-icons/fa';

// Navbar component
export default function Navbar() {

    // Return navbar UI
    return (

        // Navigation bar container
        <nav className="bg-blue-600 text-white shadow-md">

        {/* Inner wrapper */}
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

            {/* Left side logo section */}
            <div className="flex items-center gap-3">

                {/* Dashboard icon */}
                <FaTachometerAlt size={24} />

                {/* Dashboard name */}
                <h2 className="text-xl font-bold">
                    Smart Dashboard
                </h2>

            </div>

            {/* Right side navigation text */}
            <p className="text-sm">
                React Learning Project
            </p>

        </div>
    </nav>
    );
}