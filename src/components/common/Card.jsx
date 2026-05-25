export default function Card({
  title,
  subtitle = "",
  icon = null,
  action = null,
  children,
  className = "",
  variant = "default",
  hover = true,
}) {
  const variants = {
    default: `
      bg-white/5
      border-white/10
    `,
    primary: `
      bg-cyan-500/10
      border-cyan-400/20
    `,
    success: `
      bg-emerald-500/10
      border-emerald-400/20
    `,
    warning: `
      bg-amber-500/10
      border-amber-400/20
    `,
    danger: `
      bg-red-500/10
      border-red-400/20
    `,
  };

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
        ${hover ? "hover:-translate-y-2 hover:shadow-cyan-500/10" : ""}
        ${variants[variant]}
        ${className}
      `}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95" />

      {/* Animated Glow */}
      <div className="absolute -top-16 -left-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl opacity-0 transition duration-700 group-hover:opacity-100" />
      <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl opacity-0 transition duration-700 group-hover:opacity-100" />

      {/* Premium Shine */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -left-24 top-0 h-full w-16 rotate-12 bg-white/10 blur-md transition-all duration-1000 group-hover:left-full" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {(title || icon || action) && (
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              {icon && (
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl">
                  {icon}
                </div>
              )}

              <div>
                {title && (
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {title}
                  </h3>
                )}

                {subtitle && (
                  <p className="text-sm text-slate-400 mt-1">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            {action && <div>{action}</div>}
          </div>
        )}

        <div className="text-slate-300">
          {children}
        </div>
      </div>
    </div>
  );
}