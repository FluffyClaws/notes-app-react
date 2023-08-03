import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { SummaryTableProps } from "../store/types";

const NoSummaryRow: React.FC = () => (
  <tr>
    <td colSpan={3} className="table-secondary">
      <h2 className="col-content">There are no notes yet</h2>
    </td>
  </tr>
);

const SummaryTable: React.FC<SummaryTableProps> = ({ isSummary }) => {
  const notes = useSelector((state: RootState) => state.notes);

  // Calculate the counts for each category and archive status
  const countsByCategory = notes.reduce(
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

  const categories = ["Task", "Random Thought", "Idea"];

  // Check if there are no active and archived notes
  const noActiveNotes = Object.values(countsByCategory.active).every(
    (count) => count === 0,
  );
  const noArchivedNotes = Object.values(countsByCategory.archived).every(
    (count) => count === 0,
  );

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
          {categories.map((category) => (
            <tr key={category}>
              <td>{category}</td>
              <td>{countsByCategory.active[category] || 0}</td>
              <td>{countsByCategory.archived[category] || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SummaryTable;
