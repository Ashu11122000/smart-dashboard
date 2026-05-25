import { useEffect, useState } from "react";
import {
  FaTachometerAlt,
  FaWifi,
  FaBolt,
  FaRocket,
  FaMoon,
  FaSun,
} from "react-icons/fa";

function getGreeting(hour) {
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

function getMotivation(hour) {
  if (hour < 12) return "Start strong and build momentum.";
  if (hour < 18) return "Stay focused and keep executing.";
  return "Reflect, refine, and prepare for tomorrow.";
}

export default function Navbar() {
  const [time, setTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    function handleOnline() {
      setIsOnline(true);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      clearInterval(timer);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = time.toLocaleDateString([], {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const currentHour = time.getHours();
  const greeting = getGreeting(currentHour);
  const motivation = getMotivation(currentHour);
  const isNight = currentHour >= 18 || currentHour < 6;

  return (
    <nav className="sticky top-0 z-50 overflow-hidden border-b border-white/10 bg-zinc-950/85 backdrop-blur-2xl shadow-2xl">

      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-rose-500/5 to-emerald-500/5 animate-pulse"></div>

      {/* Ambient Glow */}
      <div className="absolute -top-12 left-16 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl"></div>
      <div className="absolute top-0 right-20 h-40 w-40 rounded-full bg-rose-500/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-emerald-500/5 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-5">

          {/* Brand */}
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-amber-500/20 blur-xl group-hover:blur-2xl transition-all duration-500"></div>

              <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                <FaTachometerAlt
                  size={28}
                  className="text-amber-300 transition-all duration-700 group-hover:rotate-180"
                />
              </div>
            </div>

            <div>
              <h1 className="text-2xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-amber-200 to-rose-300 bg-clip-text text-transparent">
                Smart Dashboard
              </h1>

              <p className="mt-1 text-sm text-zinc-400 tracking-wide">
                Ultra Premium React Learning Workspace
              </p>
            </div>
          </div>

          {/* Center Insights */}
          <div className="hidden lg:flex items-center gap-4">

            {/* System Status */}
            <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-3">
                <div
                  className={`h-3 w-3 rounded-full animate-pulse ${
                    isOnline
                      ? "bg-emerald-400"
                      : "bg-rose-400"
                  }`}
                />

                <FaWifi
                  className={
                    isOnline
                      ? "text-emerald-300"
                      : "text-rose-300"
                  }
                />

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    System
                  </p>

                  <p className="text-sm font-semibold text-white">
                    {isOnline ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
            </div>

            {/* Performance */}
            <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-3">
                <FaBolt className="text-yellow-300" />

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Performance
                  </p>

                  <p className="text-sm font-semibold text-white">
                    Optimized
                  </p>
                </div>
              </div>
            </div>

            {/* Productivity */}
            <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-3">
                <FaRocket className="text-rose-300" />

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Workspace
                  </p>

                  <p className="text-sm font-semibold text-white">
                    Productive
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col md:flex-row items-center gap-4">

            {/* Greeting */}
            <div className="rounded-3xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-xl shadow-xl min-w-[240px]">
              <div className="flex items-center justify-center gap-3">
                {isNight ? (
                  <FaMoon className="text-fuchsia-300" />
                ) : (
                  <FaSun className="text-amber-300" />
                )}

                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                    {greeting}
                  </p>

                  <p className="text-sm font-semibold text-white mt-1">
                    {motivation}
                  </p>
                </div>
              </div>
            </div>

            {/* Time */}
            <div className="rounded-3xl border border-white/10 bg-white/10 px-6 py-4 backdrop-blur-xl shadow-xl text-center min-w-[240px]">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                {formattedDate}
              </p>

              <p className="mt-2 text-2xl font-black text-amber-300 tracking-wider">
                {formattedTime}
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}