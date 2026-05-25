import Button from "../common/Button";

export default function TodoFilter({
  currentFilter,
  onFilterChange,
}) {
  const filters = [
    {
      key: "all",
      label: "All Tasks",
      icon: "📋",
      accent: `
        from-zinc-600
        via-neutral-500
        to-stone-600
        border-zinc-300/20
        shadow-zinc-500/20
      `,
    },
    {
      key: "active",
      label: "Active",
      icon: "⚡",
      accent: `
        from-amber-500
        via-orange-500
        to-yellow-500
        border-amber-300/20
        shadow-amber-500/20
      `,
    },
    {
      key: "completed",
      label: "Completed",
      icon: "✅",
      accent: `
        from-emerald-500
        via-green-500
        to-lime-500
        border-emerald-300/20
        shadow-emerald-500/20
      `,
    },
    {
      key: "high-priority",
      label: "High Priority",
      icon: "🔥",
      accent: `
        from-rose-500
        via-red-500
        to-orange-500
        border-rose-300/20
        shadow-rose-500/20
      `,
    },
  ];

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-gradient-to-br
        from-zinc-950
        via-neutral-900
        to-stone-950
        p-4
        shadow-2xl
        backdrop-blur-2xl
      "
    >
      {/* Ambient Glow */}
      <div className="absolute -top-12 -left-12 h-36 w-36 rounded-full bg-amber-500/10 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-rose-500/10 blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl"></div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
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
                      ${filter.accent}
                      text-white
                      shadow-2xl
                      scale-[1.03]
                    `
                    : `
                      bg-white/10
                      border-white/10
                      text-zinc-300
                      hover:text-white
                      hover:border-amber-400/20
                      hover:bg-white/20
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