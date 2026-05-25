import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Button from "../common/Button";
import TodoItem from "./TodoItem";
import TodoFilter from "./TodoFilter";

const STORAGE_KEY = "premium-productivity-tasks";

const PRIORITIES = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

const CATEGORIES = [
  "Work",
  "Study",
  "Personal",
  "Health",
  "Finance",
  "Creative",
];

const QUICK_TEMPLATES = [
  "Complete frontend module",
  "Review API integration",
  "Workout session",
  "Read 20 pages",
  "Plan tomorrow goals",
];

function isOverdue(todo) {
  if (!todo.dueDate || todo.completed) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return new Date(todo.dueDate) < today;
}

function isDueToday(todo) {
  if (!todo.dueDate || todo.completed) return false;

  const today = new Date().toISOString().split("T")[0];
  return todo.dueDate === today;
}

function getProductivityMessage(score) {
  if (score >= 90) return "Elite productivity momentum 🔥";
  if (score >= 70) return "Excellent progress today ⚡";
  if (score >= 50) return "Strong consistency building 🌱";
  if (score >= 30) return "Momentum forming — keep pushing 🚀";
  return "Start with one focused task today ✨";
}

export default function TodoList() {
  const [taskInput, setTaskInput] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("Work");
  const [dueDate, setDueDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filter, setFilter] = useState("all");
  const [todos, setTodos] = useState(() => {
  
  try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function handleAddTask(templateText = null) {
    const text = templateText || taskInput;

    if (!text.trim()) {
      toast.warning("Please enter a task");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      priority,
      category,
      dueDate,
      createdAt: new Date().toISOString(),
    };

    setTodos((prev) => [newTodo, ...prev]);

    setTaskInput("");
    setDueDate("");

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
    setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
    toast.error("Task deleted");
  }

  function handleEditTask(todoId, updatedFields) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId
          ? { ...todo, ...updatedFields }
          : todo
      )
    );

    toast.success("Task updated");
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
    toast.info("Completed tasks cleared");
  }

  function markAllComplete() {
    setTodos((prev) =>
      prev.map((todo) => ({
        ...todo,
        completed: true,
      }))
    );

    toast.success("All tasks completed");
  }

  function resetWorkspace() {
    setTodos([]);
    toast.error("Workspace reset");
  }

  const filteredTodos = useMemo(() => {
    let result = [...todos];

    if (filter === "active") {
      result = result.filter((todo) => !todo.completed);
    }

    if (filter === "completed") {
      result = result.filter((todo) => todo.completed);
    }

    if (filter === "high-priority") {
      result = result.filter(
        (todo) =>
          todo.priority === "high" ||
          todo.priority === "urgent"
      );
    }

    if (searchTerm.trim()) {
      result = result.filter(
        (todo) =>
          todo.text
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          todo.category
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    if (sortBy === "oldest") {
      result.sort(
        (a, b) =>
          new Date(a.createdAt) - new Date(b.createdAt)
      );
    }

    if (sortBy === "alphabetical") {
      result.sort((a, b) => a.text.localeCompare(b.text));
    }

    if (sortBy === "priority") {
      const rank = {
        urgent: 4,
        high: 3,
        medium: 2,
        low: 1,
      };

      result.sort(
        (a, b) => rank[b.priority] - rank[a.priority]
      );
    }

    return result;
  }, [todos, filter, searchTerm, sortBy]);

  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const pending = total - completed;
  const overdue = todos.filter(isOverdue).length;
  const dueToday = todos.filter(isDueToday).length;

  const productivityScore =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  const stats = [
    {
      label: "Total Tasks",
      value: total,
      icon: "📋",
      accent: "text-amber-300 border-amber-400/20",
    },
    {
      label: "Pending",
      value: pending,
      icon: "⚡",
      accent: "text-orange-300 border-orange-400/20",
    },
    {
      label: "Completed",
      value: completed,
      icon: "✅",
      accent: "text-emerald-300 border-emerald-400/20",
    },
    {
      label: "Overdue",
      value: overdue,
      icon: "⏳",
      accent: "text-rose-300 border-rose-400/20",
    },
    {
      label: "Due Today",
      value: dueToday,
      icon: "📅",
      accent: "text-fuchsia-300 border-fuchsia-400/20",
    },
    {
      label: "Productivity",
      value: `${productivityScore}%`,
      icon: "🏆",
      accent: "text-yellow-300 border-yellow-400/20",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`
              rounded-3xl
              border
              ${stat.accent}
              bg-gradient-to-br
              from-zinc-950
              via-neutral-900
              to-stone-950
              p-6
              shadow-2xl
              backdrop-blur-2xl
              hover:scale-[1.03]
              transition-all
              duration-300
            `}
          >
            <div className="text-3xl">{stat.icon}</div>

            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-zinc-400">
              {stat.label}
            </p>

            <p className="mt-3 text-3xl font-black text-white">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Productivity Banner */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-zinc-900 via-neutral-900 to-stone-950 p-6 shadow-2xl backdrop-blur-2xl">
        <h3 className="text-2xl font-black bg-gradient-to-r from-white via-amber-200 to-rose-300 bg-clip-text text-transparent">
          Productivity Command Center
        </h3>

        <p className="mt-3 text-zinc-300">
          {getProductivityMessage(productivityScore)}
        </p>

        <div className="mt-5 h-3 rounded-full bg-black/30 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-400"
            style={{ width: `${productivityScore}%` }}
          />
        </div>
      </div>

      {/* Composer */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-neutral-900 to-stone-950 p-6 shadow-2xl backdrop-blur-2xl space-y-5">
        <div className="grid lg:grid-cols-4 gap-4">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleAddTask()
            }
            placeholder="What needs to be accomplished?"
            className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white placeholder:text-zinc-500 outline-none"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-4 text-white"
          >
            {PRIORITIES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-4 text-white"
          >
            {CATEGORIES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="grid lg:grid-cols-4 gap-4">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-4 text-white"
          />

          <Button
            onClick={() => handleAddTask()}
            className="rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-6 font-bold"
          >
            Add Task
          </Button>

          <Button
            onClick={markAllComplete}
            className="rounded-2xl bg-emerald-500/20 border border-emerald-400/20"
          >
            Complete All
          </Button>

          <Button
            onClick={clearCompleted}
            className="rounded-2xl bg-rose-500/20 border border-rose-400/20"
          >
            Clear Completed
          </Button>
        </div>

        {/* Templates */}
        <div className="flex flex-wrap gap-3">
          {QUICK_TEMPLATES.map((template) => (
            <button
              key={template}
              onClick={() => handleAddTask(template)}
              className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-zinc-200 hover:bg-white/20"
            >
              {template}
            </button>
          ))}
        </div>
      </div>

      {/* Search + Sort */}
      <div className="grid lg:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white placeholder:text-zinc-500"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-4 text-white"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="priority">Priority</option>
        </select>

        <Button
          onClick={resetWorkspace}
          className="rounded-2xl bg-white/10 border border-white/10"
        >
          Reset Workspace
        </Button>
      </div>

      <TodoFilter
        currentFilter={filter}
        onFilterChange={setFilter}
      />

      {/* Tasks */}
      {filteredTodos.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-neutral-900 to-stone-950 p-16 text-center shadow-2xl">
          <div className="text-7xl animate-pulse">🚀</div>

          <h3 className="mt-6 text-3xl font-black bg-gradient-to-r from-white via-amber-200 to-rose-300 bg-clip-text text-transparent">
            Productivity Workspace Ready
          </h3>

          <p className="mt-4 text-zinc-300 text-lg">
            Build unstoppable momentum with focused execution.
          </p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}