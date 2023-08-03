import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DateList from "./DateList";
import { archiveNote, removeNote, editNote } from "../store/notesSlice";
import { formatDate } from "../utils/dateUtils";
import { NoteTableProps } from "../store/types";
import { extractDatesFromContent } from "../utils/noteUtils";

const NoNotesRow: React.FC = () => (
  <tr>
    <td colSpan={5} className="table-secondary">
      <h2 className="col-content">There are no notes yet</h2>
    </td>
  </tr>
);

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

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr className="table-primary">
            <th className="col-header">Time of Creation</th>
            <th className="col-header">Note Content</th>
            <th className="col-header">Note Category</th>
            <th className="col-header">Dates Mentioned (DD/MM/YYYY)</th>
            {!isSummary && <th className="col-header actions-cell">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {notes.length === 0 ? (
            <NoNotesRow />
          ) : (
            notes.map((note) => (
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
                <td className="col-content table-secondary ">
                  <DateList dates={note.dates} />
                </td>
                {!isSummary && (
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NoteTable;
