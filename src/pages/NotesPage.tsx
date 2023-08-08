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
    <div className="container mx-auto p-4">
      {showArchivedTable ? (
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-center">Archived Notes</h2>
          <ArchivedTable notes={archivedNotes} />
        </div>
      ) : (
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-center">Active Notes</h2>
          <NoteTable notes={activeNotes} />
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center justify-between mt-4">
        <NoteForm />
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            onClick={handleViewActiveNotes}
          >
            View Active Notes
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            onClick={handleViewArchivedNotes}
          >
            View Archived Notes
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            onClick={toggleSummaryVisibility}
          >
            {showSummary ? "Hide Summary" : "Show Summary"}
          </button>
        </div>
      </div>
      {showSummary && <SummaryTable />}
    </div>
  );
};

export default NotesPage;
