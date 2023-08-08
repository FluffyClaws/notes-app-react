import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DateList from "./DateList";
import { archiveNote, removeNote, editNote } from "../store/notesSlice";
import { formatDate } from "../utils/dateUtils";
import { NoteTableProps } from "../store/types";
import { extractDatesFromContent } from "../utils/noteUtils";

const NoNotesRow: React.FC = () => (
  <tr>
    <td colSpan={5} className="bg-gray-100 p-4 text-center">
      <h2 className="text-2xl font-semibold text-center my-4">
        There are no notes yet
      </h2>
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
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-200">
            <th className="p-3">Time of Creation</th>
            <th className="p-3">Note Content</th>
            <th className="p-3 ">Note Category</th>
            <th className="p-3 ">Dates Mentioned (DD/MM/YYYY)</th>
            {!isSummary && <th className="p-3">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {notes.length === 0 ? (
            <NoNotesRow />
          ) : (
            notes.map((note) => (
              <tr key={note.id}>
                <td className="p-3 border-t border-gray-300">
                  {formatDate(note.createdAt)}
                </td>
                <td className="p-3 border-t border-gray-300">
                  {editedNoteId === note.id ? (
                    <input
                      type="text"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
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
                  <DateList dates={note.dates} />
                </td>
                {!isSummary && (
                  <td className="p-3 border-t border-gray-300 flex justify-center">
                    {editedNoteId === note.id ? (
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
                          onClick={() => handleArchiveNote(note.id)}
                        >
                          Archive
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
