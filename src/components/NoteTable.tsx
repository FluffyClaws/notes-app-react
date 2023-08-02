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
    <table>
      <thead>
        <tr>
          <th>Time of Creation</th>
          <th>Note Content</th>
          <th>Note Category</th>
          <th>Dates Mentioned</th>
          {!isSummary && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {notes.map((note) => (
          <tr key={note.id}>
            <td>{formatDate(note.createdAt)}</td>
            <td>
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
            <td>{note.category}</td>
            <td>
              <DateList dates={note.dates} />
            </td>
            {!isSummary && (
              <td>
                {editedNoteId === note.id ? (
                  <button onClick={handleSaveNote}>Save</button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditNote(note.id, note.content)}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleArchiveNote(note.id)}>
                      Archive
                    </button>
                    <button onClick={() => handleRemoveNote(note.id)}>
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
  );
};

export default NoteTable;
