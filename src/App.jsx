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
  SparklesIcon,
} from "@heroicons/react/24/outline";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const modules = [
    {
      title: "Counter Analytics",
      description:
        "Interactive intelligent counter with precision controls, visual progress intelligence, and premium keyboard interactions.",
      badge: "Analytics",
      icon: <ChartBarIcon className="w-5 h-5" />,
      component: <Counter />,
      accent: {
        badge:
          "border-emerald-400/20 bg-emerald-500/10 text-emerald-300",
        glow: "from-emerald-500/20 to-lime-500/10",
        title:
          "from-emerald-300 via-lime-300 to-yellow-300",
      },
    },
    {
      title: "User Management",
      description:
        "Elegant profile workflows with premium identity management and immersive interaction design.",
      badge: "Identity",
      icon: <UserCircleIcon className="w-5 h-5" />,
      component: <UserForm />,
      accent: {
        badge:
          "border-rose-400/20 bg-rose-500/10 text-rose-300",
        glow: "from-rose-500/20 to-pink-500/10",
        title:
          "from-rose-300 via-pink-300 to-orange-300",
      },
    },
    {
      title: "Task Management",
      description:
        "Ultra-premium productivity workspace with advanced task organization and momentum-driven interactions.",
      badge: "Productivity",
      icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
      component: <TodoList />,
      accent: {
        badge:
          "border-amber-400/20 bg-amber-500/10 text-amber-300",
        glow: "from-amber-500/20 to-orange-500/10",
        title:
          "from-amber-300 via-orange-300 to-yellow-300",
      },
    },
    {
      title: "AI Search",
      description:
        "Premium debounced intelligent search experience with responsive modern discovery interactions.",
      badge: "Discovery",
      icon: <MagnifyingGlassIcon className="w-5 h-5" />,
      component: <DebouncedSearch />,
      accent: {
        badge:
          "border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-300",
        glow: "from-fuchsia-500/20 to-pink-500/10",
        title:
          "from-fuchsia-300 via-pink-300 to-rose-300",
      },
    },
    {
      title: "Smart Calculator",
      description:
        "Advanced computational intelligence with premium memory tools, history tracking, and modern interaction layers.",
      badge: "Compute",
      icon: <CalculatorIcon className="w-5 h-5" />,
      component: <Calculator />,
      accent: {
        badge:
          "border-violet-400/20 bg-violet-500/10 text-violet-300",
        glow: "from-violet-500/20 to-purple-500/10",
        title:
          "from-violet-300 via-purple-300 to-fuchsia-300",
      },
    },
    {
      title: "Weather Intelligence",
      description:
        "Immersive atmospheric intelligence delivering premium climate insights, analytics, and elegant forecasting.",
      badge: "Climate",
      icon: <CloudIcon className="w-5 h-5" />,
      component: <Weather />,
      accent: {
        badge:
          "border-cyan-400/20 bg-cyan-500/10 text-cyan-300",
        glow: "from-cyan-500/20 to-teal-500/10",
        title:
          "from-cyan-300 via-teal-300 to-emerald-300",
      },
    },
    {
      title: "Notes Workspace",
      description:
        "Beautiful premium idea management system for capturing thoughts, concepts, workflows, and structured creativity.",
      badge: "Creative",
      icon: <PencilSquareIcon className="w-5 h-5" />,
      component: <NoteApp />,
      accent: {
        badge:
          "border-orange-400/20 bg-orange-500/10 text-orange-300",
        glow: "from-orange-500/20 to-red-500/10",
        title:
          "from-orange-300 via-red-300 to-rose-300",
      },
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* Ultra Premium Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,114,182,0.08),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.08),transparent_35%),radial-gradient(circle_at_center,rgba(16,185,129,0.05),transparent_45%)]" />

        <div className="absolute top-20 left-10 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 h-[30rem] w-[30rem] rounded-full bg-amber-500/10 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      <Navbar />

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Hero Section */}
        <section className="mb-20">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-12 lg:p-16 backdrop-blur-3xl shadow-[0_30px_80px_rgba(0,0,0,0.5)]">

            <div className="absolute -top-20 right-0 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl" />
            <div className="absolute -bottom-20 left-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">

              <div>
                <p className="inline-flex items-center gap-3 rounded-full border border-rose-400/20 bg-rose-500/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.35em] text-rose-300 backdrop-blur-xl">
                  <SparklesIcon className="h-4 w-4" />
                  Ultra Premium Dashboard Suite
                </p>

                <h1 className="mt-8 text-5xl md:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight">
                  <span className="block text-white">Future-Grade</span>
                  <span className="block bg-gradient-to-r from-rose-300 via-amber-300 to-emerald-300 bg-clip-text text-transparent">
                    Dashboard Experience
                  </span>
                </h1>

                <p className="mt-8 max-w-3xl text-lg md:text-xl text-zinc-300 leading-relaxed">
                  A cinematic productivity ecosystem combining premium utilities,
                  smart analytics, atmospheric intelligence, creative workflows,
                  and ultra-modern interaction systems.
                </p>

                <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Modules", value: "7+" },
                    { label: "Premium UX", value: "100%" },
                    { label: "Interactions", value: "Advanced" },
                    { label: "Visual Quality", value: "Ultra" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur-xl"
                    >
                      <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                        {item.label}
                      </p>

                      <p className="mt-3 text-xl font-black text-white">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Hero Visual */}
              <div className="relative hidden lg:block">
                <div className="grid grid-cols-2 gap-5">
                  {modules.slice(0, 4).map((module, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl shadow-2xl hover:-translate-y-2 transition-all duration-500"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${module.accent.glow} opacity-40`}
                      />

                      <div className="relative z-10">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black/30 border border-white/10 text-white shadow-xl">
                          {module.icon}
                        </div>

                        <h3 className="mt-5 text-lg font-bold text-white">
                          {module.title}
                        </h3>

                        <p className="mt-2 text-sm text-zinc-400">
                          {module.badge}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Modules Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {modules.map((module, index) => {
              const words = module.title.split(" ");
              const firstWord = words[0];
              const rest = words.slice(1).join(" ");

              return (
                <div
                  key={index}
                  className="group transition-all duration-700 hover:-translate-y-4"
                >
                  <Card className="!bg-transparent !border-white/10">
                    {/* Module Header */}
                    <div className="mb-8">
                      <div className="flex items-start gap-5">

                        <div className="relative shrink-0">
                          <div
                            className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${module.accent.glow} blur-xl`}
                          />

                          <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                            {module.icon}
                          </div>
                        </div>

                        <div className="flex-1">
                          <span
                            className={`inline-flex rounded-full border px-4 py-1.5 text-[10px] uppercase tracking-[0.35em] font-bold backdrop-blur-xl ${module.accent.badge}`}
                          >
                            ✦ {module.badge}
                          </span>

                          <h2 className="mt-5 text-3xl md:text-4xl font-black leading-tight">
                            <span className="text-white">{firstWord}</span>{" "}
                            <span
                              className={`bg-gradient-to-r ${module.accent.title} bg-clip-text text-transparent`}
                            >
                              {rest}
                            </span>
                          </h2>

                          <p className="mt-4 text-sm md:text-base text-zinc-400 leading-relaxed">
                            {module.description}
                          </p>
                        </div>
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
        autoClose={2600}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        toastClassName="
          !rounded-3xl
          !bg-black/80
          !backdrop-blur-3xl
          !border
          !border-white/10
          !shadow-2xl
          !text-white
        "
      />
    </div>
  );
}