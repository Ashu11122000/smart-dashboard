export default function Button({
    children,
    onClick,
    type = 'button',
    className = '',
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`
                bg-blue-600
                text-white
                px-4
                sm:px-5
                py-2
                rounded-lg
                hover:bg-blue-700
                hover:scale-105
                active:scale-95
                transition-all
                duration-200
                font-medium
                shadow-sm
                hover:shadow-md
                ${className}
            `}
        >
            {children}
        </button>
    );
}