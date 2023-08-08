import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../store/notesSlice";
import { formatDate } from "../utils/dateUtils";
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
  const [displayContentError, setDisplayContentError] = useState(false);
  const [displayCategoryError, setDisplayCategoryError] = useState(false);

  const handleAddNote = () => {
    const newErrors = validateFields(content, category);
    if (newErrors.content || newErrors.category) {
      setErrors(newErrors);
      setDisplayContentError(!!newErrors.content);
      setDisplayCategoryError(!!newErrors.category);
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
    setDisplayContentError(false);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryValue = e.target.value;
    setCategory(categoryValue);
    setDisplayCategoryError(false);
  };

  const hasExceededLimit = content.length > 106;

  return (
    <div className="form-container flex gap-3 items-baseline">
      <div className="relative">
        <input
          type="text"
          className={`form-input border border-gray-300 w-80 ${
            (displayContentError || hasExceededLimit) && "border-red-500"
          }`}
          placeholder="Note Content"
          value={content}
          onChange={handleContentChange}
        />
        {(displayContentError || hasExceededLimit) && (
          <div className="absolute left-0 bottom-full tooltip">
            {displayContentError ? errors.content : "Character limit exceeded"}
          </div>
        )}
      </div>

      <div className="relative">
        <select
          className={`form-select border border-gray-300 ${
            displayCategoryError && "border-red-500"
          }`}
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          <option value="Task">Task</option>
          <option value="Random Thought">Random Thought</option>
          <option value="Idea">Idea</option>
        </select>
        {displayCategoryError && (
          <div className="text-red-500 absolute left-0 bottom-full ml-1 mt-1 tooltip">
            {errors.category}
          </div>
        )}
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
        onClick={handleAddNote}
        disabled={hasExceededLimit && !category}
      >
        Add Note
      </button>
    </div>
  );
};

export default NoteForm;
