import React, { useState, useRef, useEffect } from "react";
import { AppIcons } from "@/elements";
import styles from "./filter.module.scss";

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
      <div
        className={styles.modal_overlay}
        onClick={onClose}
        data-testid="modal-overlay"
      />

      <div className={styles.modal_overlay} onClick={onClose} />
      <div
        ref={modalRef}
        className={styles.filter_modal}
        style={{
          position: "absolute",
          top: position.top + 10,
          left: position.left + 2,
          zIndex: 1000,
        }}
      >
        <div className={styles.filter_form}>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Organization</label>
            <div className={styles.select_wrapper}>
              <select
                className={styles.form_select}
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
              <span>{AppIcons.ic_dropdown}</span>
            </div>
          </div>

          <div className={styles.form_group}>
            <label className={styles.form_label}>Username</label>
            <input
              type="text"
              className={styles.form_input}
              placeholder="User"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
            />
          </div>

          <div className={styles.form_group}>
            <label className={styles.form_label}>Email</label>
            <input
              type="email"
              className={styles.form_input}
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>

          <div className={styles.form_group}>
            <label className={styles.form_label}>Date</label>
            {/* <div className={styles.date_input_wrapper}> */}
            <input
              type="date"
              className={`${styles.form_input} ${styles.date_input}`}
              placeholder="Date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
            />
            {/* <span>{AppIcons.ic_calendar}</span>   */}
            {/* </div> */}
          </div>

          <div className={styles.form_group}>
            <label className={styles.form_label}>Phone Number</label>
            <input
              type="tel"
              className={styles.form_input}
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            />
          </div>

          <div className={styles.form_group}>
            <label className={styles.form_label}>Status</label>
            <div className={styles.select_wrapper}>
              <select
                className={styles.form_select}
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
              >
                <option value="">Select</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="blacklisted">Blacklisted</option>
              </select>
              <span>{AppIcons.ic_dropdown}</span>
            </div>
          </div>

          <div className={styles.form_actions}>
            <button
              type="button"
              className={styles.reset_btn}
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="button"
              className={styles.filter_btn}
              onClick={handleFilter}
            >
              Filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default FilterModal;
