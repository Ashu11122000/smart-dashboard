import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../common/Button";

export default function NoteForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [isSaving, setIsSaving] = useState(false);

  const titleLimit = 60;
  const contentLimit = 300;

  const categoryStyles = {
    General: "text-blue-300 bg-blue-500/10 border-blue-400/20",
    Work: "text-amber-300 bg-amber-500/10 border-amber-400/20",
    Ideas: "text-violet-300 bg-violet-500/10 border-violet-400/20",
    Personal: "text-rose-300 bg-rose-500/10 border-rose-400/20",
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!content.trim()) {
      toast.error("Content is required");
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      onAdd({
        id: Date.now(),
        title,
        content,
        category,
        createdAt: new Date().toISOString(),
      });

      setTitle("");
      setContent("");
      setCategory("General");
      setIsSaving(false);
    }, 700);
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-blue-400/10 bg-gradient-to-br from-slate-950/80 via-blue-950/70 to-slate-900/80 p-6 shadow-2xl backdrop-blur-2xl">

      {/* Ambient Glow */}
      <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl animate-pulse"></div>

      <div className="relative z-10 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-blue-100/50">
              Note Workspace
            </p>

            <h3 className="text-2xl font-black bg-gradient-to-r from-white via-blue-200 to-amber-300 bg-clip-text text-transparent">
              Create Premium Note
            </h3>

            <p className="mt-2 text-sm text-blue-100/60">
              Capture ideas, tasks, and important thoughts beautifully
            </p>
          </div>

          <div
            className={`
              rounded-2xl
              border
              px-4
              py-3
              backdrop-blur-xl
              text-sm
              font-semibold
              ${categoryStyles[category]}
            `}
          >
            {category}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <div className="mb-2 flex justify-between">
              <label className="text-sm font-medium text-blue-100/70">
                Note Title
              </label>

              <span className="text-xs text-blue-100/40">
                {title.length}/{titleLimit}
              </span>
            </div>

            <input
              type="text"
              placeholder="Enter premium note title..."
              value={title}
              maxLength={titleLimit}
              onChange={(e) => setTitle(e.target.value)}
              className="
                w-full
                rounded-2xl
                border
                border-blue-400/10
                bg-white/5
                px-4
                py-3
                text-white
                placeholder:text-blue-100/35
                outline-none
                transition-all
                duration-300
                focus:border-amber-400/40
                focus:ring-2
                focus:ring-amber-400/20
              "
            />
          </div>

          {/* Content */}
          <div>
            <div className="mb-2 flex justify-between">
              <label className="text-sm font-medium text-blue-100/70">
                Note Content
              </label>

              <span className="text-xs text-blue-100/40">
                {content.length}/{contentLimit}
              </span>
            </div>

            <textarea
              placeholder="Write your thoughts here..."
              value={content}
              maxLength={contentLimit}
              onChange={(e) => setContent(e.target.value)}
              rows="6"
              className="
                w-full
                resize-none
                rounded-2xl
                border
                border-blue-400/10
                bg-white/5
                px-4
                py-3
                text-white
                placeholder:text-blue-100/35
                outline-none
                transition-all
                duration-300
                focus:border-amber-400/40
                focus:ring-2
                focus:ring-amber-400/20
              "
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-medium text-blue-100/70">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="
                w-full
                rounded-2xl
                border
                border-blue-400/10
                bg-slate-900
                px-4
                py-3
                text-white
                outline-none
                transition-all
                duration-300
                focus:border-violet-400/40
                focus:ring-2
                focus:ring-violet-400/20
              "
            >
              <option>General</option>
              <option>Work</option>
              <option>Ideas</option>
              <option>Personal</option>
            </select>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            loading={isSaving}
            className="
              w-full
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              via-violet-600
              to-amber-500
              py-4
              font-bold
            "
          >
            Add Premium Note
          </Button>
        </form>
      </div>
    </div>
  );
}