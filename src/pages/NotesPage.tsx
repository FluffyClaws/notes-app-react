import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import NoteForm from "../components/NoteForm";
import NoteTable from "../components/NoteTable";
import ArchivedTable from "../components/ArchivedTable";
import SummaryTable from "../components/SummaryTable";

const NotesPage: React.FC = () => {
  const [showSummary, setShowSummary] = useState(false);
  const [showArchivedTable, setShowArchivedTable] = useState(false);

  const notes = useSelector((state: RootState) => state.notes);
  const activeNotes = notes.filter((note) => !note.archived);
  const archivedNotes = notes.filter((note) => note.archived);

  const handleViewArchivedNotes = () => {
    setShowArchivedTable(true);
  };

  const handleViewActiveNotes = () => {
    setShowArchivedTable(false);
  };

  const toggleSummaryVisibility = () => {
    setShowSummary((prevState) => !prevState);
  };

  return (
    <div>
      <NoteForm />
      <div>
        <button onClick={handleViewActiveNotes}>View Active Notes</button>
        <button onClick={handleViewArchivedNotes}>View Archived Notes</button>
      </div>
      {showArchivedTable ? (
        <>
          <h2>Archived Notes</h2>
          <ArchivedTable notes={archivedNotes} />
        </>
      ) : (
        <>
          <h2>Active Notes</h2>
          <NoteTable notes={activeNotes} />
        </>
      )}
      <div>
        <button onClick={toggleSummaryVisibility}>
          {showSummary ? "Hide Summary" : "Show Summary"}
        </button>
      </div>
      {showSummary && <SummaryTable />}
    </div>
  );
};

export default NotesPage;
