// Import React icons for dashboard logo
import { FaTachometerAlt } from 'react-icons/fa';

// Navbar component
export default function Navbar() {
    return (
        <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">

                {/* Left side logo */}
                <div className="flex items-center gap-3">
                    <FaTachometerAlt
                        size={26}
                        className="hover:rotate-12 transition-transform duration-300"
                    />

                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide">
                        Smart Dashboard
                    </h2>
                </div>

                {/* Right side text */}
                <p className="text-xs sm:text-sm text-blue-100 text-center">
                    React Learning Project
                </p>

            </div>
        </nav>
    );
}