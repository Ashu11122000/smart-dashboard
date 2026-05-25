import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

const STORAGE_KEY = "premium-notes-workspace";

function getWorkspaceInsight(total, pinned, archived) {
  if (total === 0) return "Your knowledge workspace is ready ✨";
  if (pinned >= 3) return "Strong focus system with pinned priorities 🔥";
  if (archived >= 5) return "Excellent archival discipline 📚";
  if (total >= 10) return "Your knowledge base is expanding rapidly 🚀";
  return "Capture ideas consistently for long-term momentum ⚡";
}

export default function NotesApp() {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  function addNote(note) {
    const newNote = {
      ...note,
      id: Date.now(),
      pinned: false,
      archived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes((prev) => [newNote, ...prev]);
    toast.success("Note created successfully");
  }

  function deleteNote(id) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    toast.error("Note deleted");
  }

  function updateNote(id, updates) {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : note
      )
    );

    toast.success("Note updated");
  }

  function togglePin(id) {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              pinned: !note.pinned,
              updatedAt: new Date().toISOString(),
            }
          : note
      )
    );
  }

  function toggleArchive(id) {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              archived: !note.archived,
              updatedAt: new Date().toISOString(),
            }
          : note
      )
    );
  }

  function clearArchived() {
    setNotes((prev) => prev.filter((note) => !note.archived));
    toast.info("Archived notes cleared");
  }

  function resetWorkspace() {
    setNotes([]);
    toast.error("Workspace reset");
  }

  const filteredNotes = useMemo(() => {
    let result = [...notes];

    if (filter === "pinned") {
      result = result.filter((note) => note.pinned);
    }

    if (filter === "archived") {
      result = result.filter((note) => note.archived);
    }

    if (filter === "active") {
      result = result.filter((note) => !note.archived);
    }

    if (search.trim()) {
      result = result.filter(
        (note) =>
          note.title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          note.content
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          note.category
            ?.toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    result.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;

      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }

      if (sortBy === "alphabetical") {
        return a.title.localeCompare(b.title);
      }

      return 0;
    });

    return result;
  }, [notes, search, filter, sortBy]);

  const totalNotes = notes.length;
  const pinnedNotes = notes.filter((note) => note.pinned).length;
  const archivedNotes = notes.filter((note) => note.archived).length;
  const activeNotes = notes.filter((note) => !note.archived).length;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-neutral-900 to-stone-950 p-6 md:p-8 shadow-2xl backdrop-blur-2xl">

      {/* Ambient Glow */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-rose-500/10 blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl"></div>

      <div className="relative z-10 space-y-8">

        {/* Header */}
        <div className="flex flex-col xl:flex-row justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">
              Knowledge Workspace
            </p>

            <h2 className="mt-3 text-3xl md:text-5xl font-black bg-gradient-to-r from-white via-amber-200 to-rose-300 bg-clip-text text-transparent">
              Premium Notes Command Center
            </h2>

            <p className="mt-3 text-zinc-300 max-w-3xl">
              {getWorkspaceInsight(
                totalNotes,
                pinnedNotes,
                archivedNotes
              )}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={clearArchived}
              className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-5 py-4 text-rose-200 font-semibold"
            >
              Clear Archived
            </button>

            <button
              onClick={resetWorkspace}
              className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-zinc-200 font-semibold"
            >
              Reset Workspace
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {[
            {
              label: "Total Notes",
              value: totalNotes,
              icon: "📝",
              accent: "text-amber-300 border-amber-400/20",
            },
            {
              label: "Pinned",
              value: pinnedNotes,
              icon: "📌",
              accent: "text-rose-300 border-rose-400/20",
            },
            {
              label: "Active",
              value: activeNotes,
              icon: "⚡",
              accent: "text-emerald-300 border-emerald-400/20",
            },
            {
              label: "Archived",
              value: archivedNotes,
              icon: "📚",
              accent: "text-fuchsia-300 border-fuchsia-400/20",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-3xl border ${stat.accent} bg-white/10 p-5 backdrop-blur-2xl shadow-xl hover:scale-[1.03] transition-all duration-300`}
            >
              <div className="text-3xl">{stat.icon}</div>

              <p className="mt-4 text-xs uppercase tracking-[0.25em] text-zinc-500">
                {stat.label}
              </p>

              <p className="mt-3 text-3xl font-black text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="grid xl:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search notes, ideas, categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="xl:col-span-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white placeholder:text-zinc-500 outline-none focus:border-amber-400/30 focus:ring-2 focus:ring-amber-400/20"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-2xl border border-white/10 bg-zinc-900 px-5 py-4 text-white"
          >
            <option value="all">All Notes</option>
            <option value="active">Active</option>
            <option value="pinned">Pinned</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-2xl border border-white/10 bg-zinc-900 px-5 py-4 text-white"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>

        {/* Form */}
        <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-2xl shadow-2xl">
          <NoteForm onAdd={addNote} />
        </div>

        {/* Notes */}
        <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-2xl shadow-2xl">
          {filteredNotes.length === 0 ? (
            <div className="py-20 text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/10">
                <span className="text-4xl">📝</span>
              </div>

              <h3 className="text-2xl font-black text-white">
                No notes found
              </h3>

              <p className="mt-3 text-zinc-400">
                Start capturing brilliant ideas or adjust your search.
              </p>
            </div>
          ) : (
            <NoteList
              notes={filteredNotes}
              onDelete={deleteNote}
              onUpdate={updateNote}
              onPin={togglePin}
              onArchive={toggleArchive}
            />
          )}
        </div>
      </div>
    </div>
  );
}