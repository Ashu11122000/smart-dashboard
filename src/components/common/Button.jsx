export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  loading = false,
  icon = null,
  rightIcon = null,
  variant = "primary",
  size = "md",
  fullWidth = false,
  rounded = "xl",
}) {
  const variants = {
    primary: `
      bg-gradient-to-r
      from-amber-500
      via-orange-500
      to-rose-500
      shadow-amber-500/20
      hover:shadow-amber-500/35
      focus:ring-amber-400/50
    `,
    success: `
      bg-gradient-to-r
      from-emerald-500
      via-green-500
      to-lime-500
      shadow-emerald-500/20
      hover:shadow-emerald-500/35
      focus:ring-emerald-400/50
    `,
    danger: `
      bg-gradient-to-r
      from-rose-500
      via-red-500
      to-orange-600
      shadow-rose-500/20
      hover:shadow-rose-500/35
      focus:ring-rose-400/50
    `,
    warning: `
      bg-gradient-to-r
      from-yellow-500
      via-amber-500
      to-orange-500
      shadow-yellow-500/20
      hover:shadow-yellow-500/35
      focus:ring-yellow-400/50
    `,
    premium: `
      bg-gradient-to-r
      from-fuchsia-500
      via-pink-500
      to-rose-500
      shadow-fuchsia-500/20
      hover:shadow-fuchsia-500/35
      focus:ring-fuchsia-400/50
    `,
    ghost: `
      bg-white/10
      border
      border-white/10
      backdrop-blur-2xl
      hover:bg-white/20
      shadow-white/5
      focus:ring-white/20
    `,
    dark: `
      bg-gradient-to-r
      from-zinc-800
      via-neutral-800
      to-stone-900
      border
      border-white/10
      shadow-black/30
      hover:shadow-black/50
      focus:ring-zinc-400/40
    `,
  };

  const sizes = {
    sm: "px-4 py-2.5 text-sm gap-2",
    md: "px-5 py-3 text-sm gap-2",
    lg: "px-7 py-4 text-base gap-3",
    xl: "px-8 py-5 text-lg gap-3",
  };

  const roundedStyles = {
    md: "rounded-xl",
    xl: "rounded-2xl",
    full: "rounded-full",
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
        font-semibold
        tracking-wide
        text-white
        transition-all
        duration-300
        active:scale-95
        hover:scale-[1.03]
        shadow-xl
        hover:shadow-2xl
        focus:outline-none
        focus:ring-2
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        disabled:hover:shadow-xl
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${roundedStyles[rounded] || roundedStyles.xl}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {/* Premium Glow Layer */}
      <span className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="absolute -top-10 left-0 h-24 w-24 rounded-full bg-white/15 blur-2xl" />
        <span className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
      </span>

      {/* Shine Sweep */}
      <span className="absolute inset-0 pointer-events-none overflow-hidden">
        <span
          className={`
            absolute
            -left-24
            top-0
            h-full
            w-16
            rotate-12
            bg-white/15
            blur-md
            transition-all
            duration-1000
            group-hover:left-full
          `}
        />
      </span>

      {/* Inner Border Glow */}
      <span className="absolute inset-[1px] rounded-[inherit] border border-white/10 pointer-events-none" />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center">
        {loading ? (
          <>
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span className="absolute inset-0 rounded-full border-2 border-white/20" />
              <span className="absolute inset-0 rounded-full border-2 border-t-white animate-spin" />
            </span>

            <span className="ml-2">Processing...</span>
          </>
        ) : (
          <>
            {icon && (
              <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
                {icon}
              </span>
            )}

            <span>{children}</span>

            {rightIcon && (
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                {rightIcon}
              </span>
            )}
          </>
        )}
      </span>
    </button>
  );
}