import { useState } from "react";
import Button from "../common/Button";

const categoryStyles = {
  General: "text-zinc-300 bg-zinc-500/10 border-zinc-400/20",
  Work: "text-amber-300 bg-amber-500/10 border-amber-400/20",
  Ideas: "text-fuchsia-300 bg-fuchsia-500/10 border-fuchsia-400/20",
  Personal: "text-rose-300 bg-rose-500/10 border-rose-400/20",
  Study: "text-emerald-300 bg-emerald-500/10 border-emerald-400/20",
  Finance: "text-yellow-300 bg-yellow-500/10 border-yellow-400/20",
  Creative: "text-orange-300 bg-orange-500/10 border-orange-400/20",
};

const priorityStyles = {
  Low: "text-zinc-300 bg-zinc-500/10 border-zinc-400/20",
  Medium: "text-amber-300 bg-amber-500/10 border-amber-400/20",
  High: "text-orange-300 bg-orange-500/10 border-orange-400/20",
  Urgent: "text-rose-300 bg-rose-500/10 border-rose-400/20",
};

export default function NoteItem({
  note,
  onDelete,
  onUpdate,
  onPin,
  onArchive,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);

  const formattedCreatedDate = note.createdAt
    ? new Date(note.createdAt).toLocaleDateString([], {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  const formattedUpdatedDate = note.updatedAt
    ? new Date(note.updatedAt).toLocaleDateString([], {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  function handleSaveEdit() {
    if (!editedTitle.trim() || !editedContent.trim()) return;

    onUpdate(note.id, {
      title: editedTitle.trim(),
      content: editedContent.trim(),
    });

    setIsEditing(false);
  }

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-gradient-to-br
        from-zinc-950
        via-neutral-900
        to-stone-950
        p-6
        backdrop-blur-2xl
        shadow-2xl
        transition-all
        duration-500
        hover:-translate-y-2
      "
    >
      {/* Glow */}
      <div className="absolute -top-12 -left-12 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl opacity-0 transition duration-700 group-hover:opacity-100"></div>
      <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-rose-500/10 blur-3xl opacity-0 transition duration-700 group-hover:opacity-100"></div>

      {/* Shine */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -left-20 top-0 h-full w-14 rotate-12 bg-white/5 blur-md transition-all duration-1000 group-hover:left-full"></div>
      </div>

      <div className="relative z-10 space-y-5">

        {/* Header */}
        <div className="flex flex-col xl:flex-row justify-between gap-5">
          <div className="flex-1 space-y-4">

            <div className="flex flex-wrap items-center gap-3">
              {note.pinned && (
                <span className="rounded-full border border-rose-400/20 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-300">
                  📌 Pinned
                </span>
              )}

              {note.archived && (
                <span className="rounded-full border border-zinc-400/20 bg-zinc-500/10 px-3 py-1 text-xs font-semibold text-zinc-300">
                  📚 Archived
                </span>
              )}

              <span
                className={`
                  rounded-full
                  border
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  ${categoryStyles[note.category]}
                `}
              >
                {note.category}
              </span>

              <span
                className={`
                  rounded-full
                  border
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  ${priorityStyles[note.priority]}
                `}
              >
                {note.priority}
              </span>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <input
                  value={editedTitle}
                  onChange={(e) =>
                    setEditedTitle(e.target.value)
                  }
                  className="
                    w-full
                    rounded-2xl
                    border border-white/10
                    bg-white/10
                    px-4
                    py-3
                    text-white
                    outline-none
                  "
                />

                <textarea
                  rows="6"
                  value={editedContent}
                  onChange={(e) =>
                    setEditedContent(e.target.value)
                  }
                  className="
                    w-full
                    rounded-2xl
                    border border-white/10
                    bg-white/10
                    px-4
                    py-3
                    text-white
                    outline-none
                    resize-none
                  "
                />
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-black text-white break-words">
                  {note.title}
                </h3>

                <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.2em] text-zinc-500">
                  <span>Created: {formattedCreatedDate}</span>

                  {formattedUpdatedDate && (
                    <span>Updated: {formattedUpdatedDate}</span>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => onPin(note.id)}
              className="rounded-2xl bg-rose-500/10 border border-rose-400/20"
            >
              {note.pinned ? "Unpin" : "Pin"}
            </Button>

            <Button
              onClick={() => onArchive(note.id)}
              className="rounded-2xl bg-zinc-500/10 border border-zinc-400/20"
            >
              {note.archived ? "Restore" : "Archive"}
            </Button>

            {isEditing ? (
              <Button
                onClick={handleSaveEdit}
                className="rounded-2xl bg-emerald-500/20 border border-emerald-400/20"
              >
                Save
              </Button>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="rounded-2xl bg-amber-500/10 border border-amber-400/20"
              >
                Edit
              </Button>
            )}

            <Button
              onClick={() => onDelete(note.id)}
              variant="danger"
              className="rounded-2xl px-5"
            >
              Delete
            </Button>
          </div>
        </div>

        {/* Tags */}
        {note.tags?.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-medium text-zinc-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        {!isEditing && (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <p
              className={`
                leading-relaxed
                whitespace-pre-wrap
                break-words
                text-zinc-200
                ${
                  !isExpanded
                    ? "line-clamp-4"
                    : ""
                }
              `}
            >
              {note.content}
            </p>

            {note.content.length > 220 && (
              <button
                onClick={() =>
                  setIsExpanded(!isExpanded)
                }
                className="mt-4 text-sm font-semibold text-amber-300 hover:text-amber-200"
              >
                {isExpanded
                  ? "Show Less"
                  : "Read More"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}