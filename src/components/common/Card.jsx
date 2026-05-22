// Reusable Card component receives title and children props
export default function Card({ title, children }) {

    // Return card UI
    return (

        // Card outer container
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">

            {/* Card title */}
            <h3 className="text-xl font-semibold mb-4">
                {title}
            </h3>

            {/* Card content */}
            <div className="text-gray-600">
                {children}
            </div>

        </div>
    );
}