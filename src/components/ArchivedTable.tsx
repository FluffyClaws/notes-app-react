import React from "react";
import { useDispatch } from "react-redux";
import { unarchiveNote } from "../store/notesSlice";

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

const ArchivedTable: React.FC<ArchivedTableProps> = ({ notes }) => {
  const dispatch = useDispatch();

  const handleUnarchiveNote = (noteId: number) => {
    dispatch(unarchiveNote(noteId));
  };

  if (notes.length === 0) {
    return <p>There are no archived notes yet.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Time of Creation</th>
          <th>Note Content</th>
          <th>Note Category</th>
          <th>Dates Mentioned</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {notes.map((note) => (
          <tr key={note.id}>
            <td>{note.createdAt}</td>
            <td>{note.content}</td>
            <td>{note.category}</td>
            <td>{note.dates.join(", ")}</td>
            <td>
              <button onClick={() => handleUnarchiveNote(note.id)}>
                Unarchive
              </button>
              <button onClick={() => console.log("Edit clicked")}>Edit</button>
              <button onClick={() => console.log("Remove clicked")}>
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ArchivedTable;
