import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  Calculator as CalculatorIcon,
  History,
  Trash2,
  Copy,
  Sigma,
  Sparkles,
  Percent,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import { calculate } from "../../utils/calculatorHelpers";

export default function Calculator() {
  const STORAGE_KEY = "premium-calculator-history";

  const [input, setInput] = useState("");
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [lastResult, setLastResult] = useState("");
  const [themePulse, setThemePulse] = useState(false);
  const [memory, setMemory] = useState(0);

  function triggerPulse() {
    setThemePulse(true);
    setTimeout(() => setThemePulse(false), 220);
  }

  function appendValue(value) {
    setInput((prev) => prev + value);
    triggerPulse();
  }

  function clearInput() {
    setInput("");
  }

  function backspace() {
    setInput((prev) => prev.slice(0, -1));
  }

  function handleCalculate() {
    if (!input.trim()) return;

    try {
      const result = String(calculate(input));

      const newEntry = {
        expression: input,
        result,
        time: new Date().toLocaleTimeString(),
      };

      setHistory((prev) => [newEntry, ...prev.slice(0, 9)]);
      setLastResult(result);
      setInput(result);

      toast.success("Calculation completed");
    } catch {
      toast.error("Invalid calculation");
    }
  }

  function percentageHandler() {
    if (!input.trim()) return;

    try {
      const result = String(Number(calculate(input)) / 100);
      setInput(result);
      setLastResult(result);
      toast.success("Percentage applied");
    } catch {
      toast.error("Invalid percentage");
    }
  }

  function squareHandler() {
    if (!input.trim()) return;

    try {
      const result = String(Math.pow(Number(calculate(input)), 2));
      setInput(result);
      setLastResult(result);
    } catch {
      toast.error("Invalid square operation");
    }
  }

  function sqrtHandler() {
    if (!input.trim()) return;

    try {
      const result = String(Math.sqrt(Number(calculate(input))));
      setInput(result);
      setLastResult(result);
    } catch {
      toast.error("Invalid square root");
    }
  }

  function copyResult() {
    if (!lastResult) return;

    navigator.clipboard.writeText(lastResult);
    toast.success("Result copied");
  }

  function memoryAdd() {
    try {
      const value = Number(calculate(input || "0"));
      setMemory((prev) => prev + value);
      toast.success("Added to memory");
    } catch {
      toast.error("Invalid memory operation");
    }
  }

  function memoryRecall() {
    setInput(String(memory));
  }

  function memoryClear() {
    setMemory(0);
    toast.info("Memory cleared");
  }

  function clearHistory() {
    setHistory([]);
    toast.info("History cleared");
  }

  function handleButtonClick(btn) {
    if (btn === "=") return handleCalculate();
    if (btn === "C") return clearInput();
    if (btn === "⌫") return backspace();
    if (btn === "%") return percentageHandler();
    if (btn === "x²") return squareHandler();
    if (btn === "√") return sqrtHandler();

    appendValue(btn);
  }

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (/[\d+\-*/.]/.test(e.key)) appendValue(e.key);

      if (e.key === "Enter") {
        e.preventDefault();
        handleCalculate();
      }

      if (e.key === "Backspace") backspace();
      if (e.key === "Escape") clearInput();
      if (e.key === "%") percentageHandler();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [input]);

  const buttons = [
    "C",
    "⌫",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "√",
    "0",
    ".",
    "=",
  ];

  const totalCalculations = useMemo(() => history.length, [history]);

  return (
    <Card variant="premium">
      <div
        className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-neutral-900 to-stone-950 p-6 shadow-2xl backdrop-blur-2xl transition-all duration-300 ${
          themePulse ? "scale-[1.01]" : ""
        }`}
      >
        {/* Glow */}
        <div className="absolute -top-16 -left-16 h-52 w-52 rounded-full bg-amber-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-16 -right-16 h-52 w-52 rounded-full bg-rose-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl"></div>

        <div className="relative z-10 space-y-6">

          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Smart Utility
              </p>

              <h2 className="mt-3 text-3xl font-black bg-gradient-to-r from-white via-amber-200 to-rose-300 bg-clip-text text-transparent">
                Premium Calculator Pro
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center">
                <CalculatorIcon className="mx-auto h-5 w-5 text-amber-300" />
                <p className="mt-2 text-xs text-zinc-400">Last</p>
                <p className="font-bold text-white">{lastResult || "—"}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center">
                <History className="mx-auto h-5 w-5 text-emerald-300" />
                <p className="mt-2 text-xs text-zinc-400">History</p>
                <p className="font-bold text-white">{totalCalculations}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center">
                <Sigma className="mx-auto h-5 w-5 text-rose-300" />
                <p className="mt-2 text-xs text-zinc-400">Memory</p>
                <p className="font-bold text-white">{memory}</p>
              </div>
            </div>
          </div>

          {/* Display */}
          <div className="rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl shadow-inner">
            <p className="text-sm text-zinc-500 mb-3 uppercase tracking-[0.2em]">
              Expression
            </p>

            <input
              type="text"
              value={input}
              readOnly
              className="w-full bg-transparent text-right text-4xl md:text-5xl font-black text-white outline-none"
              placeholder="0"
            />
          </div>

          {/* Memory Controls */}
          <div className="grid grid-cols-3 gap-3">
            <Button variant="ghost" onClick={memoryAdd} fullWidth>
              M+
            </Button>

            <Button variant="ghost" onClick={memoryRecall} fullWidth>
              MR
            </Button>

            <Button variant="ghost" onClick={memoryClear} fullWidth>
              MC
            </Button>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-3">
            {buttons.map((btn) => {
              const isOperator = ["/", "*", "-", "+", "="].includes(btn);
              const isDanger = ["C", "⌫"].includes(btn);
              const isUtility = ["%", "√"].includes(btn);

              return (
                <Button
                  key={btn}
                  onClick={() => handleButtonClick(btn)}
                  fullWidth
                  className={`
                    py-4
                    text-lg
                    font-bold
                    ${
                      isOperator
                        ? "!bg-gradient-to-r !from-amber-500 !to-orange-600"
                        : isDanger
                        ? "!bg-gradient-to-r !from-rose-500 !to-red-600"
                        : isUtility
                        ? "!bg-gradient-to-r !from-fuchsia-500 !to-pink-600"
                        : ""
                    }
                  `}
                >
                  {btn}
                </Button>
              );
            })}
          </div>

          {/* Extra Tools */}
          <div className="grid md:grid-cols-3 gap-3">
            <Button
              variant="success"
              onClick={squareHandler}
              icon={<Sparkles size={16} />}
              fullWidth
            >
              x²
            </Button>

            <Button
              variant="warning"
              onClick={percentageHandler}
              icon={<Percent size={16} />}
              fullWidth
            >
              Percentage
            </Button>

            <Button
              variant="premium"
              onClick={copyResult}
              icon={<Copy size={16} />}
              fullWidth
            >
              Copy Result
            </Button>
          </div>

          {/* History */}
          <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-white text-lg">
                Recent History
              </h3>

              <button
                onClick={clearHistory}
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
              >
                <Trash2 size={14} />
                Clear
              </button>
            </div>

            {history.length === 0 ? (
              <p className="text-zinc-500">No calculations yet</p>
            ) : (
              <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                {history.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(item.expression)}
                    className="w-full flex justify-between rounded-2xl bg-black/20 px-4 py-4 hover:bg-white/10 transition text-left"
                  >
                    <div>
                      <p className="text-zinc-300">{item.expression}</p>
                      <p className="text-xs text-zinc-500 mt-1">
                        {item.time}
                      </p>
                    </div>

                    <span className="font-bold text-amber-300">
                      {item.result}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center">
            <p className="text-sm text-zinc-400">
              Keyboard:
              <span className="text-amber-300"> Enter = Calculate </span> |
              <span className="text-rose-300"> Esc = Clear </span> |
              <span className="text-fuchsia-300"> % = Percentage </span>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}