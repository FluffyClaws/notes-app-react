import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { SummaryTableProps } from "../store/types";
import {
  calculateCountsByCategory,
  hasNoActiveNotes,
  hasNoArchivedNotes,
} from "../utils/tableHelpers";

const NoSummaryRow: React.FC = () => (
  <tr>
    <td colSpan={3} className="table-secondary">
      <h2 className="col-content">There are no notes yet</h2>
    </td>
  </tr>
);

const SummaryTable: React.FC<SummaryTableProps> = ({ isSummary }) => {
  const notes = useSelector((state: RootState) => state.notes);

  const countsByCategory = calculateCountsByCategory(notes);

  const categories = ["Task", "Random Thought", "Idea"];

  const noActiveNotes = hasNoActiveNotes(countsByCategory);
  const noArchivedNotes = hasNoArchivedNotes(countsByCategory);

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
