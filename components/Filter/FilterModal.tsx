import React, { useState, useRef, useEffect } from "react";
// import {
//   ChevronDown,
//   Calendar,
// } from "lucide-react";

// Filter Modal Component
const FilterModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  position: { top: number; left: number };
}> = ({ isOpen, onClose, position }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData({
      organization: "",
      username: "",
      email: "",
      date: "",
      phoneNumber: "",
      status: "",
    });
  };

  const handleFilter = () => {
    console.log("Filter applied:", formData);
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
          position: "absolute",
          top: position.top + 10,
          left: position.left - 200,
          zIndex: 1000,
        }}
      >
        <div className="filter-form">
          <div className="form-group">
            <label className="form-label">Organization</label>
            <div className="select-wrapper">
              <select
                className="form-select"
                value={formData.organization}
                onChange={(e) =>
                  handleInputChange("organization", e.target.value)
                }
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
              onChange={(e) => handleInputChange("username", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
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
                onChange={(e) => handleInputChange("date", e.target.value)}
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
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <div className="select-wrapper">
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
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

   
    </>
  );
};

