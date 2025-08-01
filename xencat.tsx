import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, MoreVertical, Calendar, Filter as FilterIcon } from 'lucide-react';

// TypeScript interfaces
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

// Filter Modal Component
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
              <ChevronDown className="select-icon" size={16} />
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
              <Calendar className="date-icon" size={16} />
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
              <ChevronDown className="select-icon" size={16} />
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
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          padding: 30px;
          width: 270px;
          border: 1px solid #e2e8f0;
        }

        .filter-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-size: 14px;
          font-weight: 500;
          color: #334155;
          margin-bottom: 2px;
        }

        .form-input, .form-select {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 14px;
          color: #334155;
          background: white;
          transition: border-color 0.2s ease;
        }

        .form-input:focus, .form-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-input::placeholder {
          color: #94a3b8;
        }

        .select-wrapper {
          position: relative;
        }

        .select-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
          pointer-events: none;
        }

        .form-select {
          appearance: none;
          padding-right: 40px;
          cursor: pointer;
        }

        .date-input-wrapper {
          position: relative;
        }

        .date-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
          pointer-events: none;
        }

        .form-actions {
          display: flex;
          gap: 14px;
          margin-top: 10px;
        }

        .reset-btn, .filter-btn {
          flex: 1;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .reset-btn {
          background: transparent;
          color: #334155;
          border-color: #334155;
        }

        .reset-btn:hover {
          background: #f8fafc;
        }

        .filter-btn {
          background: #39cdcc;
          color: white;
          border-color: #39cdcc;
        }

        .filter-btn:hover {
          background: #2dd4bf;
          border-color: #2dd4bf;
        }

        .reset-btn:focus, .filter-btn:focus {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
};
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'status-active';
      case 'pending':
        return 'status-pending';
      case 'blacklisted':
        return 'status-blacklisted';
      case 'inactive':
        return 'status-inactive';
      default:
        return 'status-default';
    }
  };

  return (
    <span className={`status-badge ${getStatusClass(status)}`}>
      {status}
    </span>
  );
};

// Main Table Component
const DataTable: React.FC<TableProps> = ({ columns, data, className = '' }) => {
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const organizationHeaderRef = useRef<HTMLTableHeaderCellElement>(null);

  const handleSort = (columnKey: string) => {
    if (columnKey === 'organization') {
      handleOrganizationClick();
      return;
    }
    
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const handleOrganizationClick = () => {
    if (organizationHeaderRef.current) {
      const rect = organizationHeaderRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.bottom,
        left: rect.left
      });
      setIsFilterModalOpen(true);
    }
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const renderCellContent = (value: any, columnKey: string) => {
    if (columnKey === 'status') {
      return <StatusBadge status={value} />;
    }
    if (columnKey === 'email') {
      return <span className="email-link">{value}</span>;
    }
    return value;
  };

  return (
    <div className={`data-table-container ${className}`}>
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th 
                key={column.key}
                ref={column.key === 'organization' ? organizationHeaderRef : null}
                className={`table-header ${column.sortable ? 'sortable' : ''} ${column.key === 'organization' ? 'organization-header' : ''}`}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="header-content">
                  <span>{column.label}</span>
                  {column.sortable && (
                    <>
                      {column.key === 'organization' ? (
                        <FilterIcon className="filter-icon" size={16} />
                      ) : (
                        <ChevronDown className="sort-icon" />
                      )}
                    </>
                  )}
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
                <button className="actions-button">
                  <MoreVertical size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <FilterModal 
        isOpen={isFilterModalOpen}
        onClose={closeFilterModal}
        position={modalPosition}
      />

      <style jsx>{`
        .data-table-container {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .table-header {
          background-color: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          padding: 12px 16px;
          text-align: left;
          font-weight: 500;
          font-size: 14px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }

        .table-header.sortable {
          cursor: pointer;
          user-select: none;
        }

        .table-header.sortable:hover {
          background-color: #f1f5f9;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .sort-icon {
          color: #94a3b8;
          transition: transform 0.2s ease;
        }

        .filter-icon {
          color: #94a3b8;
          transition: color 0.2s ease;
        }

        .organization-header:hover .filter-icon {
          color: #64748b;
        }

        .table-header.sortable:hover .sort-icon {
          color: #64748b;
        }

        .actions-header {
          width: 50px;
          background-color: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }

        .table-row {
          border-bottom: 1px solid #f1f5f9;
          transition: background-color 0.2s ease;
        }

        .table-row:hover {
          background-color: #f8fafc;
        }

        .table-row:last-child {
          border-bottom: none;
        }

        .table-cell {
          padding: 16px;
          font-size: 14px;
          color: #334155;
          vertical-align: middle;
        }

        .email-link {
          color: #3b82f6;
          text-decoration: none;
        }

        .email-link:hover {
          text-decoration: underline;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 500;
          text-transform: capitalize;
        }

        .status-active {
          background-color: #dcfce7;
          color: #166534;
        }

        .status-pending {
          background-color: #fef3c7;
          color: #92400e;
        }

        .status-blacklisted {
          background-color: #fee2e2;
          color: #991b1b;
        }

        .status-inactive {
          background-color: #f1f5f9;
          color: #64748b;
        }

        .status-default {
          background-color: #e2e8f0;
          color: #475569;
        }

        .actions-cell {
          width: 50px;
          text-align: center;
        }

        .actions-button {
          background: none;
          border: none;
          padding: 8px;
          border-radius: 4px;
          cursor: pointer;
          color: #64748b;
          transition: all 0.2s ease;
        }

        .actions-button:hover {
          background-color: #f1f5f9;
          color: #334155;
        }

        .actions-button:focus {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

// Demo Component with sample data
const TableDemo: React.FC = () => {
  const columns: TableColumn[] = [
    { key: 'organization', label: 'Organization', sortable: true },
    { key: 'username', label: 'Username', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phoneNumber', label: 'Phone Number', sortable: true },
    { key: 'dateJoined', label: 'Date Joined', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ];

  const sampleData: TableRow[] = [
    {
      id: '1',
      organization: 'Lendsqr',
      username: 'Adedeji',
      email: 'adedeji@lendsqr.com',
      phoneNumber: '08078903721',
      dateJoined: 'May 15, 2020 10:00 AM',
      status: 'Inactive'
    },
    {
      id: '2',
      organization: 'Irorun',
      username: 'Debby Ogana',
      email: 'debby2@irorun.com',
      phoneNumber: '08160780928',
      dateJoined: 'Apr 30, 2020 10:00 AM',
      status: 'Pending'
    },
    {
      id: '3',
      organization: 'Lendstar',
      username: 'Grace Effiom',
      email: 'grace@lendstar.com',
      phoneNumber: '07060780922',
      dateJoined: 'Apr 30, 2020 10:00 AM',
      status: 'Blacklisted'
    },
    {
      id: '4',
      organization: 'Lendsqr',
      username: 'Tosin Dokunmu',
      email: 'tosin@lendsqr.com',
      phoneNumber: '07003309226',
      dateJoined: 'Apr 10, 2020 10:00 AM',
      status: 'Pending'
    },
    {
      id: '5',
      organization: 'Lendstar',
      username: 'Grace Effiom',
      email: 'grace@lendstar.com',
      phoneNumber: '07060780922',
      dateJoined: 'Apr 30, 2020 10:00 AM',
      status: 'Active'
    },
    {
      id: '6',
      organization: 'Lendsqr',
      username: 'Tosin Dokunmu',
      email: 'tosin@lendsqr.com',
      phoneNumber: '08060780900',
      dateJoined: 'Apr 10, 2020 10:00 AM',
      status: 'Active'
    },
    {
      id: '7',
      organization: 'Lendstar',
      username: 'Grace Effiom',
      email: 'grace@lendstar.com',
      phoneNumber: '07060780922',
      dateJoined: 'Apr 30, 2020 10:00 AM',
      status: 'Blacklisted'
    },
    {
      id: '8',
      organization: 'Lendsqr',
      username: 'Tosin Dokunmu',
      email: 'tosin@lendsqr.com',
      phoneNumber: '08060780900',
      dateJoined: 'Apr 10, 2020 10:00 AM',
      status: 'Inactive'
    },
    {
      id: '9',
      organization: 'Lendstar',
      username: 'Grace Effiom',
      email: 'grace@lendstar.com',
      phoneNumber: '07060780922',
      dateJoined: 'Apr 30, 2020 10:00 AM',
      status: 'Inactive'
    }
  ];

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <DataTable columns={columns} data={sampleData} />
    </div>
  );
};

export default TableDemo;