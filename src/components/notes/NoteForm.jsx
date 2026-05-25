import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../common/Button";

const CATEGORY_OPTIONS = [
  "General",
  "Work",
  "Ideas",
  "Personal",
  "Study",
  "Finance",
  "Creative",
];

const PRIORITY_OPTIONS = [
  "Low",
  "Medium",
  "High",
  "Urgent",
];

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

export default function NoteForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [priority, setPriority] = useState("Medium");
  const [tags, setTags] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const titleLimit = 80;
  const contentLimit = 800;

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
        title: title.trim(),
        content: content.trim(),
        category,
        priority,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });

      setTitle("");
      setContent("");
      setCategory("General");
      setPriority("Medium");
      setTags("");
      setIsSaving(false);
    }, 500);
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950/90 via-neutral-900/80 to-stone-950/90 p-6 shadow-2xl backdrop-blur-2xl">

      {/* Ambient Glow */}
      <div className="absolute -top-12 -left-12 h-44 w-44 rounded-full bg-amber-500/10 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-12 -right-12 h-44 w-44 rounded-full bg-rose-500/10 blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl"></div>

      <div className="relative z-10 space-y-6">

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between gap-5">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
              Knowledge Capture
            </p>

            <h3 className="mt-3 text-2xl md:text-3xl font-black bg-gradient-to-r from-white via-amber-200 to-rose-300 bg-clip-text text-transparent">
              Create Premium Note
            </h3>

            <p className="mt-3 text-zinc-300">
              Capture ideas, strategies, learnings, and insights beautifully.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div
              className={`
                rounded-2xl
                border
                px-4
                py-3
                text-sm
                font-semibold
                backdrop-blur-xl
                ${categoryStyles[category]}
              `}
            >
              {category}
            </div>

            <div
              className={`
                rounded-2xl
                border
                px-4
                py-3
                text-sm
                font-semibold
                backdrop-blur-xl
                ${priorityStyles[priority]}
              `}
            >
              {priority}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <div className="mb-3 flex justify-between">
              <label className="text-sm font-medium text-zinc-300">
                Note Title
              </label>

              <span className="text-xs text-zinc-500">
                {title.length}/{titleLimit}
              </span>
            </div>

            <input
              type="text"
              placeholder="Enter note title..."
              value={title}
              maxLength={titleLimit}
              onChange={(e) => setTitle(e.target.value)}
              className="
                w-full
                rounded-2xl
                border border-white/10
                bg-white/10
                px-5
                py-4
                text-white
                placeholder:text-zinc-500
                outline-none
                transition-all
                duration-300
                focus:border-amber-400/30
                focus:ring-2
                focus:ring-amber-400/20
              "
            />
          </div>

          {/* Content */}
          <div>
            <div className="mb-3 flex justify-between">
              <label className="text-sm font-medium text-zinc-300">
                Note Content
              </label>

              <span className="text-xs text-zinc-500">
                {content.length}/{contentLimit}
              </span>
            </div>

            <textarea
              placeholder="Write your thoughts, ideas, learnings..."
              value={content}
              maxLength={contentLimit}
              onChange={(e) => setContent(e.target.value)}
              rows="8"
              className="
                w-full
                resize-none
                rounded-2xl
                border border-white/10
                bg-white/10
                px-5
                py-4
                text-white
                placeholder:text-zinc-500
                outline-none
                transition-all
                duration-300
                focus:border-amber-400/30
                focus:ring-2
                focus:ring-amber-400/20
              "
            />
          </div>

          {/* Controls */}
          <div className="grid md:grid-cols-3 gap-4">

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="
                  w-full
                  rounded-2xl
                  border border-white/10
                  bg-zinc-900
                  px-4
                  py-4
                  text-white
                  outline-none
                "
              >
                {CATEGORY_OPTIONS.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Priority
              </label>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="
                  w-full
                  rounded-2xl
                  border border-white/10
                  bg-zinc-900
                  px-4
                  py-4
                  text-white
                  outline-none
                "
              >
                {PRIORITY_OPTIONS.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Tags
              </label>

              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="react, ui, idea"
                className="
                  w-full
                  rounded-2xl
                  border border-white/10
                  bg-white/10
                  px-4
                  py-4
                  text-white
                  placeholder:text-zinc-500
                  outline-none
                "
              />
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            loading={isSaving}
            className="
              w-full
              rounded-2xl
              bg-gradient-to-r
              from-amber-500
              via-orange-500
              to-rose-500
              py-4
              font-bold
              shadow-xl
            "
          >
            Create Premium Note
          </Button>
        </form>
      </div>
    </div>
  );
}