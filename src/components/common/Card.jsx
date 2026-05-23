export default function Card({ title, children }) {
    return (
        <div
            className="
                bg-white
                rounded-2xl
                shadow-md
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-300
                p-4 sm:p-6
                border border-gray-100
            "
        >
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
                {title}
            </h3>

            <div className="text-gray-600">
                {children}
            </div>
        </div>
    );
}