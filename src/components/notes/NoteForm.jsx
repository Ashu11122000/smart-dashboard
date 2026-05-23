import { useState } from "react";
import Button from "../common/Button";

export default function NoteForm({ onAdd }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("General");

    function handleSubmit(e) {
        e.preventDefault();

        if (!title.trim() || !content.trim()) return;

        onAdd({
            id: Date.now(),
            title,
            content,
            category,
        });

        setTitle("");
        setContent("");
        setCategory("General");
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />

            <textarea
                placeholder="Write note..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="4"
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            >
                <option>General</option>
                <option>Work</option>
                <option>Ideas</option>
                <option>Personal</option>
            </select>

            <Button
                type="submit"
                className="bg-blue-500 w-full"
            >
                Add Note
            </Button>
        </form>
    );
}