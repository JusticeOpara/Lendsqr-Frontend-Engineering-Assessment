import React from "react";
import styles from "./navigation.module.scss";
import lendsqr from "@/public/assets/lendsqr-logo.svg";
import Image from "next/image";
import { NavIcons } from "@/elements";


interface NavbarProps {
  userName: string;
  avatar: string;
}

const TopNavigation: React.FC<NavbarProps> = ({ userName, avatar }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Image src={lendsqr} alt="logo" width={145} height={145} />
        <div className={styles.search}>
          <input type="text" placeholder="Search for anything" />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              viewBox="0 0 24 24"
            >
              <path d="M10 2a8 8 0 015.292 13.708l4 4a1 1 0 01-1.415 1.415l-4-4A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.right}>
        <a href="#">Docs</a>
        
        {NavIcons.ic_alert}
        
        <div className={styles.profile}>
          <Image src={avatar} alt="User avatar" width={48} height={48} />
          <span>{userName}</span>
          <span className={styles.arrow}>▾</span>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
