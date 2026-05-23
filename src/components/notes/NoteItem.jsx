import Button from "../common/Button";

export default function NoteItem({ note, onDelete }) {
    return (
        <div className="border rounded p-3 bg-white shadow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold">{note.title}</h3>
                    <p className="text-sm text-gray-500">{note.category}</p>
                </div>

                <Button
                    onClick={() => onDelete(note.id)}
                    className="bg-red-500"
                >
                    Delete
                </Button>
            </div>

            <p className="mt-3 text-gray-700">
                {note.content}
            </p>
        </div>
    );
}