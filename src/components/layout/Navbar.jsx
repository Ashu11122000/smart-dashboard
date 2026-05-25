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
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

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

  const statusCards = [
    {
      label: "System",
      value: isOnline ? "Online" : "Offline",
      icon: <FaWifi />,
      color: isOnline ? "text-emerald-300" : "text-rose-300",
      dot: isOnline ? "bg-emerald-400" : "bg-rose-400",
    },
    {
      label: "Performance",
      value: "Optimized",
      icon: <FaBolt />,
      color: "text-amber-300",
      dot: "bg-amber-400",
    },
    {
      label: "Workspace",
      value: "Productive",
      icon: <FaRocket />,
      color: "text-rose-300",
      dot: "bg-rose-400",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/85 backdrop-blur-3xl shadow-2xl">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-rose-500/5 to-emerald-500/5" />
      <div className="absolute -top-10 left-10 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="absolute top-0 right-10 h-48 w-48 rounded-full bg-rose-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="space-y-6">
          {/* Top Row */}
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-5">
              <div className="relative group">
                <div className="absolute inset-0 rounded-3xl bg-amber-500/20 blur-xl group-hover:blur-2xl transition-all duration-500" />

                <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                  <FaTachometerAlt
                    size={28}
                    className="text-amber-300 transition-all duration-700 group-hover:rotate-180"
                  />
                </div>
              </div>

              <div>
                <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-white via-amber-200 to-rose-300 bg-clip-text text-transparent">
                  Smart Dashboard
                </h1>

                <p className="mt-2 text-sm md:text-base text-zinc-400">
                  Ultra Premium React Learning Workspace
                </p>
              </div>
            </div>

            {/* Time */}
            <div className="w-full xl:w-auto">
              <div className="rounded-3xl border border-white/10 bg-white/10 px-6 py-5 backdrop-blur-xl shadow-xl text-center">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                  {formattedDate}
                </p>

                <p className="mt-3 text-3xl md:text-4xl font-black text-amber-300 tracking-wider">
                  {formattedTime}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Status Cards */}
            {statusCards.map((card) => (
              <div
                key={card.label}
                className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`h-12 w-12 rounded-2xl border border-white/10 bg-black/20 flex items-center justify-center text-xl ${card.color}`}
                  >
                    {card.icon}
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                      {card.label}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <div
                        className={`h-2.5 w-2.5 rounded-full animate-pulse ${card.dot}`}
                      />
                      <p className="font-semibold text-white">
                        {card.value}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Greeting */}
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl shadow-xl">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                  {isNight ? (
                    <FaMoon className="text-fuchsia-300 text-xl" />
                  ) : (
                    <FaSun className="text-amber-300 text-xl" />
                  )}
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    {greeting}
                  </p>

                  <p className="mt-2 text-white font-semibold leading-relaxed">
                    {motivation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}