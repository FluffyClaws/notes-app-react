import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeNote, unarchiveNote, editNote } from "../store/notesSlice";

interface Note {
  id: number;
  createdAt: string;
  content: string;
  category: string;
  dates: string[];
  archived: boolean;
}

interface ArchivedTableProps {
  notes: Note[];
}

const NoNotesRow: React.FC = () => (
  <tr>
    <td colSpan={5} className="table-secondary">
      <h2 className="col-content">There are no archived notes yet.</h2>
    </td>
  </tr>
);

const ArchivedTable: React.FC<ArchivedTableProps> = ({ notes }) => {
  const dispatch = useDispatch();
  const [editedNoteId, setEditedNoteId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState("");

  const handleUnarchiveNote = (noteId: number) => {
    dispatch(unarchiveNote(noteId));
  };

  const handleRemoveNote = (noteId: number) => {
    dispatch(removeNote(noteId));
  };

  const handleEditNote = (noteId: number, content: string) => {
    setEditedNoteId(noteId);
    setEditedContent(content);
  };

  const handleSaveNote = () => {
    if (editedNoteId !== null) {
      const updatedNote = {
        id: editedNoteId,
        createdAt:
          notes.find((note) => note.id === editedNoteId)?.createdAt || "",
        content: editedContent,
        category:
          notes.find((note) => note.id === editedNoteId)?.category || "",
        dates: notes.find((note) => note.id === editedNoteId)?.dates || [],
        archived: false,
      };
      dispatch(editNote(updatedNote));
      setEditedNoteId(null);
      setEditedContent("");
    }
  };

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
            notes.map((note) => (
              <tr key={note.id}>
                <td className="col-content table-secondary">
                  {note.createdAt}
                </td>
                <td className="table-secondary">
                  {editedNoteId === note.id ? (
                    <input
                      type="text"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    />
                  ) : (
                    note.content
                  )}
                </td>
                <td className="col-content table-secondary">{note.category}</td>
                <td className="col-content table-secondary">
                  {note.dates.join(", ")}
                </td>
                <td className="col-content table-secondary actions-cell">
                  {editedNoteId === note.id ? (
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ArchivedTable;
