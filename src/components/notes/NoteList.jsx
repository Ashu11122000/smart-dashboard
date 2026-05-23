import NoteItem from "./NoteItem";

export default function NoteList({ notes, onDelete }) {
    if (notes.length === 0) {
        return (
            <p className="text-gray-500 text-center">
                No notes found.
            </p>
        );
    }

    return (
        <div className="space-y-3">
            {notes.map((note) => (
                <NoteItem
                    key={note.id}
                    note={note}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}