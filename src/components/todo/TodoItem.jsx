import Button from '../common/Button';

export default function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <div
            className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-3
                bg-gray-50
                border
                rounded-xl
                p-4
                hover:shadow-md
                transition
            "
        >
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    className="w-5 h-5"
                />

                <p
                    className={`break-words ${
                        todo.completed
                            ? 'line-through text-gray-400'
                            : 'text-gray-800'
                    }`}
                >
                    {todo.text}
                </p>
            </div>

            <Button
                onClick={() => onDelete(todo.id)}
                className="bg-red-500 hover:bg-red-600 w-full sm:w-auto"
            >
                Delete
            </Button>
        </div>
    );
}