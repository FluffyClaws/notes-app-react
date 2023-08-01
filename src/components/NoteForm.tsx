import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../store/notesSlice";

const NoteForm: React.FC = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Task");

  const extractDatesFromContent = (text: string) => {
    const dateRegex = /(\d{1,2}[\/.]\d{1,2}[\/.]\d{4})/g; // Matches dates in the format dd/mm/yyyy or dd.mm.yyyy
    const datesFound = text.match(dateRegex);
    return datesFound ? datesFound.map((date) => date.replace(/\./g, "/")) : [];
  };

  const handleAddNote = () => {
    const dates = extractDatesFromContent(content);

    const newNote = {
      id: Date.now(), // Just a temporary way to generate unique IDs. You should use a better approach in a real app.
      createdAt: new Date().toLocaleString("en-GB"), // Store the actual date and time of note creation
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
