// Loader component for showing loading state
export default function Loader() {

    // Return loading spinner
    return (

        // Center container
        <div className="flex justify-center items-center py-8">

            {/* Animated spinner */}
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        </div>
    );
}