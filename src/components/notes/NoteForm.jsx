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
        <form onSubmit={handleSubmit} className="space-y-3">
            <input
                type="text"
                placeholder="Note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 rounded"
            />

            <textarea
                placeholder="Write note..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border p-2 rounded"
            />

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border p-2 rounded"
            >
                <option>General</option>
                <option>Work</option>
                <option>Ideas</option>
                <option>Personal</option>
            </select>

            <Button className="bg-blue-500 w-full">
                Add Note
            </Button>
        </form>
    );
}