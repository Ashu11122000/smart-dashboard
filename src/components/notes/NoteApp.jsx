import { useEffect, useState } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

export default function NotesApp() {
    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem("notes");
        return saved ? JSON.parse(saved) : [];
    });

    const [search, setSearch] = useState("");

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    function addNote(note) {
        setNotes((prev) => [note, ...prev]);
    }

    function deleteNote(id) {
        setNotes((prev) => prev.filter((note) => note.id !== id));
    }

    const filteredNotes = notes.filter(
        (note) =>
            note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <NoteForm onAdd={addNote} />

            <input
                type="text"
                placeholder="Search notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border p-2 rounded"
            />

            <NoteList
                notes={filteredNotes}
                onDelete={deleteNote}
            />
        </div>
    );
}