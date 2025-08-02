"use client"

import React from "react";
import styles from "./users.module.scss";
import { AppIcons } from "@/elements";
import { useRouter } from "next/navigation";

const UserDetails: React.FC = () => {
  const { back } = useRouter();
  return (
    <div className={styles.user_details_page}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.back_button} type="button" onClick={() => back()}>
          {AppIcons.ic_back_btn}
          <span>Back to Users</span>
        </button>
      </div>

      {/* User Details Header */}
      <div className={styles.user_header}>
        <div className={styles.user_header_left}>
          <h1>User Details</h1>
        </div>
        <div className={styles.user_header_right}>
          <button className={styles.blacklist_button}>BLACKLIST USER</button>
          <button className={styles.activate_button}>ACTIVATE USER</button>
        </div>
      </div>

      {/* User Card */}
      <div className={styles.user_card}>
        <div className={styles.user_avatar}></div>

        <div className={styles.user_info}>
          <div className={styles.user_name}>Grace Effiom</div>
          <div className={styles.user_id}>LSQFf587g90</div>
        </div>

        <div className={styles.user_tier}>
          <div className={styles.tier_user_label}>User&apos;s Tier</div>
          <div className={styles.tier_stars}>
            <span className={`${styles.star} filled`}>★</span>
            <span className={styles.star}>☆</span>
            <span className={styles.star}>☆</span>
          </div>
        </div>

        <div className={styles.user_balance}>
          <div className={styles.balance_amount}>₦200,000.00</div>
          <div className={styles.bank_info}>9912345678/Providus Bank</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className={styles.nav_tabs}>
        <button className={`${styles.nav_tab} ${styles.active}`}>
          General Details
        </button>
        <button className={styles.nav_tab}>Documents</button>
        <button className={styles.nav_tab}>Bank Details</button>
        <button className={styles.nav_tab}>Loans</button>
        <button className={styles.nav_tab}>Savings</button>
        <button className={styles.nav_tab}>App and System</button>
      </div>

      <div className={styles.userDetails}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Personal Information</h3>
          <div className={styles.user_grid}>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Full Name</p>
              <p className={styles.user_value}>Grace Effiom</p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Phone Number</p>
              <p className={styles.user_value}>07060780922</p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Email Address</p>
              <p className={styles.user_value}>grace@gmail.com</p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>BVN</p>
              <p className={styles.user_value}>07060780922</p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Gender</p>
              <p className={styles.user_value}>Female</p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Marital Status</p>
              <p className={styles.user_value}>Single</p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Children</p>
              <p className={styles.user_value}>None</p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Type of Residence</p>
              <p className={styles.user_value}>Parent’s Apartment</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Education and Employment</h3>
          <div className={styles.user_grid}>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Level of Education</p>
              <p className={styles.user_value}>B.Sc</p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Employment Status</p>
              <p className={styles.user_value}>Employed</p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Sector of Employment</p>
              <p className={styles.user_value}>FinTech</p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Duration of Employment</p>
              <p className={styles.user_value}>2 years</p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Office Email</p>
              <p className={styles.user_value}>grace@lendsqr.com</p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Monthly Income</p>
              <p className={styles.user_value}>₦200,000 - ₦400</p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Loan Repayment</p>
              <p className={styles.user_value}>40,000</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Socials</h3>
          <div className={styles.user_grid}>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Twitter</p>
              <p className={styles.user_value}>@grace_effiom</p>
            </div>

            <div className={styles.user_item}>
              <p className={styles.user_label}>Facebook</p>
              <p className={styles.user_value}>Grace Effiom</p>
            </div>

            <div className={styles.user_item}>
              <p className={styles.user_label}>Instagram</p>
              <p className={styles.user_value}>@grace_effiom</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Guarantor</h3>
          <div className={styles.user_grid}>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Full Name </p>
              <p className={styles.user_value}>Debby Ogana</p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Phone Number</p>
              <p className={styles.user_value}>0704368304</p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Email Address</p>
              <p className={styles.user_value}>debby@gmail.com</p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Relationship</p>
              <p className={styles.user_value}>Sister</p>
            </div>
          </div>
        </section>
      
      </div>
    </div>
  );
};

export default UserDetails;
