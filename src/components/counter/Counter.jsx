import { useState, useEffect } from "react";
import { Plus, Minus, RotateCcw, Zap } from "lucide-react";
import Button from "../common/Button";

export default function Counter() {
  const MIN = 0;
  const MAX = 100;

  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  function incrementHandler() {
    setCount((prev) => Math.min(prev + step, MAX));
  }

  function decrementHandler() {
    setCount((prev) => Math.max(prev - step, MIN));
  }

  function resetHandler() {
    setCount(0);
    setStep(1);
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "ArrowUp") incrementHandler();
      if (e.key === "ArrowDown") decrementHandler();
      if (e.key.toLowerCase() === "r") resetHandler();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step]);

  const countColor =
    count === 0
      ? "text-slate-300"
      : count > 50
      ? "text-amber-400"
      : "text-blue-400";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-blue-400/10 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-8 shadow-2xl backdrop-blur-xl">

      {/* Premium Glow Effects */}
      <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl"></div>
      <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-3xl"></div>

      <div className="relative z-10 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-200/60">
              Smart Counter
            </p>

            <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-200 to-amber-300 bg-clip-text text-transparent">
              Premium Interactive Counter
            </h2>
          </div>

          <div className="rounded-2xl border border-blue-400/10 bg-white/5 p-3 backdrop-blur-md shadow-lg">
            <Zap className="h-6 w-6 text-amber-400" />
          </div>
        </div>

        {/* Counter Display */}
        <div className="text-center">
          <p className="text-sm text-blue-100/60 mb-2">
            Current Count
          </p>

          <h1
            className={`text-7xl font-black tracking-tight transition-all duration-300 ${countColor}`}
          >
            {count}
          </h1>

          <div className="mt-4 h-3 w-full rounded-full bg-slate-800 overflow-hidden border border-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-amber-400 transition-all duration-700 shadow-lg"
              style={{ width: `${(count / MAX) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Control */}
        <div className="flex flex-col gap-3 rounded-2xl border border-blue-400/10 bg-white/5 p-5 backdrop-blur-md">
          <label className="text-sm text-blue-100/70">
            Step Value
          </label>

          <input
            type="range"
            min="1"
            max="10"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            className="accent-amber-400"
          />

          <p className="text-center text-white font-medium">
            Step: <span className="text-amber-400">{step}</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            onClick={incrementHandler}
            className="
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              via-blue-500
              to-violet-600
              px-6
              py-4
              text-white
              shadow-lg
              hover:shadow-blue-500/40
            "
          >
            <span className="flex items-center justify-center gap-2">
              <Plus className="h-5 w-5" />
              Increment
            </span>
          </Button>

          <Button
            onClick={decrementHandler}
            disabled={count === MIN}
            className="
              rounded-2xl
              bg-gradient-to-r
              from-amber-500
              to-orange-600
              px-6
              py-4
              text-white
              shadow-lg
              hover:shadow-amber-500/40
            "
          >
            <span className="flex items-center justify-center gap-2">
              <Minus className="h-5 w-5" />
              Decrement
            </span>
          </Button>

          <Button
            onClick={resetHandler}
            className="
              rounded-2xl
              bg-gradient-to-r
              from-violet-600
              to-fuchsia-600
              px-6
              py-4
              text-white
              shadow-lg
              hover:shadow-violet-500/40
            "
          >
            <span className="flex items-center justify-center gap-2">
              <RotateCcw className="h-5 w-5" />
              Reset
            </span>
          </Button>
        </div>

        {/* Footer */}
        <div className="rounded-2xl border border-blue-400/10 bg-white/5 p-4 text-center backdrop-blur-md">
          <p className="text-sm text-blue-100/60">
            Shortcuts:
            <span className="text-blue-400"> ↑ Increment </span> |
            <span className="text-amber-400"> ↓ Decrement </span> |
            <span className="text-violet-400"> R Reset</span>
          </p>
        </div>
      </div>
    </div>
  );
}