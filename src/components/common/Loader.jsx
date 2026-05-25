export default function Loader({
  text = "Initializing premium experience...",
  size = "md",
  fullscreen = false,
  variant = "primary",
  showProgressDots = true,
  showStatusCard = true,
}) {
  const sizes = {
    sm: {
      wrapper: "w-12 h-12",
      core: "w-3 h-3",
    },
    md: {
      wrapper: "w-16 h-16",
      core: "w-4 h-4",
    },
    lg: {
      wrapper: "w-24 h-24",
      core: "w-6 h-6",
    },
  };

  const variants = {
    primary: {
      ring: "border-amber-400",
      glow: "bg-amber-500/20",
      text: "text-amber-300",
      accent: "text-orange-300",
      pulse: "bg-amber-400",
    },
    success: {
      ring: "border-emerald-400",
      glow: "bg-emerald-500/20",
      text: "text-emerald-300",
      accent: "text-lime-300",
      pulse: "bg-emerald-400",
    },
    warning: {
      ring: "border-orange-400",
      glow: "bg-orange-500/20",
      text: "text-orange-300",
      accent: "text-amber-200",
      pulse: "bg-orange-400",
    },
    danger: {
      ring: "border-rose-400",
      glow: "bg-rose-500/20",
      text: "text-rose-300",
      accent: "text-red-200",
      pulse: "bg-rose-400",
    },
    cosmic: {
      ring: "border-fuchsia-400",
      glow: "bg-fuchsia-500/20",
      text: "text-fuchsia-300",
      accent: "text-pink-200",
      pulse: "bg-fuchsia-400",
    },
  };

  const activeVariant = variants[variant] || variants.primary;
  const activeSize = sizes[size] || sizes.md;

  const wrapperClass = fullscreen
    ? "fixed inset-0 z-50 bg-black/70 backdrop-blur-2xl"
    : "w-full py-12";

  return (
    <div
      className={`flex items-center justify-center ${wrapperClass}`}
      role="status"
      aria-live="polite"
    >
      <div className="relative flex flex-col items-center gap-8">

        {/* Ambient Glow Layers */}
        <div
          className={`absolute ${activeSize.wrapper} rounded-full blur-3xl animate-pulse ${activeVariant.glow}`}
        />

        <div className="absolute h-36 w-36 rounded-full bg-white/5 blur-3xl animate-pulse" />

        {/* Loader Core */}
        <div className="relative">
          {/* Outer Halo */}
          <div
            className={`
              absolute
              inset-0
              rounded-full
              scale-125
              bg-white/5
              blur-xl
            `}
          />

          {/* Main Ring */}
          <div
            className={`
              relative
              ${activeSize.wrapper}
              rounded-full
              border-4
              border-white/10
              backdrop-blur-xl
              shadow-2xl
              flex
              items-center
              justify-center
              bg-white/5
            `}
          >
            {/* Rotating Ring */}
            <div
              className={`
                absolute
                inset-0
                rounded-full
                border-4
                border-t-transparent
                animate-spin
                ${activeVariant.ring}
              `}
            />

            {/* Reverse Ring */}
            <div
              className={`
                absolute
                inset-2
                rounded-full
                border-2
                border-b-transparent
                border-white/20
                animate-[spin_2.5s_linear_reverse_infinite]
              `}
            />

            {/* Core */}
            <div
              className={`
                ${activeSize.core}
                rounded-full
                bg-white/20
                shadow-inner
                animate-pulse
              `}
            />
          </div>
        </div>

        {/* Content */}
        <div className="text-center max-w-md space-y-4">

          <div>
            <p
              className={`
                text-base
                md:text-lg
                font-bold
                tracking-wide
                ${activeVariant.text}
              `}
            >
              {text}
            </p>

            <p className="mt-2 text-sm text-zinc-400">
              Preparing your premium dashboard experience...
            </p>
          </div>

          {/* Progress Dots */}
          {showProgressDots && (
            <div className="flex justify-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${activeVariant.pulse} animate-bounce`}
              />
              <span
                className={`h-2.5 w-2.5 rounded-full ${activeVariant.pulse} animate-bounce [animation-delay:150ms]`}
              />
              <span
                className={`h-2.5 w-2.5 rounded-full ${activeVariant.pulse} animate-bounce [animation-delay:300ms]`}
              />
            </div>
          )}

          {/* Status Card */}
          {showStatusCard && (
            <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-2xl shadow-xl">
              <div className="flex items-center justify-center gap-3">
                <div
                  className={`h-3 w-3 rounded-full ${activeVariant.pulse} animate-pulse`}
                />

                <span className={`text-sm font-semibold ${activeVariant.accent}`}>
                  System Optimizing Resources
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}