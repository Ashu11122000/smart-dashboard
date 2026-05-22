export default function Button({ children, onClick, className }) {
    return (
        <button
            onClick={onClick}
            className={`text-white px-4 py-2 rounded-lg ${className}`}
        >
            {children}
        </button>
    );
}