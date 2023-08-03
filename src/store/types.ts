export interface Note {
  id: number;
  createdAt: string;
  content: string;
  category: string;
  dates: string[];
  archived: boolean;
}

export interface ArchivedTableProps {
  notes: Note[];
}
export interface DateListProps {
  dates: string[];
}
export interface NoteTableProps {
  notes: Note[];
  isSummary?: boolean;
}
export interface SummaryTableProps {
  isSummary?: boolean;
}
