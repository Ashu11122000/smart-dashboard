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
      description: "Interactive counter with intelligent state management.",
      badge: "Analytics",
      icon: <ChartBarIcon className="w-5 h-5" />,
      component: <Counter />,
    },
    {
      title: "User Management",
      description: "Premium user onboarding and interaction workflows.",
      badge: "Users",
      icon: <UserCircleIcon className="w-5 h-5" />,
      component: <UserForm />,
    },
    {
      title: "Task Management",
      description: "Organize tasks with ultra-premium productivity flow.",
      badge: "Productivity",
      icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
      component: <TodoList />,
    },
    {
      title: "AI Search",
      description: "Fast intelligent search with premium UX interactions.",
      badge: "Search",
      icon: <MagnifyingGlassIcon className="w-5 h-5" />,
      component: <DebouncedSearch />,
    },
    {
      title: "Smart Calculator",
      description: "Elegant calculations with modern premium design.",
      badge: "Utility",
      icon: <CalculatorIcon className="w-5 h-5" />,
      component: <Calculator />,
    },
    {
      title: "Weather Intelligence",
      description: "Real-time atmospheric insights with immersive visuals.",
      badge: "Weather",
      icon: <CloudIcon className="w-5 h-5" />,
      component: <Weather />,
    },
    {
      title: "Notes Workspace",
      description: "Capture ideas in a beautifully crafted workspace.",
      badge: "Notes",
      icon: <PencilSquareIcon className="w-5 h-5" />,
      component: <NoteApp />,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero */}
        <section className="mb-16">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 md:p-12 shadow-2xl">
            <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

            <div className="relative max-w-4xl">
              <p className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 text-cyan-300 text-xs uppercase font-semibold tracking-[0.3em] backdrop-blur-xl">
                ✦ Premium Productivity Dashboard
              </p>

              <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black leading-tight bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
                Smart Dashboard Experience
              </h1>

              <p className="mt-6 max-w-3xl text-lg md:text-xl text-slate-300 leading-relaxed">
                A beautifully crafted ultra-premium dashboard combining
                productivity, analytics, utilities, search, weather, and notes.
              </p>
            </div>
          </div>
        </section>

        {/* Modules */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {modules.map((module, index) => {
              const words = module.title.split(" ");
              const firstWord = words[0];
              const remainingWords = words.slice(1).join(" ");

              return (
                <div
                  key={index}
                  className="group transition-all duration-500 hover:-translate-y-3"
                >
                  <Card title="">
                    {/* Premium Header */}
                    <div className="mb-6 flex items-start gap-5">
                      {/* Icon */}
                      <div
                        className="
                          relative
                          flex
                          h-16
                          w-16
                          shrink-0
                          items-center
                          justify-center
                          rounded-3xl
                          bg-gradient-to-br
                          from-slate-950
                          via-slate-800
                          to-slate-700
                          shadow-2xl
                          shadow-black/30
                          border border-white/10
                          group-hover:scale-110
                          group-hover:rotate-3
                          transition-all
                          duration-500
                        "
                      >
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 blur-xl" />

                        <div
                          className="
                            relative
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-2xl
                            bg-gradient-to-br
                            from-cyan-500
                            to-blue-600
                            text-white
                            shadow-lg
                            shadow-cyan-500/20
                          "
                        >
                          {module.icon}
                        </div>
                      </div>

                      {/* Text */}
                      <div className="flex-1">
                        <p
                          className="
                            inline-flex
                            px-4
                            py-1.5
                            rounded-full
                            border
                            border-cyan-500/20
                            bg-cyan-500/10
                            text-[10px]
                            uppercase
                            tracking-[0.35em]
                            text-cyan-500
                            font-bold
                            mb-4
                            backdrop-blur-xl
                          "
                        >
                          ✦ {module.badge}
                        </p>

                        <h2
                          className="
                            text-3xl
                            md:text-4xl
                            font-black
                            leading-tight
                            tracking-tight
                          "
                        >
                          <span className="text-slate-800">
                            {firstWord}
                          </span>{" "}
                          <span
                            className="
                              bg-gradient-to-r
                              from-cyan-500
                              via-blue-500
                              to-purple-500
                              bg-clip-text
                              text-transparent
                            "
                          >
                            {remainingWords}
                          </span>
                        </h2>

                        <p
                          className="
                            mt-3
                            text-sm
                            md:text-base
                            font-medium
                            text-slate-600
                            leading-relaxed
                          "
                        >
                          {module.description}
                        </p>
                      </div>
                    </div>

                    {module.component}
                  </Card>
                </div>
              );
            })}
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
        toastClassName="
          !rounded-2xl
          !backdrop-blur-2xl
          !bg-slate-900/90
          !border
          !border-white/10
          !shadow-2xl
        "
      />
    </div>
  );
}