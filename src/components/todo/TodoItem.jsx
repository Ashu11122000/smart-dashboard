import Button from "../common/Button";

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border border-blue-400/10
        bg-white/5
        backdrop-blur-2xl
        p-5
        shadow-xl
        hover:shadow-2xl
        hover:shadow-blue-500/10
        hover:-translate-y-1
        transition-all
        duration-500
      "
    >
      {/* Premium Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
        <div className="absolute -top-10 left-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      {/* Shine Sweep */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -left-20 top-0 h-full w-14 rotate-12 bg-white/5 blur-md transition-all duration-1000 group-hover:left-full"></div>
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
              className={`
                h-9
                w-9
                rounded-2xl
                border
                flex
                items-center
                justify-center
                transition-all
                duration-300
                ${
                  todo.completed
                    ? `
                      border-amber-400/30
                      bg-gradient-to-br
                      from-amber-500
                      to-orange-500
                      scale-110
                      shadow-lg
                      shadow-amber-500/20
                    `
                    : `
                      border-blue-400/20
                      bg-white/5
                      hover:border-blue-400/40
                    `
                }
              `}
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
                  border
                  ${
                    todo.completed
                      ? `
                        bg-emerald-500/10
                        text-emerald-300
                        border-emerald-400/20
                      `
                      : `
                        bg-amber-500/10
                        text-amber-300
                        border-amber-400/20
                      `
                  }
                `}
              >
                {todo.completed ? "Completed" : "Pending"}
              </span>
            </div>

            <p className="text-xs text-blue-100/40 mt-2 uppercase tracking-[0.15em]">
              Productivity Workflow Task
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
              bg-gradient-to-r
              from-rose-500
              to-red-600
              text-white
              hover:shadow-lg
              hover:shadow-rose-500/20
            "
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}