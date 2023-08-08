import React, { useState } from "react";
import { ArchivedTableProps, Note } from "../store/types";
import { useTableHelpers } from "../utils/tableHelpers";

const NoNotesRow: React.FC = () => (
  <tr>
    <td colSpan={5} className="bg-gray-100 p-4 text-center">
      <h2 className="text-2xl font-semibold text-center my-4">
        There are no archived notes yet
      </h2>
    </td>
  </tr>
);

const ArchivedTable: React.FC<ArchivedTableProps> = ({ notes }) => {
  const [editedNote, setEditedNote] = useState<Note | null>(null);

  const {
    handleUnarchiveNote,
    handleRemoveNote,
    handleEditNote,
    handleSaveNote,
  } = useTableHelpers(notes, editedNote, setEditedNote);

  return (
    <div className="table-responsive">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-200">
            <th className="p-3">Time of Creation</th>
            <th className="p-3">Note Content</th>
            <th className="p-3">Note Category</th>
            <th className="p-3">Dates Mentioned (DD/MM/YYYY)</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.length === 0 ? (
            <NoNotesRow />
          ) : (
            notes.map((note) => {
              const isEdited = editedNote && editedNote.id === note.id;

              return (
                <tr key={note.id}>
                  <td className="p-3 border-t border-gray-300">
                    {note.createdAt}
                  </td>
                  <td className="p-3 border-t border-gray-300">
                    {isEdited ? (
                      <input
                        type="text"
                        value={editedNote!.content}
                        onChange={(e) =>
                          setEditedNote({
                            ...editedNote!,
                            content: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 p-1 rounded"
                      />
                    ) : (
                      note.content
                    )}
                  </td>
                  <td className="p-3 border-t border-gray-300 text-center">
                    {note.category}
                  </td>
                  <td className="p-3 border-t border-gray-300 text-center">
                    {note.dates.join(", ")}
                  </td>
                  <td className="p-3 border-t border-gray-300 flex justify-center">
                    {isEdited ? (
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                        onClick={handleSaveNote}
                      >
                        Save
                      </button>
                    ) : (
                      <div className="flex justify-center">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1"
                          onClick={() => handleEditNote(note.id, note.content)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1"
                          onClick={() => handleUnarchiveNote(note.id)}
                        >
                          Unarchive
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                          onClick={() => handleRemoveNote(note.id)}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ArchivedTable;
