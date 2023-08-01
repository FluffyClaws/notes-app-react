import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Note {
  id: number;
  createdAt: string;
  content: string;
  category: string;
  dates: string[];
  archived: boolean;
}

const initialNotes: Note[] = [
  // Prepopulated notes
  {
    id: 1,
    createdAt: "2021-07-15",
    content:
      "I'm gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
    category: "Task",
    dates: [""],
    archived: false,
  },
  // Add more prepopulated notes as needed
];

const notesSlice = createSlice({
  name: "notes",
  initialState: initialNotes,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.push(action.payload);
    },
    editNote: (state, action: PayloadAction<Note>) => {
      const { id, content, dates, category } = action.payload;
      const noteToUpdate = state.find((note) => note.id === id);
      if (noteToUpdate) {
        noteToUpdate.content = content;
        noteToUpdate.dates = dates;
        noteToUpdate.category = category;
      }
    },
    archiveNote: (state, action: PayloadAction<number>) => {
      const noteToArchive = state.find((note) => note.id === action.payload);
      if (noteToArchive) {
        noteToArchive.archived = true;
      }
    },
    unarchiveNote: (state, action: PayloadAction<number>) => {
      const noteToUnarchive = state.find((note) => note.id === action.payload);
      if (noteToUnarchive) {
        noteToUnarchive.archived = false;
      }
    },
    removeNote: (state, action: PayloadAction<number>) => {
      const index = state.findIndex((note) => note.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addNote, editNote, archiveNote, unarchiveNote, removeNote } =
  notesSlice.actions;

export default notesSlice.reducer;
