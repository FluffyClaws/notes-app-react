import { combineReducers } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice";

const rootReducer = combineReducers({
  notes: notesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
