import React, { useState } from "react";
import { ArchivedTableProps, Note } from "../store/types";
import { useTableHelpers } from "../utils/tableHelpers";

const NoNotesRow: React.FC = () => (
  <tr>
    <td colSpan={5} className="table-secondary">
      <h2 className="col-content">There are no archived notes yet.</h2>
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
      <table className="table">
        <thead>
          <tr className="table-primary">
            <th className="col-header">Time of Creation</th>
            <th className="col-header">Note Content</th>
            <th className="col-header">Note Category</th>
            <th className="col-header">Dates Mentioned (DD/MM/YYYY)</th>
            <th className="col-header actions-cell">Actions</th>
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
                  <td className="col-content table-secondary">
                    {note.createdAt}
                  </td>
                  <td className="table-secondary">
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
                      />
                    ) : (
                      note.content
                    )}
                  </td>
                  <td className="col-content table-secondary">
                    {note.category}
                  </td>
                  <td className="col-content table-secondary">
                    {note.dates.join(", ")}
                  </td>
                  <td className="col-content table-secondary actions-cell">
                    {isEdited ? (
                      <button
                        className="btn btn-primary"
                        onClick={handleSaveNote}
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEditNote(note.id, note.content)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleUnarchiveNote(note.id)}
                        >
                          Unarchive
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleRemoveNote(note.id)}
                        >
                          Remove
                        </button>
                      </>
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