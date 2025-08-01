import React from "react";
import styles from "./StatCard.module.scss";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  className: string
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, className }) => {
  return (
    <div className={styles.card}>
      <span className={`${styles.icon} ${className}`}>{icon}</span>
      {/* <div className={styles.icon}></div> */}
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value.toLocaleString()}</div>
    </div>
  );
};

export default StatCard;
