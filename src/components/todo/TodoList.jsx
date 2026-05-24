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

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Total",
            value: total,
            icon: "📋",
          },
          {
            label: "Pending",
            value: pending,
            icon: "⚡",
          },
          {
            label: "Done",
            value: completed,
            icon: "✅",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="
              group
              rounded-3xl
              border border-slate-700
              bg-gradient-to-br
              from-slate-950
              via-slate-900
              to-slate-800
              p-5
              shadow-2xl
              shadow-black/40
              hover:scale-105
              hover:border-cyan-400/40
              hover:shadow-cyan-500/10
              transition-all
              duration-300
            "
          >
            <div className="text-2xl">{stat.icon}</div>

            <p className="text-slate-400 text-xs uppercase tracking-[0.25em] mt-4">
              {stat.label}
            </p>

            <p className="text-3xl font-black text-white mt-2">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div
        className="
          rounded-3xl
          border border-slate-700
          bg-gradient-to-br
          from-slate-950
          via-slate-900
          to-slate-800
          p-3
          shadow-2xl
          shadow-black/40
        "
      >
        <div className="flex gap-3">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleAddTask()
            }
            placeholder="What needs to be done?"
            className="
              flex-1
              rounded-2xl
              border border-slate-700
              bg-slate-950
              px-5
              py-4
              text-white
              placeholder:text-slate-500
              outline-none
              focus:border-cyan-400
              focus:ring-2
              focus:ring-cyan-400/20
              transition-all
            "
          />

          <Button
            onClick={handleAddTask}
            className="
              px-8
              rounded-2xl
              bg-gradient-to-r
              from-cyan-300
              via-blue-500
              to-indigo-600
              border
              border-cyan-300/40
              text-white
              font-bold
              shadow-2xl
              shadow-cyan-500/30
              hover:scale-105
              hover:brightness-110
              hover:shadow-cyan-400/40
              transition-all
              duration-300
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
        <div
          className="
            rounded-3xl
            border border-slate-700
            bg-gradient-to-br
            from-slate-950
            via-slate-900
            to-slate-800
            p-14
            text-center
            shadow-2xl
            shadow-black/40
          "
        >
          <div className="text-7xl mb-5 animate-pulse">
            🚀
          </div>

          <h3 className="text-3xl font-black text-white">
            Workspace Ready
          </h3>

          <p className="text-slate-400 mt-3 text-lg">
            Add tasks and build momentum
          </p>
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