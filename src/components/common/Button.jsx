export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  loading = false,
  icon = null,
  variant = "primary",
}) {
  const variants = {
    primary: `
      bg-gradient-to-r
      from-cyan-500
      via-blue-500
      to-purple-500
      shadow-cyan-500/20
      hover:shadow-cyan-500/30
    `,
    danger: `
      bg-gradient-to-r
      from-red-500
      to-orange-500
      shadow-red-500/20
      hover:shadow-red-500/30
    `,
    success: `
      bg-gradient-to-r
      from-emerald-500
      to-green-600
      shadow-emerald-500/20
      hover:shadow-emerald-500/30
    `,
    warning: `
      bg-gradient-to-r
      from-amber-500
      to-orange-500
      shadow-amber-500/20
      hover:shadow-amber-500/30
    `,
    ghost: `
      bg-white/10
      border
      border-white/10
      backdrop-blur-xl
      hover:bg-white/20
      shadow-white/5
    `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`
        group
        relative
        inline-flex
        items-center
        justify-center
        overflow-hidden
        rounded-2xl
        px-5
        py-3
        font-semibold
        tracking-wide
        text-white
        transition-all
        duration-300
        active:scale-95
        hover:scale-105
        shadow-xl
        hover:shadow-2xl
        focus:outline-none
        focus:ring-2
        focus:ring-cyan-400/60
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        ${variants[variant]}
        ${className}
      `}
    >
      {/* Glow Effects */}
      <span className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="absolute -top-10 left-0 h-20 w-20 rounded-full bg-white/20 blur-2xl" />
        <span className="absolute bottom-0 right-0 h-20 w-20 rounded-full bg-cyan-300/20 blur-2xl" />
      </span>

      {/* Shine Sweep */}
      <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        <span className="absolute -left-20 top-0 h-full w-16 rotate-12 bg-white/10 blur-md transition-all duration-700 group-hover:left-full" />
      </span>

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {loading ? (
          <>
            <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Loading...
          </>
        ) : (
          <>
            {icon && <span>{icon}</span>}
            {children}
          </>
        )}
      </span>
    </button>
  );
}