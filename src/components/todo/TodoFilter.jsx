import Button from "../common/Button";

export default function TodoFilter({ currentFilter, onFilterChange }) {
  const filters = [
    {
      key: "all",
      label: "All",
      icon: "◉",
    },
    {
      key: "active",
      label: "Active",
      icon: "⚡",
    },
    {
      key: "completed",
      label: "Done",
      icon: "✓",
    },
  ];

  return (
    <div
      className="
        rounded-3xl
        border border-slate-700
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-slate-800
        p-2
        shadow-2xl
        shadow-black/40
      "
    >
      <div className="grid grid-cols-3 gap-2">
        {filters.map((filter) => {
          const isActive = currentFilter === filter.key;

          return (
            <Button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`
                rounded-2xl
                px-5
                py-4
                font-bold
                text-sm
                tracking-wide
                transition-all
                duration-300
                ${
                  isActive
                    ? `
                      bg-gradient-to-r
                      from-cyan-300
                      via-blue-500
                      to-indigo-600
                      border border-cyan-300/40
                      text-white
                      shadow-2xl
                      shadow-cyan-500/25
                      scale-[1.02]
                    `
                    : `
                      bg-slate-900
                      border border-slate-700
                      text-slate-300
                      hover:text-white
                      hover:border-cyan-400/30
                      hover:bg-slate-800
                      hover:scale-[1.02]
                    `
                }
              `}
            >
              <span className="flex items-center justify-center gap-2">
                <span>{filter.icon}</span>
                <span>{filter.label}</span>
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}