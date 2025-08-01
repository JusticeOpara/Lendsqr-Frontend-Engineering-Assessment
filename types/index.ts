interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

interface TableRow {
  id: string;
  [key: string]: string | number | boolean | undefined;
}

interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  className?: string;
}

export type{TableColumn, TableProps, TableRow}