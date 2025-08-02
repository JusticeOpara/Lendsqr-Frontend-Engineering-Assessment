"use client";

import { NavIcons, SideIcons } from "@/elements";
import styles from "./navigation.module.scss";
import React, { JSX, useCallback, useEffect, useMemo, useState } from "react";

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
            icon: SideIcons.ic_decision,
          },
          {
            label: "Savings",
            href: "/savings",
            icon: SideIcons.ic_saving,
          },
          {
            label: "Loan Requests",
            href: "/loan-requests",
            icon: SideIcons.ic_loan_request,
          },
          {
            label: "Whitelist",
            href: "/whitelist",
            icon: SideIcons.ic_whitelist,
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
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileExpanded(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleMobileToggle = () => {
    setIsMobileExpanded(!isMobileExpanded);
  };

  const handleNavClickMobile = (href: string) => {
    handleNavClick(href);
    if (isMobile) {
      setIsMobileExpanded(false);
    }
  };

  const handleOverlayClick = () => {
    setIsMobileExpanded(false);
  };

  return (
    
    <>
      {/* Mobile menu toggle button */}
      {isMobile && (
        <button
          className={styles.mobile_menu_toggle}
          onClick={handleMobileToggle}
          aria-label="Toggle navigation menu"
        >
          {'☰'}
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && (
        <div 
          className={`${styles.sidebar_overlay} ${isMobileExpanded ? styles.active : ''}`}
          onClick={handleOverlayClick}
        />
      )}

      <div className={`${styles.side_navigation} ${isMobileExpanded ? styles.mobile_expanded : ''}`}>
        <nav className={styles.side_menu}>
          <div className={styles.organization_switcher}>
            <div className={styles.org_icon}>
              {SideIcons.ic_organization}
            </div>
            <span className={styles.org_text}>Switch Organization</span>
            <div className={styles.chevron}>
              {SideIcons.ic_service || '▼'}x
            </div>
          </div>

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
                          isActive ? styles.active : ""
                        }`}
                        onClick={() => handleNavClickMobile(item.href)}
                        title={isMobile && !isMobileExpanded ? item.label : undefined}
                      >
                        <div className={styles.side_icon}>
                          {item.icon}
                        </div>
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
    </>
  );
};
export default SideNavigation;
