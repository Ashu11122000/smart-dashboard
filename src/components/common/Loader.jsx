export default function Loader({
  text = "Loading amazing things...",
  size = "md",
  fullscreen = false,
  variant = "primary",
}) {
  const sizes = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const variants = {
    primary: {
      ring: "border-cyan-400",
      glow: "bg-cyan-500/20",
      text: "text-cyan-300",
    },
    success: {
      ring: "border-emerald-400",
      glow: "bg-emerald-500/20",
      text: "text-emerald-300",
    },
    warning: {
      ring: "border-amber-400",
      glow: "bg-amber-500/20",
      text: "text-amber-300",
    },
    danger: {
      ring: "border-red-400",
      glow: "bg-red-500/20",
      text: "text-red-300",
    },
  };

  const wrapperClass = fullscreen
    ? "fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xl"
    : "w-full py-10";

  return (
    <div className={`flex items-center justify-center ${wrapperClass}`}>
      <div className="relative flex flex-col items-center gap-6">
        
        {/* Glow Background */}
        <div
          className={`
            absolute
            ${sizes[size]}
            rounded-full
            blur-3xl
            animate-pulse
            ${variants[variant].glow}
          `}
        />

        {/* Outer Ring */}
        <div
          className={`
            relative
            ${sizes[size]}
            rounded-full
            border-4
            border-white/10
            backdrop-blur-xl
            shadow-2xl
            flex
            items-center
            justify-center
          `}
        >
          {/* Spinner Ring */}
          <div
            className={`
              absolute
              inset-0
              rounded-full
              border-4
              border-t-transparent
              animate-spin
              ${variants[variant].ring}
            `}
          />

          {/* Inner Core */}
          <div className="w-1/3 h-1/3 rounded-full bg-white/10 backdrop-blur-xl shadow-inner" />
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p
            className={`
              text-sm
              md:text-base
              font-semibold
              tracking-wide
              ${variants[variant].text}
            `}
          >
            {text}
          </p>

          <p className="text-xs text-slate-500 mt-1">
            Please wait while we prepare your dashboard
          </p>
        </div>
      </div>
    </div>
  );
}