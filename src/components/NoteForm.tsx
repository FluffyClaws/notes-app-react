import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../store/notesSlice";
import { formatDate } from "../utils/dateUtils";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export const extractDatesFromContent = (text: string) => {
  const dateRegex = /(\d{1,2}[/.]\d{1,2}[/.]\d{4})/g;
  const datesFound = text.match(dateRegex);
  return datesFound ? datesFound.map((date) => date.replace(/\./g, "/")) : [];
};

const NoteForm: React.FC = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [contentError, setContentError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const handleAddNote = () => {
    if (!content) {
      setContentError("Please fill out this field");
    } else {
      setContentError("");
    }

    if (!category) {
      setCategoryError("Please select a category");
    } else {
      setCategoryError("");
    }

    if (!content || !category) {
      // Show an error message and prevent the note from being added
      return;
    }

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
    setCategory("");
  };

  return (
    <div className="form-container">
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="content-tooltip">{contentError}</Tooltip>}
        show={!!contentError}
      >
        <input
          type="text"
          className={`form-input form-control ${contentError && "is-invalid"}`}
          placeholder="Note Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </OverlayTrigger>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="category-tooltip">{categoryError}</Tooltip>}
        show={!!categoryError}
      >
        <select
          className={`form-control ${categoryError && "is-invalid"}`}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Task">Task</option>
          <option value="Random Thought">Random Thought</option>
          <option value="Idea">Idea</option>
        </select>
      </OverlayTrigger>
      <button className="btn btn-primary" onClick={handleAddNote}>
        Add Note
      </button>
    </div>
  );
};

export default NoteForm;
