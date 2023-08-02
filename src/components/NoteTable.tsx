import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DateList from "./DateList";
import { archiveNote, removeNote, editNote } from "../store/notesSlice";
import { extractDatesFromContent } from "./NoteForm";
import { formatDate } from "../utils/dateUtils";

interface NoteTableProps {
  notes: Note[];
  isSummary?: boolean;
}

interface Note {
  id: number;
  createdAt: string;
  content: string;
  category: string;
  dates: string[];
  archived: boolean;
}

const NoteTable: React.FC<NoteTableProps> = ({ notes, isSummary = false }) => {
  const dispatch = useDispatch();
  const [editedNoteId, setEditedNoteId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState("");

  const handleArchiveNote = (noteId: number) => {
    dispatch(archiveNote(noteId));
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
        createdAt: formatDate(new Date().toLocaleString("en-GB")),
        content: editedContent,
        category:
          notes.find((note) => note.id === editedNoteId)?.category || "",
        dates: extractDatesFromContent(editedContent),
        archived: false,
      };
      dispatch(editNote(updatedNote));
      setEditedNoteId(null);
      setEditedContent("");
    }
  };

  if (notes.length === 0) {
    return <p>There are no notes yet.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr className="table-primary">
            <th className="col-header">Time of Creation</th>
            <th className="col-header">Note Content</th>
            <th className="col-header">Note Category</th>
            <th className="col-header">Dates Mentioned (DD/MM/YYYY)</th>
            {!isSummary && <th className="col-header">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td className="col-content table-secondary">
                {formatDate(note.createdAt)}
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
                <DateList dates={note.dates} />
              </td>
              {!isSummary && (
                <td className="col-content table-secondary">
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
                        className="btn btn-secondary"
                        onClick={() => handleEditNote(note.id, note.content)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleArchiveNote(note.id)}
                      >
                        Archive
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
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NoteTable;
