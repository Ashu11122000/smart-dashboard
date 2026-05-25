import { useEffect, useState } from "react";
import { FaTachometerAlt } from "react-icons/fa";

export default function Navbar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = time.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const currentHour = time.getHours();

  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <nav className="sticky top-0 z-50 border-b border-blue-400/10 bg-slate-950/80 backdrop-blur-2xl shadow-2xl">
      
      {/* Premium Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-amber-500/5 animate-pulse"></div>

      {/* Extra ambient glows */}
      <div className="absolute -top-10 left-20 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl"></div>
      <div className="absolute top-0 right-20 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5">

          {/* Left */}
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-xl group-hover:blur-2xl transition-all duration-500"></div>

              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/10 bg-white/5 backdrop-blur-xl shadow-lg transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                <FaTachometerAlt
                  size={26}
                  className="text-amber-400 transition-all duration-500 group-hover:rotate-180"
                />
              </div>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-blue-200 to-amber-300 bg-clip-text text-transparent">
                Smart Dashboard
              </h1>

              <p className="text-xs md:text-sm text-blue-100/50 tracking-wide">
                Premium React Learning Workspace
              </p>
            </div>
          </div>

          {/* Center */}
          <div className="hidden md:flex items-center gap-3 rounded-2xl border border-blue-400/10 bg-white/5 px-5 py-3 backdrop-blur-xl shadow-lg">
            <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse"></div>

            <span className="text-sm font-medium text-slate-200">
              System Online
            </span>
          </div>

          {/* Right */}
          <div className="flex flex-col sm:flex-row items-center gap-4">

            {/* Greeting */}
            <div className="rounded-2xl border border-blue-400/10 bg-white/5 px-5 py-3 backdrop-blur-xl shadow-lg text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-blue-100/50">
                {greeting}
              </p>

              <p className="text-sm font-semibold text-white">
                Welcome Back
              </p>
            </div>

            {/* Time */}
            <div className="rounded-2xl border border-blue-400/10 bg-white/5 px-5 py-3 backdrop-blur-xl shadow-lg text-center min-w-[190px]">
              <p className="text-xs text-blue-100/50">
                {formattedDate}
              </p>

              <p className="text-lg font-bold text-amber-400 tracking-wider">
                {formattedTime}
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}