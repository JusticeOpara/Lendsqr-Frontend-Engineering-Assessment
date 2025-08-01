import React, { useState } from "react";
import { AppIcons } from "@/elements";
import { TableProps } from "@/types";
import styles from "./table.module.scss";

// Status component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return `${styles.status_active}`;
      case "pending":
        return `${styles.status_pending}`;
      case "blacklisted":
        return `${styles.status_blacklisted}`;
      case "inactive":
        return `${styles.status_inactive}`;
      default:
        return `${styles.status_default}`;
    }
  };
  // wilojo8102@amirei.com

  return (
    <span className={`${styles.status_badge} ${getStatusClass(status)}`}>
      {status}
    </span>
  );
};

const Table: React.FC<TableProps> = ({ columns, data, className }) => {
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const renderCellContent = (value: any, columnKey: string) => {
    if (columnKey === "status") {
      return <StatusBadge status={value} />;
    }
    if (columnKey === "email") {
      return <span className={styles.email_link}>{value}</span>;
    }
    return value;
  };

  return (
    <div className={`${styles.data_table_container} ${className}`}>
      <table className={styles.data_table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`${styles.table_header} ${
                  column.sortable ? `${styles.sortable}` : ""
                }`}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className={styles.header_content}>
                  <span className={styles.hearder_text}>{column.label}</span>
                  {column.sortable && AppIcons.ic_filter}
                </div>
              </th>
            ))}
            <th className={styles.actions_header}></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className={styles.table_row}>
              {columns.map((column) => (
                <td key={column.key} className={styles.table_cell}>
                  {renderCellContent(row[column.key], column.key)}
                </td>
              ))}
              <td className={`${styles.table_cell} ${styles.actions_cell}`}>
                <span className={styles.actions_button}>{AppIcons.ic_dot}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
