import Button from "../common/Button";

export default function NoteItem({ note, onDelete }) {
    return (
        <div className="border rounded-xl p-4 bg-white shadow hover:shadow-lg transition">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                <div>
                    <h3 className="font-bold text-lg text-gray-800">
                        {note.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                        {note.category}
                    </p>
                </div>

                <Button
                    onClick={() => onDelete(note.id)}
                    className="bg-red-500 hover:bg-red-600 w-full sm:w-auto"
                >
                    Delete
                </Button>
            </div>

            <p className="mt-4 text-gray-700 break-words">
                {note.content}
            </p>
        </div>
    );
}