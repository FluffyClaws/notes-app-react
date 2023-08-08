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
    <td colSpan={3} className="bg-gray-100 p-4 text-center">
      <h2 className="text-2xl font-semibold text-center my-4">
        There are no notes yet
      </h2>
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
      <div>
        <h2 className="text-2xl font-semibold mb-2 text-center">Summary</h2>
        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            <NoSummaryRow />
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-2 text-center ">Summary</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-200">
            <th className="p-3">Category</th>
            <th className="p-3">Active</th>
            <th className="p-3">Archived</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category}>
              <td className="p-3 border-t border-gray-300">{category}</td>
              <td className="p-3 border-t border-gray-300">
                {countsByCategory.active[category] || 0}
              </td>
              <td className="p-3 border-t border-gray-300">
                {countsByCategory.archived[category] || 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryTable;
