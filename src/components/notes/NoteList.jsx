import NoteItem from "./NoteItem";

export default function NoteList({
  notes,
  onDelete,
  onUpdate,
  onPin,
  onArchive,
}) {
  if (notes.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950/90 via-neutral-900/80 to-stone-950/90 p-12 text-center backdrop-blur-2xl shadow-2xl">

        {/* Ambient Glow */}
        <div className="absolute -top-12 -left-12 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-rose-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl"></div>

        <div className="relative z-10">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur-xl shadow-xl">
            <span className="text-4xl">📝</span>
          </div>

          <h3 className="mt-6 text-3xl font-black bg-gradient-to-r from-white via-amber-200 to-rose-300 bg-clip-text text-transparent">
            Knowledge Workspace Empty
          </h3>

          <p className="mt-4 max-w-xl mx-auto text-zinc-400 leading-relaxed">
            Start capturing ideas, strategies, learnings, priorities, and
            brilliant thoughts in your premium productivity workspace.
          </p>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {[
              {
                icon: "💡",
                title: "Capture Ideas",
                text: "Store creative thoughts instantly",
              },
              {
                icon: "📚",
                title: "Organize Knowledge",
                text: "Structure important information beautifully",
              },
              {
                icon: "🚀",
                title: "Boost Productivity",
                text: "Turn thoughts into actionable execution",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl"
              >
                <div className="text-3xl">{item.icon}</div>

                <h4 className="mt-3 text-lg font-bold text-white">
                  {item.title}
                </h4>

                <p className="mt-2 text-sm text-zinc-400">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Notes Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-2xl shadow-xl">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Notes Workspace
          </p>

          <h3 className="mt-2 text-2xl font-black text-white">
            Premium Notes Collection
          </h3>

          <p className="mt-2 text-zinc-400">
            Organized knowledge cards with advanced workspace actions.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-200">
              Total
            </p>

            <p className="mt-1 text-xl font-black text-white">
              {notes.length}
            </p>
          </div>

          <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-rose-200">
              Pinned
            </p>

            <p className="mt-1 text-xl font-black text-white">
              {notes.filter((note) => note.pinned).length}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">
              Active
            </p>

            <p className="mt-1 text-xl font-black text-white">
              {
                notes.filter(
                  (note) => !note.archived
                ).length
              }
            </p>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-5">
        {notes.map((note, index) => (
          <div
            key={note.id}
            className="animate-[fadeInUp_0.5s_ease_forwards]"
            style={{
              animationDelay: `${index * 80}ms`,
              opacity: 0,
            }}
          >
            <NoteItem
              note={note}
              onDelete={onDelete}
              onUpdate={onUpdate}
              onPin={onPin}
              onArchive={onArchive}
            />
          </div>
        ))}
      </div>
    </div>
  );
}