import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Minus,
  RotateCcw,
  Zap,
  Trophy,
  Target,
  TrendingUp,
  Gauge,
  TimerReset,
  Flame,
} from "lucide-react";
import Button from "../common/Button";

export default function Counter() {
  const MIN = 0;
  const MAX = 100;
  const STORAGE_KEY = "premium-counter-state";

  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return 0;

    try {
      return JSON.parse(saved).count || 0;
    } catch {
      return 0;
    }
  });

  const [step, setStep] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return 1;

    try {
      return JSON.parse(saved).step || 1;
    } catch {
      return 1;
    }
  });

  const [clicks, setClicks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return 0;

    try {
      return JSON.parse(saved).clicks || 0;
    } catch {
      return 0;
    }
  });

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return 0;

    try {
      return JSON.parse(saved).streak || 0;
    } catch {
      return 0;
    }
  });

  const [goal, setGoal] = useState(75);
  const [autoMode, setAutoMode] = useState(false);

  function incrementHandler() {
    setCount((prev) => Math.min(prev + step, MAX));
    setClicks((prev) => prev + 1);
    setStreak((prev) => prev + 1);
  }

  function decrementHandler() {
    setCount((prev) => Math.max(prev - step, MIN));
    setClicks((prev) => prev + 1);
    setStreak(0);
  }

  function resetHandler() {
    setCount(0);
    setStep(1);
    setStreak(0);
    setAutoMode(false);
  }

  function randomBoost() {
    const boost = Math.floor(Math.random() * 10) + 1;
    setCount((prev) => Math.min(prev + boost, MAX));
    setClicks((prev) => prev + 1);
  }

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        count,
        step,
        clicks,
        streak,
      })
    );
  }, [count, step, clicks, streak]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "ArrowUp") incrementHandler();
      if (e.key === "ArrowDown") decrementHandler();
      if (e.key.toLowerCase() === "r") resetHandler();
      if (e.key.toLowerCase() === "b") randomBoost();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [step]);

  useEffect(() => {
    if (!autoMode) return;

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= MAX) {
          setAutoMode(false);
          return MAX;
        }

        return Math.min(prev + step, MAX);
      });

      setClicks((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [autoMode, step]);

  const progress = (count / MAX) * 100;
  const goalProgress = (count / goal) * 100;

  const countColor = useMemo(() => {
    if (count === 0) return "text-zinc-300";
    if (count >= 80) return "text-rose-300";
    if (count >= 50) return "text-amber-300";
    return "text-emerald-300";
  }, [count]);

  const performanceStatus = useMemo(() => {
    if (count >= 90) return "Peak Performance";
    if (count >= 60) return "High Momentum";
    if (count >= 30) return "Building Momentum";
    return "Warmup Phase";
  }, [count]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-neutral-900 to-stone-950 p-8 shadow-2xl backdrop-blur-2xl">

      {/* Glow */}
      <div className="absolute -top-12 -left-12 h-44 w-44 rounded-full bg-amber-500/10 blur-3xl"></div>
      <div className="absolute -bottom-12 -right-12 h-44 w-44 rounded-full bg-rose-500/10 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl"></div>

      <div className="relative z-10 space-y-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between gap-5">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
              Counter Intelligence
            </p>

            <h2 className="mt-3 text-3xl md:text-4xl font-black bg-gradient-to-r from-white via-amber-200 to-rose-300 bg-clip-text text-transparent">
              Premium Smart Counter
            </h2>

            <p className="mt-3 text-zinc-300">
              Advanced interactive counter with productivity intelligence.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl shadow-xl">
            <Zap className="h-8 w-8 text-amber-300" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          {[
            {
              label: "Clicks",
              value: clicks,
              icon: <Gauge className="h-5 w-5" />,
              accent: "text-amber-300 border-amber-400/20",
            },
            {
              label: "Streak",
              value: streak,
              icon: <Flame className="h-5 w-5" />,
              accent: "text-rose-300 border-rose-400/20",
            },
            {
              label: "Goal",
              value: goal,
              icon: <Target className="h-5 w-5" />,
              accent: "text-emerald-300 border-emerald-400/20",
            },
            {
              label: "Status",
              value: performanceStatus,
              icon: <TrendingUp className="h-5 w-5" />,
              accent: "text-fuchsia-300 border-fuchsia-400/20",
            },
          ].map((item) => (
            <div
              key={item.label}
              className={`rounded-3xl border ${item.accent} bg-white/10 p-5 backdrop-blur-xl shadow-xl`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    {item.label}
                  </p>

                  <p className="mt-2 text-lg font-bold text-white">
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Counter */}
        <div className="text-center">
          <p className="text-zinc-400 text-sm uppercase tracking-[0.2em]">
            Current Count
          </p>

          <h1
            className={`mt-4 text-8xl font-black transition-all duration-300 ${countColor}`}
          >
            {count}
          </h1>

          <div className="mt-6 h-4 w-full rounded-full bg-black/20 overflow-hidden border border-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-400 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Goal Progress */}
        <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
          <div className="flex justify-between mb-4">
            <p className="text-zinc-300 font-medium">
              Goal Progress
            </p>

            <p className="text-amber-300 font-bold">
              {Math.min(goalProgress, 100).toFixed(0)}%
            </p>
          </div>

          <input
            type="range"
            min="10"
            max="100"
            value={goal}
            onChange={(e) => setGoal(Number(e.target.value))}
            className="w-full accent-amber-400"
          />
        </div>

        {/* Step Control */}
        <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
          <label className="text-zinc-300 text-sm">
            Step Value
          </label>

          <input
            type="range"
            min="1"
            max="10"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            className="w-full mt-4 accent-rose-400"
          />

          <p className="mt-4 text-center text-white font-bold">
            Step: <span className="text-amber-300">{step}</span>
          </p>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Button
            onClick={incrementHandler}
            className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 py-4"
          >
            <span className="flex items-center justify-center gap-2">
              <Plus className="h-5 w-5" />
              Increment
            </span>
          </Button>

          <Button
            onClick={decrementHandler}
            disabled={count === MIN}
            className="rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 py-4"
          >
            <span className="flex items-center justify-center gap-2">
              <Minus className="h-5 w-5" />
              Decrement
            </span>
          </Button>

          <Button
            onClick={resetHandler}
            className="rounded-2xl bg-gradient-to-r from-fuchsia-500 to-rose-600 py-4"
          >
            <span className="flex items-center justify-center gap-2">
              <RotateCcw className="h-5 w-5" />
              Reset
            </span>
          </Button>

          <Button
            onClick={randomBoost}
            className="rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-600 py-4"
          >
            <span className="flex items-center justify-center gap-2">
              <Trophy className="h-5 w-5" />
              Boost
            </span>
          </Button>

          <Button
            onClick={() => setAutoMode((prev) => !prev)}
            className="rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-600 py-4"
          >
            <span className="flex items-center justify-center gap-2">
              <TimerReset className="h-5 w-5" />
              {autoMode ? "Stop Auto" : "Auto Mode"}
            </span>
          </Button>
        </div>

        {/* Footer */}
        <div className="rounded-3xl border border-white/10 bg-white/10 p-5 text-center backdrop-blur-xl">
          <p className="text-zinc-400 text-sm">
            Shortcuts:
            <span className="text-emerald-300"> ↑ Increment </span> |
            <span className="text-amber-300"> ↓ Decrement </span> |
            <span className="text-rose-300"> R Reset </span> |
            <span className="text-yellow-300"> B Boost</span>
          </p>
        </div>
      </div>
    </div>
  );
}