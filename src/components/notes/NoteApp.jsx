import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

export default function NotesApp() {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem("notes");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNote(note) {
    setNotes((prev) => [
      {
        ...note,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);

    toast.success("Note added successfully!");
  }

  function deleteNote(id) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    toast.error("Note deleted");
  }

  const filteredNotes = useMemo(() => {
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase()),
    );
  }, [notes, search]);

  const totalNotes = notes.length;
  const filteredCount = filteredNotes.length;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-blue-400/10 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-6 md:p-8 shadow-2xl backdrop-blur-2xl">
      {/* Ambient Glow */}
      <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-blue-500/15 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-violet-500/15 blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-3xl"></div>

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between gap-5">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-blue-100/50">
              Smart Workspace
            </p>

            <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white via-blue-200 to-amber-300 bg-clip-text text-transparent">
              Premium Notes Manager
            </h2>

            <p className="mt-2 text-sm text-blue-100/60">
              Organize ideas, tasks, and thoughts in one premium workspace
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-blue-400/10 bg-white/5 px-5 py-4 backdrop-blur-xl shadow-lg">
              <p className="text-xs uppercase tracking-wider text-blue-100/50">
                Total Notes
              </p>
              <p className="mt-2 text-2xl font-bold text-blue-400">
                {totalNotes}
              </p>
            </div>

            <div className="rounded-2xl border border-blue-400/10 bg-white/5 px-5 py-4 backdrop-blur-xl shadow-lg">
              <p className="text-xs uppercase tracking-wider text-blue-100/50">
                Search Results
              </p>
              <p className="mt-2 text-2xl font-bold text-amber-400">
                {filteredCount}
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search notes, thoughts, ideas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              rounded-2xl
              border
              border-blue-400/10
              bg-white/5
              px-5
              py-4
              text-white
              placeholder:text-blue-100/40
              backdrop-blur-xl
              outline-none
              transition-all
              duration-300
              focus:border-amber-400/40
              focus:ring-2
              focus:ring-amber-400/20
            "
          />
        </div>

        {/* Note Form */}
        <div className="rounded-3xl border border-blue-400/10 bg-white/5 p-5 backdrop-blur-xl shadow-xl">
          <NoteForm onAdd={addNote} />
        </div>

        {/* Notes List */}
        <div className="rounded-3xl border border-blue-400/10 bg-white/5 p-5 backdrop-blur-xl shadow-xl">
          {filteredNotes.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10 border border-blue-400/10">
                <span className="text-3xl">📝</span>
              </div>

              <h3 className="text-xl font-bold text-white">No notes found</h3>

              <p className="mt-2 text-blue-100/50">
                Start writing something brilliant or adjust your search.
              </p>
            </div>
          ) : (
            <NoteList notes={filteredNotes} onDelete={deleteNote} />
          )}
        </div>
      </div>
    </div>
  );
}
