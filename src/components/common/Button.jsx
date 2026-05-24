export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
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
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        ${className || `
          bg-gradient-to-r
          from-cyan-500
          via-blue-500
          to-purple-500
          shadow-xl
          shadow-cyan-500/20
          hover:scale-105
          hover:shadow-2xl
          hover:shadow-cyan-500/30
        `}
      `}
    >
      {/* Premium Glow Layer */}
      <span
        className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
        "
      >
        <span className="absolute -top-10 left-0 h-20 w-20 rounded-full bg-white/20 blur-2xl" />
        <span className="absolute bottom-0 right-0 h-20 w-20 rounded-full bg-cyan-300/20 blur-2xl" />
      </span>

      {/* Glass Overlay */}
      <span
        className="
          absolute
          inset-0
          rounded-2xl
          bg-white/10
          backdrop-blur-xl
        "
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}