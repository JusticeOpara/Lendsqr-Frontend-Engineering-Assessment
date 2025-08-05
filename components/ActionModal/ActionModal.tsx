import { TableRow } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import styles from "./actionmodal.module.scss";
import { AppIcons } from "@/elements";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "@/redux/users-slice";
import user_details from "@/mock-data/users-details";

interface ActionProps {
  isOpen: boolean;
  onClose: () => void;
  position: { top: number; left: number };
  rowData: TableRow;
}

const ActionModal: React.FC<ActionProps> = ({
  isOpen,
  onClose,
  position,
  rowData,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { replace } = useRouter();
  const dispatch = useDispatch();
  

  const handleViewUser = () => {
    const userId = Number(rowData.id);
    const fullUser = user_details.find(
      (user) => user.personalInformation.id === userId
    );
    console.log(fullUser, "--fullUser");

    if (fullUser) {
      dispatch(setSelectedUser(fullUser));
      localStorage.setItem("selectedUser", JSON.stringify(fullUser));
      replace(`/users/${userId}`);
      onClose();
    } else {
      console.error("User not found for id:", rowData.id);
    }
  };

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

  const handleBlacklistUser = () => {
    console.log("Blacklist User:", rowData);
    onClose();
  };

  const handleActivateUser = () => {
    console.log("Activate User:", rowData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className={styles.action_menu_modal}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left - 150,
        zIndex: 1000,
      }}
    >
      <div
        className={styles.action_menu_item}
        onClick={() => handleViewUser}
        // onClick={() => handleViewDetails(rowData.id)}
      >
        <span className={styles.icon_menu}>{AppIcons.ic_eye}</span>
        <span>View Details</span>
      </div>

      <div className={styles.action_menu_item} onClick={handleBlacklistUser}>
        <span className={styles.icon_menu}>{AppIcons.ic_delete}</span>
        <span className={styles.delete_menu}>Blacklist User</span>
      </div>

      <div className={styles.action_menu_item} onClick={handleActivateUser}>
        <span className={styles.icon_menu}> {AppIcons.ic_active}</span>
        <span>Activate User</span>
      </div>
    </div>
  );
};
export default ActionModal;
