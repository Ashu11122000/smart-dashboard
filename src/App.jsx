import Navbar from "./components/layout/Navbar";
import Card from "./components/common/Card";

import Counter from "./components/counter/Counter";
import UserForm from "./components/form/UserForm";
import TodoList from "./components/todo/TodoList";
import DebouncedSearch from "./components/search/DebounceSearch";
import Calculator from "./components/calculator/Calculator";
import Weather from "./components/weather/Weather";
import NoteApp from "./components/notes/NoteApp";

import {
  CalculatorIcon,
  CloudIcon,
  ClipboardDocumentListIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  UserCircleIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const modules = [
    {
      title: "Counter Analytics",
      description: "Interactive counter with smart state updates.",
      icon: <ChartBarIcon className="w-6 h-6" />,
      component: <Counter />,
    },
    {
      title: "User Management",
      description: "Premium user form interactions.",
      icon: <UserCircleIcon className="w-6 h-6" />,
      component: <UserForm />,
    },
    {
      title: "Task Management",
      description: "Organize todos efficiently.",
      icon: <ClipboardDocumentListIcon className="w-6 h-6" />,
      component: <TodoList />,
    },
    {
      title: "AI Search",
      description: "Fast debounced search experience.",
      icon: <MagnifyingGlassIcon className="w-6 h-6" />,
      component: <DebouncedSearch />,
    },
    {
      title: "Smart Calculator",
      description: "Elegant calculation experience.",
      icon: <CalculatorIcon className="w-6 h-6" />,
      component: <Calculator />,
    },
    {
      title: "Weather Intelligence",
      description: "Real-time climate insights.",
      icon: <CloudIcon className="w-6 h-6" />,
      component: <Weather />,
    },
    {
      title: "Notes Workspace",
      description: "Modern note productivity system.",
      icon: <PencilSquareIcon className="w-6 h-6" />,
      component: <NoteApp />,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero Section */}
        <section className="mb-14">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12 shadow-2xl">
            <div className="max-w-3xl">
              <p className="inline-block px-4 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-medium mb-5">
                Premium Productivity Dashboard
              </p>

              <h1 className="text-4xl md:text-6xl font-black leading-tight bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
                Smart Dashboard Experience
              </h1>

              <p className="mt-5 text-slate-300 text-lg leading-relaxed">
                A beautifully crafted modern dashboard featuring productivity,
                utilities, search intelligence, weather insights, and note
                management.
              </p>
            </div>
          </div>
        </section>

        {/* Dashboard Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <div
                key={index}
                className="group transition-all duration-500 hover:-translate-y-3"
              >
                <Card title="">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 shadow-lg">
                      {module.icon}
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-white">
                        {module.title}
                      </h2>
                      <p className="text-sm text-slate-400">
                        {module.description}
                      </p>
                    </div>
                  </div>

                  {module.component}
                </Card>
              </div>
            ))}
          </div>
        </section>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        toastClassName="!rounded-2xl !backdrop-blur-xl !bg-slate-900/90"
      />
    </div>
  );
}