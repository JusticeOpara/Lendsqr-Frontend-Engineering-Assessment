"use client";

import { NavIcons } from "@/elements";
import styles from "./navigation.module.scss";
import React, { JSX, useCallback, useMemo, useState } from "react";

interface NavigationItem {
  label: string;
  href: string;
  icon: (active: boolean) => JSX.Element;
}

interface NavigationSection {
  title?: string;
  items: NavigationItem[];
}
const SideNavigation = () => {
  const [currentPath, setCurrentPath] = useState("/users");

  const navigationSections: NavigationSection[] = useMemo(
    () => [
      {
        items: [
          {
            label: "Dashboard",
            href: "/dashboard",
            icon: NavIcons.ic_home,
          },
        ],
      },
      {
        title: "CUSTOMERS",
        items: [
          {
            label: "Users",
            href: "/users",
            icon: NavIcons.ic_users,
          },
          {
            label: "Guarantors",
            href: "/guarantors",
            icon: NavIcons.ic_guarantors,
          },
          {
            label: "Loans",
            href: "/loans",
            icon: NavIcons.ic_loans,
          },
          {
            label: "Decision Models",
            href: "/decision-models",
            icon: NavIcons.ic_decision_models,
          },
          {
            label: "Savings",
            href: "/savings",
            icon: NavIcons.ic_loans, 
          },
          {
            label: "Loan Requests",
            href: "/loan-requests",
            icon: NavIcons.ic_loans, 
          },
          {
            label: "Whitelist",
            href: "/whitelist",
            icon: NavIcons.ic_users, 
          },
          {
            label: "Karma",
            href: "/karma",
            icon: NavIcons.ic_home,
          },
        ],
      },
       
    ],
    []
  );

  const isActiveLink = useCallback(
    (href: string) => {
      return currentPath === href;
    },
    [currentPath]
  );

  const handleNavClick = (href: string) => {
    setCurrentPath(href);
  };
  return (
    <div className={styles.side_navigation}>
      {/* Organization Switcher */}
      <div className={styles.organization_switcher}>
        {NavIcons.ic_guarantors(true)}
        <span className={styles.org_text}>Switch Organization</span>
      </div>

      {/* Navigation Menu */}
      <nav className={styles.side_menu}>
        {navigationSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={styles.side_section}>
            {section.title && (
              <div className={styles.section_title}>{section.title}</div>
            )}

            
            <ul className={styles.side_list}>
              {section.items.map((item, itemIndex) => {
                const isActive = isActiveLink(item.href);

                return (
                  <li key={itemIndex} className={styles.side_item}>
                    <button
                      className={`${styles.side_link} ${
                        isActive ? "active" : ""
                      }`}
                      onClick={() => handleNavClick(item.href)}
                    >
                      {item.icon(isActive)}
                      <span className={styles.side_label}>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};
export default SideNavigation;
