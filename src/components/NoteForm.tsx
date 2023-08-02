import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../store/notesSlice";
import { formatDate } from "../utils/dateUtils";

export const extractDatesFromContent = (text: string) => {
  const dateRegex = /(\d{1,2}[/.]\d{1,2}[/.]\d{4})/g;
  const datesFound = text.match(dateRegex);
  return datesFound ? datesFound.map((date) => date.replace(/\./g, "/")) : [];
};

const NoteForm: React.FC = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Task");

  const handleAddNote = () => {
    const dates = extractDatesFromContent(content);

    const newNote = {
      id: Date.now(),
      createdAt: formatDate(new Date().toLocaleString("en-GB")),
      content,
      category,
      dates,
      archived: false,
    };
    dispatch(addNote(newNote));
    setContent("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Note Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Task">Task</option>
        <option value="Random Thought">Random Thought</option>
        <option value="Idea">Idea</option>
      </select>
      <button onClick={handleAddNote}>Add Note</button>
    </div>
  );
};

export default NoteForm;
