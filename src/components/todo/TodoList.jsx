import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../common/Button";
import TodoItem from "./TodoItem";
import TodoFilter from "./TodoFilter";

export default function TodoList() {
  const [taskInput, setTaskInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  function handleAddTask() {
    if (!taskInput.trim()) {
      toast.warning("Please enter a task");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: taskInput.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos((prev) => [newTodo, ...prev]);
    setTaskInput("");
    toast.success("Task added successfully");
  }

  function handleToggleTask(todoId) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  function handleDeleteTask(todoId) {
    setTodos((prev) =>
      prev.filter((todo) => todo.id !== todoId)
    );

    toast.error("Task deleted");
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const pending = total - completed;

  const stats = [
    {
      label: "Total Tasks",
      value: total,
      icon: "📋",
      accent: "blue",
    },
    {
      label: "Pending",
      value: pending,
      icon: "⚡",
      accent: "amber",
    },
    {
      label: "Completed",
      value: completed,
      icon: "✅",
      accent: "violet",
    },
  ];

  const statColors = {
    blue: "text-blue-400 border-blue-400/10 hover:shadow-blue-500/10",
    amber: "text-amber-400 border-amber-400/10 hover:shadow-amber-500/10",
    violet: "text-violet-400 border-violet-400/10 hover:shadow-violet-500/10",
  };

  return (
    <div className="space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              bg-gradient-to-br
              from-slate-950
              via-blue-950
              to-slate-900
              p-5
              shadow-2xl
              backdrop-blur-2xl
              hover:scale-[1.03]
              transition-all
              duration-500
              ${statColors[stat.accent]}
            `}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
              <div className="absolute -top-10 left-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />
            </div>

            <div className="relative z-10">
              <div className="text-2xl">{stat.icon}</div>

              <p className="text-blue-100/40 text-xs uppercase tracking-[0.25em] mt-4">
                {stat.label}
              </p>

              <p className={`text-3xl font-black mt-2 ${statColors[stat.accent].split(" ")[0]}`}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Task Composer */}
      <div className="relative overflow-hidden rounded-3xl border border-blue-400/10 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-4 shadow-2xl backdrop-blur-2xl">
        <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl"></div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleAddTask()
            }
            placeholder="What needs to be accomplished today?"
            className="
              flex-1
              rounded-2xl
              border border-blue-400/10
              bg-white/5
              px-5
              py-4
              text-white
              placeholder:text-blue-100/35
              outline-none
              backdrop-blur-xl
              transition-all
              focus:border-amber-400/30
              focus:ring-2
              focus:ring-amber-400/20
            "
          />

          <Button
            onClick={handleAddTask}
            className="
              px-8
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              via-violet-600
              to-amber-500
              text-white
              font-bold
              hover:shadow-lg
              hover:shadow-blue-500/20
            "
          >
            Add Task
          </Button>
        </div>
      </div>

      {/* Filter */}
      <TodoFilter
        currentFilter={filter}
        onFilterChange={setFilter}
      />

      {/* Tasks */}
      {filteredTodos.length === 0 ? (
        <div className="relative overflow-hidden rounded-3xl border border-blue-400/10 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-14 text-center shadow-2xl backdrop-blur-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-violet-500/5 to-amber-500/5"></div>

          <div className="relative z-10">
            <div className="text-7xl mb-5 animate-pulse">
              🚀
            </div>

            <h3 className="text-3xl font-black bg-gradient-to-r from-white via-blue-200 to-amber-300 bg-clip-text text-transparent">
              Workspace Ready
            </h3>

            <p className="text-blue-100/50 mt-3 text-lg">
              Add tasks and build unstoppable momentum
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}