import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";

interface SummaryTableProps {
  isSummary?: boolean;
}

const NoSummaryRow: React.FC = () => (
  <tr>
    <td colSpan={3} className="table-secondary">
      <h2 className="col-content">There are no notes yet</h2>
    </td>
  </tr>
);

const SummaryTable: React.FC<SummaryTableProps> = ({ isSummary }) => {
  const notes = useSelector((state: RootState) => state.notes);
  const activeNotes = notes.filter((note) => !note.archived);
  const archivedNotes = notes.filter((note) => note.archived);

  const countByCategory = (category: string, isArchived: boolean) => {
    const targetNotes = isArchived ? archivedNotes : activeNotes;
    return targetNotes.filter((note) => note.category === category).length;
  };

  // Check if there are no active and archived notes
  const noActiveNotes = activeNotes.length === 0;
  const noArchivedNotes = archivedNotes.length === 0;

  // Render the message if there are no notes in both active and archived tables
  if (noActiveNotes && noArchivedNotes) {
    return (
      <>
        <h2 className="table-header">Summary</h2>
        <table className="table">
          <tbody>
            <NoSummaryRow />
          </tbody>
        </table>
      </>
    );
  }

  return (
    <>
      <h2 className="table-header">Summary</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Active</th>
            <th>Archived</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Task</td>
            <td>{countByCategory("Task", false)}</td>
            <td>{countByCategory("Task", true)}</td>
          </tr>
          <tr>
            <td>Random Thought</td>
            <td>{countByCategory("Random Thought", false)}</td>
            <td>{countByCategory("Random Thought", true)}</td>
          </tr>
          <tr>
            <td>Idea</td>
            <td>{countByCategory("Idea", false)}</td>
            <td>{countByCategory("Idea", true)}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default SummaryTable;
