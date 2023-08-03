import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../store/notesSlice";
import { formatDate } from "../utils/dateUtils";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Note } from "../store/types";
import { extractDatesFromContent } from "../utils/noteUtils";
import { validateFields } from "../utils/formUtils";

const NoteForm: React.FC = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<{ content: string; category: string }>({
    content: "",
    category: "",
  });

  const handleAddNote = () => {
    const newErrors = validateFields(content, category);
    if (newErrors.content || newErrors.category) {
      setErrors(newErrors);
      return;
    }

    const dates = extractDatesFromContent(content);

    const newNote: Note = {
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

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setContent(inputValue);
  };

  const hasExceededLimit = content.length > 106;

  return (
    <div className="form-container">
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="content-tooltip">{errors.content}</Tooltip>}
        show={!!errors.content}
      >
        <input
          type="text"
          className={`form-input form-control ${
            errors.content && "is-invalid"
          }`}
          placeholder="Note Content"
          value={content}
          onChange={handleContentChange}
        />
      </OverlayTrigger>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="category-tooltip">{errors.category}</Tooltip>}
        show={!!errors.category}
      >
        <select
          className={`form-control ${errors.category && "is-invalid"}`}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Task">Task</option>
          <option value="Random Thought">Random Thought</option>
          <option value="Idea">Idea</option>
        </select>
      </OverlayTrigger>
      {hasExceededLimit && (
        <span className="text-danger">Character limit exceeded</span>
      )}
      <button
        className="btn btn-primary"
        onClick={handleAddNote}
        disabled={hasExceededLimit}
      >
        Add Note
      </button>
    </div>
  );
};

export default NoteForm;
