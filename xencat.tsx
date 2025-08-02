import React, { useRef, useState, useEffect } from "react";
import { Eye, UserX, UserCheck, MoreVertical } from "lucide-react";

// Types
interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

interface TableRow {
  id: string;
  [key: string]: any;
}

interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  className?: string;
}

interface ActionMenuProps {
  isOpen: boolean;
  onClose: () => void;
  position: { top: number; left: number };
  rowData: TableRow;
}

// Action Menu Modal Component matching your design
const ActionMenuModal: React.FC<ActionMenuProps> = ({ 
  isOpen, 
  onClose, 
  position, 
  rowData 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleViewDetails = () => {
    console.log('View Details for:', rowData);
    onClose();
  };

  const handleBlacklistUser = () => {
    console.log('Blacklist User:', rowData);
    onClose();
  };

  const handleActivateUser = () => {
    console.log('Activate User:', rowData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef}
      className="action-menu-modal"
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left - 150,
        zIndex: 1000
      }}
    >
      <div className="action-menu-item" onClick={handleViewDetails}>
        <Eye size={16} className="action-icon" />
        <span>View Details</span>
      </div>
      
      <div className="action-menu-item" onClick={handleBlacklistUser}>
        <UserX size={16} className="action-icon" />
        <span>Blacklist User</span>
      </div>
      
      <div className="action-menu-item" onClick={handleActivateUser}>
        <UserCheck size={16} className="action-icon" />
        <span>Activate User</span>
      </div>

      <style jsx>{`
        .action-menu-modal {
          background: white;
          border-radius: 4px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          padding: 20px;
          width: 180px;
          border: 1px solid #e6edf5;
          font-family: 'Work Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .action-menu-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 0;
          cursor: pointer;
          font-size: 14px;
          color: #545f7d;
          transition: color 0.2s ease;
          border-bottom: 1px solid #f8f9fc;
        }

        .action-menu-item:last-child {
          border-bottom: none;
        }

        .action-menu-item:hover {
          color: #213f7d;
        }

        .action-icon {
          color: #545f7d;
          transition: color 0.2s ease;
        }

        .action-menu-item:hover .action-icon {
          color: #213f7d;
        }
      `}</style>
    </div>
  );
};

// Filter Modal Component (reusing from previous)
const FilterModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  position: { top: number; left: number };
}> = ({ isOpen, onClose, position }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    organization: '',
    username: '',
    email: '',
    date: '',
    phoneNumber: '',
    status: ''
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData({
      organization: '',
      username: '',
      email: '',
      date: '',
      phoneNumber: '',
      status: ''
    });
  };

  const handleFilter = () => {
    console.log('Filter applied:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div 
        ref={modalRef}
        className="filter-modal"
        style={{
          position: 'absolute',
          top: position.top + 10,
          left: position.left - 200,
          zIndex: 1000
        }}
      >
        <div className="filter-form">
          <div className="form-group">
            <label className="form-label">Organization</label>
            <div className="select-wrapper">
              <select 
                className="form-select"
                value={formData.organization}
                onChange={(e) => handleInputChange('organization', e.target.value)}
              >
                <option value="">Select</option>
                <option value="lendsqr">Lendsqr</option>
                <option value="irorun">Irorun</option>
                <option value="lendstar">Lendstar</option>
              </select>
              <span className="select-arrow">▼</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              placeholder="User"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date</label>
            <div className="date-input-wrapper">
              <input
                type="text"
                className="form-input date-input"
                placeholder="Date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
              />
              <span className="date-icon">📅</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-input"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <div className="select-wrapper">
              <select 
                className="form-select"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
              >
                <option value="">Select</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="blacklisted">Blacklisted</option>
              </select>
              <span className="select-arrow">▼</span>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="reset-btn" onClick={handleReset}>
              Reset
            </button>
            <button type="button" className="filter-btn" onClick={handleFilter}>
              Filter
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.1);
          z-index: 999;
        }

        .filter-modal {
          background: white;
          border-radius: 4px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          padding: 30px;
          width: 270px;
          border: 1px solid #e6edf5;
        }

        .filter-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 14px;
          font-weight: 400;
          color: #545f7d;
          font-family: 'Work Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .form-input, .form-select {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #d1d9e6;
          border-radius: 8px;
          font-size: 14px;
          color: #545f7d;
          background: white;
          transition: border-color 0.2s ease;
          font-family: 'Work Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          height: 48px;
          box-sizing: border-box;
        }

        .form-input:focus, .form-select:focus {
          outline: none;
          border-color: #39cdcc;
          box-shadow: 0 0 0 2px rgba(57, 205, 204, 0.1);
        }

        .form-input::placeholder {
          color: #a3a8b8;
          font-weight: 400;
        }

        .select-wrapper {
          position: relative;
        }

        .select-arrow {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #39cdcc;
          pointer-events: none;
          font-size: 12px;
        }

        .form-select {
          appearance: none;
          padding-right: 45px;
          cursor: pointer;
          color: #a3a8b8;
        }

        .form-select:focus {
          color: #545f7d;
        }

        .date-input-wrapper {
          position: relative;
        }

        .date-icon {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #545f7d;
          pointer-events: none;
        }

        .form-actions {
          display: flex;
          gap: 14px;
          margin-top: 10px;
        }

        .reset-btn, .filter-btn {
          flex: 1;
          padding: 14px 30px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid;
          font-family: 'Work Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .reset-btn {
          background: transparent;
          color: #545f7d;
          border-color: #545f7d;
        }

        .reset-btn:hover {
          background: #f8fafc;
          border-color: #394150;
          color: #394150;
        }

        .filter-btn {
          background: #39cdcc;
          color: white;
          border-color: #39cdcc;
        }

        .filter-btn:hover {
          background: #2cbcbb;
          border-color: #2cbcbb;
        }

        .reset-btn:focus, .filter-btn:focus {
          outline: 2px solid #39cdcc;
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
};

// Status component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const statusMap = {
    active: {
      className: 'status-active',
      text: 'Active',
    },
    pending: {
      className: 'status-pending',
      text: 'Pending',
    },
    blacklisted: {
      className: 'status-blacklisted',
      text: 'Blacklisted',
    },
    inactive: {
      className: 'status-inactive',
      text: 'Inactive',
    },
  };

  const currentStatus = statusMap[
    status.toLowerCase() as keyof typeof statusMap
  ] || {
    className: 'status-default',
    text: status,
  };

  return (
    <span className={`status-badge ${currentStatus.className}`}>
      {currentStatus.text}
    </span>
  );
};

// Main Table Component
const Table: React.FC<TableProps> = ({ columns, data, className }) => {
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [actionMenuPosition, setActionMenuPosition] = useState({ top: 0, left: 0 });
  const [selectedRowData, setSelectedRowData] = useState<TableRow | null>(null);
  const organizationHeaderRef = useRef<HTMLTableHeaderCellElement>(null);

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
    if (columnKey === "email") {
      return <span className="email-link">{value}</span>;
    }
    return value;
  };

  return (
    <>
      <div className={`data-table-container ${className || ''}`}>
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  ref={
                    column.key === "organization" ? organizationHeaderRef : null
                  }
                  className={`table-header ${column.sortable ? 'sortable' : ''}`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="header-content">
                    <span className="header-text">{column.label}</span>
                    {column.sortable && <span className="filter-icon">⚍</span>}
                  </div>
                </th>
              ))}
              <th className="actions-header"></th>
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="table-row">
                {columns.map((column) => (
                  <td key={column.key} className="table-cell">
                    {renderCellContent(row[column.key], column.key)}
                  </td>
                ))}
                <td className="table-cell actions-cell">
                  <button 
                    className="actions-button"
                    onClick={(e) => handleActionClick(e, row)}
                  >
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={closeFilterModal}
        position={modalPosition}
      />

      {selectedRowData && (
        <ActionMenuModal
          isOpen={isActionMenuOpen}
          onClose={closeActionMenu}
          position={actionMenuPosition}
          rowData={selectedRowData}
        />
      )}

    </>
  );
};

