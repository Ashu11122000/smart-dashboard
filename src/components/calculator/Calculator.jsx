import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Card from "../common/Card";
import Button from "../common/Button";
import { calculate } from "../../utils/calculatorHelpers";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [lastResult, setLastResult] = useState("");
  const [themePulse, setThemePulse] = useState(false);

  function appendValue(value) {
    setInput((prev) => prev + value);
    setThemePulse(true);
    setTimeout(() => setThemePulse(false), 250);
  }

  function clearInput() {
    setInput("");
  }

  function backspace() {
    setInput((prev) => prev.slice(0, -1));
  }

  function handleCalculate() {
    if (!input) return;

    try {
      const result = calculate(input);

      setHistory((prev) => [
        {
          expression: input,
          result,
        },
        ...prev.slice(0, 4),
      ]);

      setLastResult(result);
      setInput(result);
    } catch {
      toast.error("Invalid calculation");
    }
  }

  function percentageHandler() {
    try {
      const result = String(Number(calculate(input)) / 100);
      setInput(result);
    } catch {
      toast.error("Invalid percentage");
    }
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (/[\d+\-*/.]/.test(e.key)) {
        appendValue(e.key);
      }

      if (e.key === "Enter") {
        e.preventDefault();
        handleCalculate();
      }

      if (e.key === "Backspace") {
        backspace();
      }

      if (e.key === "Escape") {
        clearInput();
      }

      if (e.key === "%") {
        percentageHandler();
      }
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
    "0",
    ".",
    "=",
  ];

  function handleButtonClick(btn) {
    if (btn === "=") return handleCalculate();
    if (btn === "C") return clearInput();
    if (btn === "⌫") return backspace();
    if (btn === "%") return percentageHandler();

    appendValue(btn);
  }

  return (
    <Card>
      <div
        className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 shadow-2xl backdrop-blur-2xl transition-all duration-300 ${
          themePulse ? "scale-[1.01]" : ""
        }`}
      >
        {/* Glow Effects */}
        <div className="absolute -top-16 -left-16 h-52 w-52 rounded-full bg-cyan-500/15 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-16 -right-16 h-52 w-52 rounded-full bg-violet-500/15 blur-3xl animate-pulse"></div>

        <div className="relative z-10 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Smart Utility
              </p>
              <h2 className="text-2xl font-black bg-gradient-to-r from-white via-cyan-300 to-violet-400 bg-clip-text text-transparent">
                Premium Calculator
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
              <p className="text-xs text-slate-400">Last Result</p>
              <p className="font-bold text-cyan-400">{lastResult || "—"}</p>
            </div>
          </div>

          {/* Display */}
          <div className="rounded-3xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl shadow-inner">
            <p className="text-sm text-slate-400 mb-2">Expression</p>

            <input
              type="text"
              value={input}
              readOnly
              className="w-full bg-transparent text-right text-4xl font-black text-white outline-none"
              placeholder="0"
            />
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-3">
            {buttons.map((btn) => {
              const isOperator = ["/", "*", "-", "+", "="].includes(btn);
              const isDanger = ["C", "⌫"].includes(btn);

              return (
                <Button
                  key={btn}
                  onClick={() => handleButtonClick(btn)}
                  className={`
                    rounded-2xl px-4 py-4 text-lg font-bold transition-all duration-300
                    hover:scale-105 active:scale-95
                    ${
                      isOperator
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                        : isDanger
                        ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
                        : btn === "%"
                        ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white"
                        : "bg-white/10 text-white backdrop-blur-xl hover:bg-white/20"
                    }
                  `}
                >
                  {btn}
                </Button>
              );
            })}
          </div>

          {/* History */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-white">Recent History</h3>

              <button
                onClick={() => setHistory([])}
                className="text-xs text-slate-400 hover:text-white transition"
              >
                Clear History
              </button>
            </div>

            {history.length === 0 ? (
              <p className="text-sm text-slate-500">No recent calculations</p>
            ) : (
              <div className="space-y-2">
                {history.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between rounded-2xl bg-black/20 px-4 py-3"
                  >
                    <span className="text-slate-300">{item.expression}</span>
                    <span className="font-bold text-cyan-400">
                      {item.result}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-xl">
            <p className="text-sm text-slate-400">
              Keyboard:
              <span className="text-cyan-400"> Enter = Calculate </span> |
              <span className="text-red-400"> Esc = Clear </span> |
              <span className="text-violet-400"> % = Percentage </span>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}