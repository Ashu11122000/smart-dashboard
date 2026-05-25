import NoteItem from "./NoteItem";

export default function NoteList({ notes, onDelete }) {
  if (notes.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-blue-400/10 bg-gradient-to-br from-slate-950/70 via-blue-950/60 to-slate-900/70 p-10 text-center backdrop-blur-2xl shadow-xl">

        {/* Ambient Glows */}
        <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl animate-pulse"></div>

        <div className="relative z-10">
          {/* Premium Empty Icon */}
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-blue-400/10 bg-white/5 backdrop-blur-xl shadow-lg">
            <span className="text-4xl">📝</span>
          </div>

          <h3 className="mt-6 text-2xl font-bold bg-gradient-to-r from-white via-blue-200 to-amber-300 bg-clip-text text-transparent">
            No Notes Found
          </h3>

          <p className="mt-3 text-blue-100/50 max-w-md mx-auto leading-relaxed">
            Your premium workspace is empty right now. Create your first note,
            capture brilliant ideas, and organize your thoughts beautifully.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {notes.map((note, index) => (
        <div
          key={note.id}
          className="animate-[fadeInUp_0.5s_ease_forwards]"
          style={{
            animationDelay: `${index * 100}ms`,
            opacity: 0,
          }}
        >
          <NoteItem
            note={note}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
}