"use client";

import { NavIcons, SideIcons } from "@/elements";
import styles from "./navigation.module.scss";
import React, { JSX, useCallback, useMemo, useState } from "react";

interface NavigationItem {
  label: string;
  href: string;
  icon: JSX.Element;
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
            icon: SideIcons.ic_karma,
          },
        ],
      },
      {
        title: "BUSINESSES",
        items: [
          {
            label: "Organization",
            href: "/organization",
            icon: SideIcons.ic_organization,
          },
          {
            label: "Loan Products",
            href: "/loan-products",
            icon: SideIcons.ic_loan_request,
          },
          {
            label: "Saving Products",
            href: "/saving-products",
            icon: SideIcons.ic_savings_products,
          },
          {
            label: "Fees and Charges",
            href: "/fees-charges",
            icon: SideIcons.ic_fees_charges,
          },
          {
            label: "Transactions",
            href: "/transactions",
            icon: SideIcons.ic_transaction,
          },
          {
            label: "Services",
            href: "/services",
            icon: SideIcons.ic_service,
          },
          {
            label: "Service Account",
            href: "/service-account",
            icon: SideIcons.ic_service_account,
          },
          {
            label: "Settlements",
            href: "/settlements",
            icon: SideIcons.ic_settlement,
          },
          {
            label: "Reports",
            href: "/reports",
            icon: SideIcons.ic_reports,
          },
        ],
      },

      {
        title: "SETTINGS",
        items: [
          {
            label: "Perferences",
            href: "/perferences",
            icon: SideIcons.ic_perferences,
          },
          {
            label: "Fees and Pricing",
            href: "/loan-products",
            icon: SideIcons.ic_fees_pricing,
          },
          {
            label: "Audit Logs",
            href: "/audit-logs",
            icon: SideIcons.ic_audit_logs,
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
        {SideIcons.ic_organization}
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
                      {item.icon}
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
