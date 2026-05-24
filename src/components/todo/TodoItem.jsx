import Button from "../common/Button";

export default function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <div
            className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border border-white/10
                bg-white/8
                backdrop-blur-2xl
                p-5
                shadow-xl
                hover:shadow-2xl
                hover:shadow-cyan-500/10
                hover:-translate-y-1
                transition-all
                duration-300
            "
        >
            {/* Background Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                <div className="absolute -top-10 left-0 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl" />
            </div>

            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                {/* Left */}
                <div className="flex items-center gap-4 flex-1">
                    {/* Premium Checkbox */}
                    <label className="cursor-pointer relative">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => onToggle(todo.id)}
                            className="peer sr-only"
                        />

                        <div
                            className="
                                h-8
                                w-8
                                rounded-2xl
                                border
                                border-cyan-400/40
                                bg-white/10
                                flex
                                items-center
                                justify-center
                                transition-all
                                duration-300
                                peer-checked:bg-gradient-to-br
                                peer-checked:from-cyan-500
                                peer-checked:to-blue-600
                                peer-checked:scale-110
                                peer-checked:shadow-lg
                                peer-checked:shadow-cyan-500/20
                            "
                        >
                            {todo.completed && (
                                <span className="text-white font-bold text-sm">
                                    ✓
                                </span>
                            )}
                        </div>
                    </label>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                            <p
                                className={`
                                    text-base
                                    font-semibold
                                    break-words
                                    transition-all
                                    ${
                                        todo.completed
                                            ? "line-through text-slate-400"
                                            : "text-white"
                                    }
                                `}
                            >
                                {todo.text}
                            </p>

                            <span
                                className={`
                                    px-3
                                    py-1
                                    rounded-full
                                    text-[10px]
                                    uppercase
                                    tracking-wider
                                    font-semibold
                                    ${
                                        todo.completed
                                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/20"
                                            : "bg-amber-500/20 text-amber-300 border border-amber-500/20"
                                    }
                                `}
                            >
                                {todo.completed ? "Completed" : "Pending"}
                            </span>
                        </div>

                        <p className="text-xs text-slate-500 mt-2">
                            Productivity workflow task
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 w-full sm:w-auto">
                    <Button
                        onClick={() => onDelete(todo.id)}
                        className="
                            flex-1
                            sm:flex-none
                            px-5
                            py-3
                            rounded-2xl
                            border
                            border-red-500/20
                            bg-red-500/10
                            text-red-300
                            hover:bg-red-500/20
                            hover:scale-105
                            hover:shadow-lg
                            hover:shadow-red-500/10
                            transition-all
                        "
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}