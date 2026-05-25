import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import useDebounce from "../../hooks/useDebounce";

const QUICK_SUGGESTIONS = [
  "React components",
  "Tailwind dashboard",
  "Weather API",
  "Productivity tools",
  "Frontend roadmap",
  "JavaScript hooks",
];

const CATEGORY_TAGS = [
  "All",
  "Products",
  "Courses",
  "Articles",
  "Tools",
];

function getSearchInsight(queryLength) {
  if (queryLength >= 15) {
    return "Deep search mode activated 🔎";
  }

  if (queryLength >= 8) {
    return "Refining intelligent search ✨";
  }

  return "Quick discovery mode ⚡";
}

export default function DebouncedSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchHistory, setSearchHistory] = useState([]);

  const debouncedQuery = useDebounce(searchQuery, 500);

  function handleInputChange(event) {
    setSearchQuery(event.target.value);
  }

  function clearSearch() {
    setSearchQuery("");
  }

  function handleQuickSearch(query) {
    setSearchQuery(query);

    setSearchHistory((prev) => {
      const updated = [
        query,
        ...prev.filter(
          (item) =>
            item.toLowerCase() !== query.toLowerCase()
        ),
      ];

      return updated.slice(0, 6);
    });

    toast.success("Search query updated");
  }

  const searchResult = useMemo(() => {
    if (debouncedQuery.trim() === "") return "";

    return `Searching "${debouncedQuery}" in ${selectedCategory}`;
  }, [debouncedQuery, selectedCategory]);

  const searchInsight = useMemo(() => {
    if (!debouncedQuery.trim()) return "";

    return getSearchInsight(debouncedQuery.length);
  }, [debouncedQuery]);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-neutral-900 to-stone-950 p-6 shadow-2xl backdrop-blur-2xl">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">
          Intelligent Search
        </p>

        <h2 className="mt-3 text-3xl md:text-4xl font-black bg-gradient-to-r from-white via-amber-200 to-rose-300 bg-clip-text text-transparent">
          Debounced Discovery Engine
        </h2>

        <p className="mt-3 text-zinc-300">
          Smart search experience with premium interaction,
          debounce intelligence, category filtering, and quick
          discovery shortcuts.
        </p>
      </div>

      {/* Search Console */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-neutral-900 to-stone-950 p-6 shadow-2xl backdrop-blur-2xl">

        {/* Ambient Glow */}
        <div className="absolute -top-12 -left-12 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-rose-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl"></div>

        <div className="relative z-10 space-y-5">

          {/* Search Controls */}
          <div className="grid lg:grid-cols-4 gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search anything..."
              className="
                lg:col-span-3
                rounded-2xl
                border border-white/10
                bg-white/10
                px-5
                py-4
                text-white
                placeholder:text-zinc-500
                outline-none
                transition-all
                focus:border-amber-400/30
                focus:ring-2
                focus:ring-amber-400/20
              "
            />

            <button
              onClick={clearSearch}
              className="
                rounded-2xl
                bg-white/10
                border border-white/10
                text-zinc-200
                font-semibold
                hover:bg-white/20
                transition-all
              "
            >
              Clear Search
            </button>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {CATEGORY_TAGS.map((category) => {
              const isActive =
                selectedCategory === category;

              return (
                <button
                  key={category}
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                  className={`
                    rounded-2xl
                    px-4
                    py-3
                    text-sm
                    font-bold
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? `
                          bg-gradient-to-r
                          from-amber-500
                          via-orange-500
                          to-rose-500
                          text-white
                          shadow-xl
                        `
                        : `
                          bg-white/10
                          border border-white/10
                          text-zinc-300
                          hover:bg-white/20
                        `
                    }
                  `}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Suggestions */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-3">
              Quick Suggestions
            </p>

            <div className="flex flex-wrap gap-3">
              {QUICK_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() =>
                    handleQuickSearch(suggestion)
                  }
                  className="
                    rounded-full
                    border border-white/10
                    bg-white/10
                    px-4
                    py-2
                    text-sm
                    text-zinc-200
                    hover:bg-white/20
                    transition-all
                  "
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Search History */}
          {searchHistory.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-3">
                Recent Searches
              </p>

              <div className="flex flex-wrap gap-3">
                {searchHistory.map((item) => (
                  <button
                    key={item}
                    onClick={() =>
                      handleQuickSearch(item)
                    }
                    className="
                      rounded-full
                      border border-white/10
                      bg-black/20
                      px-4
                      py-2
                      text-sm
                      text-zinc-300
                      hover:bg-white/10
                    "
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {searchResult && (
            <div className="grid md:grid-cols-2 gap-4">

              <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-5 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-200">
                  Search Result
                </p>

                <p className="mt-3 text-lg font-bold text-white">
                  {searchResult}
                </p>
              </div>

              <div className="rounded-3xl border border-amber-400/20 bg-amber-500/10 p-5 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.25em] text-amber-200">
                  Search Intelligence
                </p>

                <p className="mt-3 text-lg font-bold text-white">
                  {searchInsight}
                </p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!searchQuery.trim() && (
            <div className="rounded-3xl border border-white/10 bg-white/10 p-12 text-center backdrop-blur-2xl">
              <div className="text-7xl animate-pulse">
                🔎
              </div>

              <h3 className="mt-5 text-3xl font-black bg-gradient-to-r from-white via-amber-200 to-rose-300 bg-clip-text text-transparent">
                Intelligent Search Ready
              </h3>

              <p className="mt-3 text-zinc-300 text-lg">
                Type anything to activate premium debounced
                search intelligence.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}