// Import reusable Button component
import Button from '../common/Button';

// Reusable TodoItem component
export default function TodoItem({ todo, onToggle, onDelete }) {

    // Return todo item UI
    return (

        // Todo row container
        <div className="flex items-center justify-between bg-gray-50 border rounded-lg p-3">

            {/* Left section */}
            <div className="flex items-center gap-3">

                {/* Checkbox for completion toggle */}
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                />

                {/* Todo task text */}
                <p
                    className={`${
                    todo.completed
                    ? 'line-through text-gray-400'
                    : 'text-gray-800'
                    }`}
                >
                    {todo.text}
                </p>

            </div>

            {/* Delete button */}
            <Button onClick={() => onDelete(todo.id)}>
                Delete
            </Button>

        </div>
    );
}