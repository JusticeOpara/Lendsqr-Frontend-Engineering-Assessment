interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

interface TableRow {
  id: string;
  [key: string]: string;
}

interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  className?: string;
}

export type{TableColumn, TableProps, TableRow}