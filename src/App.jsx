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
  FireIcon,
} from "@heroicons/react/24/outline";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const modules = [
    {
      title: "Counter Analytics",
      subtitle: "Interactive productivity intelligence with elegant controls.",
      badge: "Analytics",
      icon: <ChartBarIcon className="h-6 w-6" />,
      component: <Counter />,
      accent: {
        glow: "from-emerald-500/20 via-lime-500/10 to-transparent",
        badge:
          "border-emerald-400/20 bg-emerald-500/10 text-emerald-300",
        title:
          "from-emerald-300 via-lime-300 to-yellow-300",
      },
    },
    {
      title: "User Management",
      subtitle: "Identity workflows with polished premium interactions.",
      badge: "Identity",
      icon: <UserCircleIcon className="h-6 w-6" />,
      component: <UserForm />,
      accent: {
        glow: "from-rose-500/20 via-pink-500/10 to-transparent",
        badge:
          "border-rose-400/20 bg-rose-500/10 text-rose-300",
        title:
          "from-rose-300 via-pink-300 to-orange-300",
      },
    },
    {
      title: "Task Management",
      subtitle: "Momentum-driven productivity workspace experience.",
      badge: "Productivity",
      icon: <ClipboardDocumentListIcon className="h-6 w-6" />,
      component: <TodoList />,
      accent: {
        glow: "from-amber-500/20 via-orange-500/10 to-transparent",
        badge:
          "border-amber-400/20 bg-amber-500/10 text-amber-300",
        title:
          "from-amber-300 via-orange-300 to-yellow-300",
      },
    },
    {
      title: "AI Search",
      subtitle: "Fast premium discovery interactions with modern UX.",
      badge: "Discovery",
      icon: <MagnifyingGlassIcon className="h-6 w-6" />,
      component: <DebouncedSearch />,
      accent: {
        glow: "from-fuchsia-500/20 via-pink-500/10 to-transparent",
        badge:
          "border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-300",
        title:
          "from-fuchsia-300 via-pink-300 to-rose-300",
      },
    },
    {
      title: "Smart Calculator",
      subtitle: "Modern computational intelligence with luxury interactions.",
      badge: "Compute",
      icon: <CalculatorIcon className="h-6 w-6" />,
      component: <Calculator />,
      accent: {
        glow: "from-violet-500/20 via-purple-500/10 to-transparent",
        badge:
          "border-violet-400/20 bg-violet-500/10 text-violet-300",
        title:
          "from-violet-300 via-purple-300 to-fuchsia-300",
      },
    },
    {
      title: "Weather Intelligence",
      subtitle: "Immersive atmospheric insights with advanced climate analytics.",
      badge: "Climate",
      icon: <CloudIcon className="h-6 w-6" />,
      component: <Weather />,
      accent: {
        glow: "from-cyan-500/20 via-teal-500/10 to-transparent",
        badge:
          "border-cyan-400/20 bg-cyan-500/10 text-cyan-300",
        title:
          "from-cyan-300 via-teal-300 to-emerald-300",
      },
    },
    {
      title: "Notes Workspace",
      subtitle: "Capture ideas in a beautifully immersive premium environment.",
      badge: "Creative",
      icon: <PencilSquareIcon className="h-6 w-6" />,
      component: <NoteApp />,
      accent: {
        glow: "from-orange-500/20 via-red-500/10 to-transparent",
        badge:
          "border-orange-400/20 bg-orange-500/10 text-orange-300",
        title:
          "from-orange-300 via-red-300 to-rose-300",
      },
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030303] text-white">
      {/* Ultra Premium Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,114,182,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.08),transparent_30%),radial-gradient(circle_at_center,rgba(16,185,129,0.05),transparent_45%)]" />

        <div className="absolute top-20 left-10 h-[32rem] w-[32rem] rounded-full bg-rose-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 h-[34rem] w-[34rem] rounded-full bg-amber-500/10 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      <Navbar />

      <main className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-10 md:py-14">

        {/* Hero Section */}
        <section className="mb-16 md:mb-24">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8 md:p-12 lg:p-16 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.6)]">

            <div className="absolute -top-20 right-0 h-[28rem] w-[28rem] rounded-full bg-rose-500/10 blur-3xl" />
            <div className="absolute -bottom-20 left-0 h-[28rem] w-[28rem] rounded-full bg-amber-500/10 blur-3xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 rounded-full border border-rose-400/20 bg-rose-500/10 px-5 py-2 backdrop-blur-xl">
                <SparklesIcon className="h-4 w-4 text-rose-300" />
                <span className="text-xs font-bold uppercase tracking-[0.35em] text-rose-300">
                  Ultra Premium Dashboard Suite
                </span>
              </div>

              <h1 className="mt-8 text-5xl md:text-7xl xl:text-8xl font-black leading-[0.95]">
                <span className="block text-white">
                  Luxury Dashboard
                </span>

                <span className="block bg-gradient-to-r from-rose-300 via-amber-300 to-emerald-300 bg-clip-text text-transparent">
                  Experience
                </span>
              </h1>

              <p className="mt-8 max-w-4xl text-lg md:text-xl text-zinc-300 leading-relaxed">
                A cinematic full-stack dashboard experience combining premium
                utilities, productivity systems, intelligent analytics, immersive
                weather intelligence, modern discovery workflows, and creative
                workspace tools.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                {[
                  "7 Premium Modules",
                  "Luxury Interactions",
                  "Modern UI System",
                  "Advanced Dashboard UX",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-xl"
                  >
                    <span className="text-sm font-semibold text-zinc-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Vertical Premium Module Stack */}
        <section className="space-y-14 md:space-y-20">
          {modules.map((module, index) => (
            <div key={index} className="group">
              <Card className="!bg-transparent !border-white/10 !p-0 overflow-hidden">

                {/* Module Header */}
                <div className="relative overflow-hidden border-b border-white/10 bg-white/[0.03] px-6 py-8 md:px-10 md:py-10 backdrop-blur-2xl">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${module.accent.glow}`}
                  />

                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                    {/* Left */}
                    <div className="flex items-start gap-5">
                      <div className="relative shrink-0">
                        <div
                          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${module.accent.glow} blur-xl`}
                        />

                        <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-xl">
                          {module.icon}
                        </div>
                      </div>

                      <div>
                        <span
                          className={`inline-flex rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.35em] font-bold ${module.accent.badge}`}
                        >
                          ✦ {module.badge}
                        </span>

                        <h2 className="mt-5 text-4xl md:text-5xl font-black leading-tight">
                          <span className="text-white">
                            {module.title.split(" ")[0]}
                          </span>{" "}
                          <span
                            className={`bg-gradient-to-r ${module.accent.title} bg-clip-text text-transparent`}
                          >
                            {module.title.split(" ").slice(1).join(" ")}
                          </span>
                        </h2>

                        <p className="mt-4 max-w-3xl text-base md:text-lg text-zinc-400 leading-relaxed">
                          {module.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Right Status */}
                    <div className="flex flex-wrap gap-4">
                      <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-xl">
                        <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                          Module
                        </p>
                        <p className="mt-2 font-bold text-white">
                          Ready
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-xl">
                        <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                          Experience
                        </p>
                        <p className="mt-2 font-bold text-amber-300">
                          Premium
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-xl">
                        <FireIcon className="h-6 w-6 text-rose-300" />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Module Content */}
                <div className="p-6 md:p-10">
                  {module.component}
                </div>
              </Card>
            </div>
          ))}
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