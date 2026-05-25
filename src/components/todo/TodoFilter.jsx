import Button from "../common/Button";

export default function TodoFilter({ currentFilter, onFilterChange }) {
  const filters = [
    {
      key: "all",
      label: "All Tasks",
      icon: "◉",
      accent: "blue",
    },
    {
      key: "active",
      label: "Active",
      icon: "⚡",
      accent: "amber",
    },
    {
      key: "completed",
      label: "Completed",
      icon: "✓",
      accent: "violet",
    },
  ];

  const activeStyles = {
    blue: `
      from-blue-600
      via-blue-500
      to-indigo-600
      border-blue-300/20
      shadow-blue-500/20
    `,
    amber: `
      from-amber-500
      via-orange-500
      to-yellow-500
      border-amber-300/20
      shadow-amber-500/20
    `,
    violet: `
      from-violet-600
      via-purple-500
      to-fuchsia-600
      border-violet-300/20
      shadow-violet-500/20
    `,
  };

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border border-blue-400/10
        bg-gradient-to-br
        from-slate-950
        via-blue-950
        to-slate-900
        p-3
        shadow-2xl
        backdrop-blur-2xl
      "
    >
      {/* Ambient Glow */}
      <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl animate-pulse"></div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                border
                ${
                  isActive
                    ? `
                      bg-gradient-to-r
                      ${activeStyles[filter.accent]}
                      text-white
                      shadow-2xl
                      scale-[1.03]
                    `
                    : `
                      bg-white/5
                      border-blue-400/10
                      text-blue-100/60
                      hover:text-white
                      hover:border-amber-400/20
                      hover:bg-white/10
                      hover:scale-[1.02]
                    `
                }
              `}
            >
              <span className="flex items-center justify-center gap-3">
                <span
                  className={`
                    text-lg
                    transition-all
                    duration-300
                    ${isActive ? "scale-110" : ""}
                  `}
                >
                  {filter.icon}
                </span>

                <span>{filter.label}</span>
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}