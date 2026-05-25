import Button from "../common/Button";

export default function NoteItem({ note, onDelete }) {
  const categoryStyles = {
    General: "text-blue-300 bg-blue-500/10 border-blue-400/20",
    Work: "text-amber-300 bg-amber-500/10 border-amber-400/20",
    Ideas: "text-violet-300 bg-violet-500/10 border-violet-400/20",
    Personal: "text-rose-300 bg-rose-500/10 border-rose-400/20",
  };

  const formattedDate = note.createdAt
    ? new Date(note.createdAt).toLocaleDateString([], {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-blue-400/10
        bg-white/5
        p-5
        backdrop-blur-2xl
        shadow-xl
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-blue-500/10
      "
    >
      {/* Premium ambient glow */}
      <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl opacity-0 transition duration-700 group-hover:opacity-100"></div>
      <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl opacity-0 transition duration-700 group-hover:opacity-100"></div>

      {/* Shine effect */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -left-20 top-0 h-full w-14 rotate-12 bg-white/5 blur-md transition-all duration-1000 group-hover:left-full"></div>
      </div>

      <div className="relative z-10">
        {/* Top section */}
        <div className="flex flex-col lg:flex-row justify-between gap-5">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-bold text-white break-words">
                {note.title}
              </h3>

              <span
                className={`
                  rounded-full
                  border
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  backdrop-blur-xl
                  ${categoryStyles[note.category]}
                `}
              >
                {note.category}
              </span>
            </div>

            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-blue-100/40">
              {formattedDate}
            </p>
          </div>

          <Button
            onClick={() => onDelete(note.id)}
            variant="danger"
            className="w-full sm:w-auto px-5 py-3"
          >
            Delete
          </Button>
        </div>

        {/* Content */}
        <div className="mt-5 rounded-2xl border border-white/5 bg-black/10 p-4">
          <p className="text-blue-100/75 leading-relaxed break-words whitespace-pre-wrap">
            {note.content}
          </p>
        </div>
      </div>
    </div>
  );
}