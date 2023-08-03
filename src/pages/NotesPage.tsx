import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import NoteForm from "../components/NoteForm";
import NoteTable from "../components/NoteTable";
import ArchivedTable from "../components/ArchivedTable";
import SummaryTable from "../components/SummaryTable";

const useActiveNotes = () => {
  const notes = useSelector((state: RootState) => state.notes);
  return useMemo(() => notes.filter((note) => !note.archived), [notes]);
};

const useArchivedNotes = () => {
  const notes = useSelector((state: RootState) => state.notes);
  return useMemo(() => notes.filter((note) => note.archived), [notes]);
};

const NotesPage: React.FC = () => {
  const [showSummary, setShowSummary] = useState(false);
  const [showArchivedTable, setShowArchivedTable] = useState(false);

  const activeNotes = useActiveNotes();
  const archivedNotes = useArchivedNotes();

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
    <div className="container">
      {showArchivedTable ? (
        <>
          <h2 className="table-header">Archived Notes</h2>
          <ArchivedTable notes={archivedNotes} />
        </>
      ) : (
        <>
          <h2 className="table-header">Active Notes</h2>
          <NoteTable notes={activeNotes} />
        </>
      )}

      <div className="cntrls-wrapper">
        <NoteForm />
        <div className="btns-wrapper">
          <button className="btn btn-primary" onClick={handleViewActiveNotes}>
            View Active Notes
          </button>
          <button className="btn btn-primary" onClick={handleViewArchivedNotes}>
            View Archived Notes
          </button>
          <button className="btn btn-primary" onClick={toggleSummaryVisibility}>
            {showSummary ? "Hide Summary" : "Show Summary"}
          </button>
        </div>
      </div>
      {showSummary && <SummaryTable />}
    </div>
  );
};

export default NotesPage;
