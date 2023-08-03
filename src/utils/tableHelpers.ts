import { useDispatch } from "react-redux";
import { unarchiveNote, removeNote, editNote } from "../store/notesSlice";
import { Note } from "../store/types";

export const useTableHelpers = (
  notes: Note[],
  editedNote: Note | null,
  setEditedNote: React.Dispatch<React.SetStateAction<Note | null>>,
) => {
  const dispatch = useDispatch();

  const handleUnarchiveNote = (noteId: number) => {
    dispatch(unarchiveNote(noteId));
  };

  const handleRemoveNote = (noteId: number) => {
    dispatch(removeNote(noteId));
  };

  const handleEditNote = (noteId: number, content: string) => {
    setEditedNote({
      ...notes.find((note) => note.id === noteId)!,
      content: content,
    });
  };

  const handleSaveNote = () => {
    if (editedNote) {
      const updatedNote = {
        ...editedNote,
        archived: false,
      };
      dispatch(editNote(updatedNote));
      setEditedNote(null);
    }
  };

  return {
    handleUnarchiveNote,
    handleRemoveNote,
    handleEditNote,
    handleSaveNote,
  };
};

export const calculateCountsByCategory = (notes: Note[]) => {
  return notes.reduce(
    (counts, note) => {
      if (note.archived) {
        counts.archived[note.category] =
          (counts.archived[note.category] || 0) + 1;
      } else {
        counts.active[note.category] = (counts.active[note.category] || 0) + 1;
      }
      return counts;
    },
    { active: {}, archived: {} } as {
      active: Record<string, number>;
      archived: Record<string, number>;
    },
  );
};

export const hasNoActiveNotes = (countsByCategory: {
  active: Record<string, number>;
}) => {
  return Object.values(countsByCategory.active).every((count) => count === 0);
};

export const hasNoArchivedNotes = (countsByCategory: {
  archived: Record<string, number>;
}) => {
  return Object.values(countsByCategory.archived).every((count) => count === 0);
};
