"use client";

import React, { useRef, useState } from "react";
import { AppIcons } from "@/elements";
import { TableProps, TableRow } from "@/types";
import styles from "./table.module.scss";
import { FilterModal } from "../Filter";
import { ActionModal } from "../ActionModal";


// Status component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const statusMap = {
    active: {
      className: styles.status_active,
      text: "Active",
    },
    pending: {
      className: styles.status_pending,
      text: "Pending",
    },
    blacklisted: {
      className: styles.status_blacklisted,
      text: "Blacklisted",
    },
    inactive: {
      className: styles.status_inactive,
      text: "Inactive",
    },
  };

  const currentStatus = statusMap[
    status.toLowerCase() as keyof typeof statusMap
  ] || {
    className: styles.status_default,
    text: status,
  };

  return (
    <span className={`${styles.status_badge} ${currentStatus.className}`}>
      {currentStatus.text}
    </span>
  );
};



const Table: React.FC<TableProps> = ({ columns, data, className }) => {
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const organizationHeaderRef = useRef<HTMLTableHeaderCellElement>(null);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [actionMenuPosition, setActionMenuPosition] = useState({
    top: 0,
    left: 0,
  });
  const [selectedRowData, setSelectedRowData] = useState<TableRow | null>(null);


  const handleSort = (columnKey: string) => {
    if (columnKey === "organization") {
      handleOrganizationClick();
      return;
    }
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const handleOrganizationClick = () => {
    if (organizationHeaderRef.current) {
      const rect = organizationHeaderRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.bottom,
        left: rect.left,
      });
      setIsFilterModalOpen(true);
    }
  };

  const handleActionClick = (event: React.MouseEvent, rowData: TableRow) => {
    event.stopPropagation();
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setActionMenuPosition({
      top: rect.bottom + 5,
      left: rect.left,
    });
    setSelectedRowData(rowData);
    setIsActionMenuOpen(true);
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const closeActionMenu = () => {
    setIsActionMenuOpen(false);
    setSelectedRowData(null);
  };

  const renderCellContent = (value: string, columnKey: string) => {
    if (columnKey === "status") {
      return <StatusBadge status={value} />;
    }

    return value;
  };

  return (
    <>
      <div className={`${styles.data_table_container} ${className}`}>
        <div className={styles.table_scroll_wrapper}>
          <table className={styles.data_table}>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    ref={
                      column.key === "organization"
                        ? organizationHeaderRef
                        : null
                    }
                    className={`${styles.table_header} ${
                      column.sortable ? `${styles.sortable}` : ""
                    }`}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className={styles.header_content}>
                      <span className={styles.hearder_text}>
                        {column.label}
                      </span>
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
                    <span
                      className={styles.actions_button}
                      onClick={(e) => handleActionClick(e, row)}
                    >
                      {AppIcons.ic_dot}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={closeFilterModal}
        position={modalPosition}
      />

      {selectedRowData && (
        <ActionModal
          isOpen={isActionMenuOpen}
          onClose={closeActionMenu}
          position={actionMenuPosition}
          rowData={selectedRowData}
         
        />
      )}
    </>
  );
};
export default Table;
