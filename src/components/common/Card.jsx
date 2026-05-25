export default function Card({
  title,
  subtitle = "",
  icon = null,
  action = null,
  children,
  className = "",
  variant = "default",
  hover = true,
  glow = true,
  badge = null,
  footer = null,
}) {
  const variants = {
    default: {
      bg: "bg-white/8",
      border: "border-white/10",
      hoverShadow: "hover:shadow-white/10",
      glowOne: "bg-white/10",
      glowTwo: "bg-zinc-500/10",
      title: "text-white",
      subtitle: "text-zinc-400",
    },
    primary: {
      bg: "bg-amber-500/10",
      border: "border-amber-400/20",
      hoverShadow: "hover:shadow-amber-500/20",
      glowOne: "bg-amber-500/15",
      glowTwo: "bg-orange-500/10",
      title: "text-amber-100",
      subtitle: "text-amber-200/70",
    },
    success: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-400/20",
      hoverShadow: "hover:shadow-emerald-500/20",
      glowOne: "bg-emerald-500/15",
      glowTwo: "bg-lime-500/10",
      title: "text-emerald-100",
      subtitle: "text-emerald-200/70",
    },
    warning: {
      bg: "bg-orange-500/10",
      border: "border-orange-400/20",
      hoverShadow: "hover:shadow-orange-500/20",
      glowOne: "bg-orange-500/15",
      glowTwo: "bg-yellow-500/10",
      title: "text-orange-100",
      subtitle: "text-orange-200/70",
    },
    danger: {
      bg: "bg-rose-500/10",
      border: "border-rose-400/20",
      hoverShadow: "hover:shadow-rose-500/20",
      glowOne: "bg-rose-500/15",
      glowTwo: "bg-red-500/10",
      title: "text-rose-100",
      subtitle: "text-rose-200/70",
    },
    premium: {
      bg: "bg-fuchsia-500/10",
      border: "border-fuchsia-400/20",
      hoverShadow: "hover:shadow-fuchsia-500/20",
      glowOne: "bg-fuchsia-500/15",
      glowTwo: "bg-pink-500/10",
      title: "text-fuchsia-100",
      subtitle: "text-fuchsia-200/70",
    },
  };

  const activeVariant = variants[variant] || variants.default;

  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        backdrop-blur-2xl
        shadow-2xl
        transition-all
        duration-500
        p-5
        sm:p-6
        ${activeVariant.bg}
        ${activeVariant.border}
        ${
          hover
            ? `hover:-translate-y-2 hover:scale-[1.01] ${activeVariant.hoverShadow}`
            : ""
        }
        ${className}
      `}
    >
      {/* Premium Base Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/95 via-neutral-900/90 to-stone-950/95" />

      {/* Dynamic Glow Effects */}
      {glow && (
        <>
          <div
            className={`
              absolute
              -top-16
              -left-16
              h-44
              w-44
              rounded-full
              blur-3xl
              opacity-0
              transition-all
              duration-700
              group-hover:opacity-100
              ${activeVariant.glowOne}
            `}
          />

          <div
            className={`
              absolute
              -bottom-16
              -right-16
              h-44
              w-44
              rounded-full
              blur-3xl
              opacity-0
              transition-all
              duration-700
              group-hover:opacity-100
              ${activeVariant.glowTwo}
            `}
          />
        </>
      )}

      {/* Shine Sweep */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -left-24 top-0 h-full w-16 rotate-12 bg-white/10 blur-md transition-all duration-1000 group-hover:left-full" />
      </div>

      {/* Top Accent Line */}
      <div
        className={`
          absolute
          top-0
          left-0
          h-[2px]
          w-full
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
        `}
      />

      {/* Content */}
      <div className="relative z-10">
        {(title || icon || action || badge) && (
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              {icon && (
                <div
                  className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/10
                    backdrop-blur-xl
                    shadow-xl
                    transition-all
                    duration-500
                    group-hover:scale-110
                    group-hover:rotate-6
                  "
                >
                  {icon}
                </div>
              )}

              <div>
                {badge && (
                  <div className="mb-3">
                    <span
                      className="
                        rounded-full
                        border
                        border-white/10
                        bg-white/10
                        px-3
                        py-1
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.25em]
                        text-zinc-300
                      "
                    >
                      {badge}
                    </span>
                  </div>
                )}

                {title && (
                  <h3
                    className={`
                      text-xl
                      sm:text-2xl
                      font-black
                      tracking-tight
                      ${activeVariant.title}
                    `}
                  >
                    {title}
                  </h3>
                )}

                {subtitle && (
                  <p
                    className={`
                      mt-2
                      text-sm
                      leading-relaxed
                      ${activeVariant.subtitle}
                    `}
                  >
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            {action && (
              <div className="shrink-0">
                {action}
              </div>
            )}
          </div>
        )}

        {/* Main Body */}
        <div className="text-zinc-200 leading-relaxed">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="mt-6 border-t border-white/10 pt-5">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}