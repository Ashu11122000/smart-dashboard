import { useState } from "react";
import Button from "../common/Button";

const priorityStyles = {
  low: "bg-zinc-500/10 text-zinc-300 border-zinc-400/20",
  medium: "bg-amber-500/10 text-amber-300 border-amber-400/20",
  high: "bg-orange-500/10 text-orange-300 border-orange-400/20",
  urgent: "bg-rose-500/10 text-rose-300 border-rose-400/20",
};

const categoryStyles = {
  Work: "bg-emerald-500/10 text-emerald-300 border-emerald-400/20",
  Study: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-400/20",
  Personal: "bg-amber-500/10 text-amber-300 border-amber-400/20",
  Health: "bg-green-500/10 text-green-300 border-green-400/20",
  Finance: "bg-yellow-500/10 text-yellow-300 border-yellow-400/20",
  Creative: "bg-orange-500/10 text-orange-300 border-orange-400/20",
};

function isOverdue(todo) {
  if (!todo.dueDate || todo.completed) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return new Date(todo.dueDate) < today;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function handleSave() {
    if (!editText.trim()) return;

    onEdit(todo.id, {
      text: editText.trim(),
    });

    setIsEditing(false);
  }

  const overdue = isOverdue(todo);

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-gradient-to-br
        from-zinc-950
        via-neutral-900
        to-stone-950
        backdrop-blur-2xl
        p-6
        shadow-2xl
        hover:-translate-y-1
        hover:shadow-2xl
        transition-all
        duration-500
      "
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
        <div className="absolute -top-10 left-0 h-32 w-32 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-rose-500/10 blur-3xl" />
      </div>

      {/* Shine Sweep */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -left-20 top-0 h-full w-14 rotate-12 bg-white/5 blur-md transition-all duration-1000 group-hover:left-full"></div>
      </div>

      <div className="relative flex flex-col gap-5">

        {/* Top */}
        <div className="flex items-start gap-4">
          <label className="cursor-pointer relative mt-1">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="peer sr-only"
            />

            <div
              className={`
                h-10
                w-10
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
                      border-emerald-400/30
                      bg-gradient-to-br
                      from-emerald-500
                      to-green-500
                      scale-110
                      shadow-lg
                      shadow-emerald-500/20
                    `
                    : `
                      border-white/10
                      bg-white/10
                      hover:border-amber-400/30
                    `
                }
              `}
            >
              {todo.completed && (
                <span className="text-white font-bold">
                  ✓
                </span>
              )}
            </div>
          </label>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  value={editText}
                  onChange={(e) =>
                    setEditText(e.target.value)
                  }
                  className="
                    w-full
                    rounded-2xl
                    border border-white/10
                    bg-white/10
                    px-4
                    py-3
                    text-white
                    outline-none
                  "
                />

                <div className="flex gap-3">
                  <Button
                    onClick={handleSave}
                    className="rounded-xl bg-emerald-500/20 border border-emerald-400/20"
                  >
                    Save
                  </Button>

                  <Button
                    onClick={() => setIsEditing(false)}
                    className="rounded-xl bg-white/10 border border-white/10"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap items-center gap-3">
                  <p
                    className={`
                      text-lg
                      font-semibold
                      break-words
                      ${
                        todo.completed
                          ? "line-through text-zinc-500"
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
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-400/20"
                          : "bg-amber-500/10 text-amber-300 border-amber-400/20"
                      }
                    `}
                  >
                    {todo.completed
                      ? "Completed"
                      : "Pending"}
                  </span>

                  {overdue && (
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold border bg-rose-500/10 text-rose-300 border-rose-400/20">
                      Overdue
                    </span>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <span
                    className={`px-3 py-2 rounded-full text-xs font-semibold border ${
                      priorityStyles[todo.priority]
                    }`}
                  >
                    {todo.priority}
                  </span>

                  <span
                    className={`px-3 py-2 rounded-full text-xs font-semibold border ${
                      categoryStyles[todo.category]
                    }`}
                  >
                    {todo.category}
                  </span>

                  {todo.dueDate && (
                    <span className="px-3 py-2 rounded-full text-xs font-semibold border bg-white/10 text-zinc-300 border-white/10">
                      Due: {todo.dueDate}
                    </span>
                  )}
                </div>

                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Created:{" "}
                  {new Date(
                    todo.createdAt
                  ).toLocaleDateString()}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        {!isEditing && (
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => setIsEditing(true)}
              className="
                flex-1
                rounded-2xl
                bg-white/10
                border border-white/10
              "
            >
              Edit
            </Button>

            <Button
              onClick={() => onDelete(todo.id)}
              className="
                flex-1
                rounded-2xl
                bg-gradient-to-r
                from-rose-500
                to-red-600
                text-white
              "
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}