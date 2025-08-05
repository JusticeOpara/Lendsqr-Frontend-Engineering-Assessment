"use client";

import React, { useEffect } from "react";
import styles from "./users.module.scss";
import { AppIcons } from "@/elements";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { loadUserFromStorage } from "@/redux/users-slice";

const UserDetails: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.selectedUser);
    const { userId } = useParams();
  // const userId = Number(params.id);

  useEffect(() => {
    if (!user) {
      dispatch(loadUserFromStorage());
    }
  }, [dispatch, user]);

  const handleGoBack = () => {
    router.push("/users");
  };
  console.log(user, "--user user");
  if (!user) return <div>Loading...</div>;

  return (
    <div className={styles.user_details_page}>
      {/* Header */}
      <div className={styles.header}>
        <button
          className={styles.back_button}
          type="button"
          onClick={handleGoBack}
        >
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
          <div className={styles.user_name}>
            {user.personalInformation.fullName || "N/A"}
          </div>
          <div className={styles.user_id}>
            {user.organizationDetails.userNumber || "N/A"}
          </div>
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
          <div className={styles.balance_amount}>
            {user.organizationDetails.accountBalance || "N/A"}
          </div>
          <div className={styles.bank_info}>
            {user.organizationDetails.bankName || "N/A"}
          </div>
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
              <p className={styles.user_value}>
                {user.personalInformation.fullName || "N/A"}
              </p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Phone Number</p>
              <p className={styles.user_value}>
                {user.personalInformation.phoneNumber || "N/A"}
              </p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Email Address</p>
              <p className={styles.user_value}>
                {user.personalInformation.email || "N/A"}
              </p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>BVN</p>
              <p className={styles.user_value}>
                {user.personalInformation.bvn || "N/A"}
              </p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Gender</p>
              <p className={styles.user_value}>
                {user.personalInformation.gender || "N/A"}
              </p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Marital Status</p>
              <p className={styles.user_value}>
                {user.personalInformation.maritalStatus || "N/A"}
              </p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Children</p>
              <p className={styles.user_value}>
                {user.personalInformation.children || "N/A"}
              </p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Type of Residence</p>
              <p className={styles.user_value}>
                {user.personalInformation.typeOfResidence || "N/A"}
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Education and Employment</h3>
          <div className={styles.user_grid}>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Level of Education</p>
              <p className={styles.user_value}>
                {user.educationAndEmployment.levelOfEducation || "N/A"}
              </p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Employment Status</p>
              <p className={styles.user_value}>
                {user.educationAndEmployment.employmentStatus || "N/A"}
              </p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Sector of Employment</p>
              <p className={styles.user_value}>
                {user.educationAndEmployment.sectorOfEmployment || "N/A"}
              </p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Duration of Employment</p>
              <p className={styles.user_value}>
                {user.educationAndEmployment.durationOfEmployment || "N/A"}
              </p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Office Email</p>
              <p className={styles.user_value}>
                {user.educationAndEmployment.officeEmail || "N/A"}
              </p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Monthly Income</p>
              <p className={styles.user_value}>
                {user.educationAndEmployment.monthlyIncome || "N/A"}
              </p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Loan Repayment</p>
              <p className={styles.user_value}>
                {user.educationAndEmployment.loanRepayment || "N/A"}
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Socials</h3>
          <div className={styles.user_grid}>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Twitter</p>
              <p className={styles.user_value}>
                {user.socials.twitter || "N/A"}
              </p>
            </div>

            <div className={styles.user_item}>
              <p className={styles.user_label}>Facebook</p>
              <p className={styles.user_value}>
                {user.socials.facebook || "N/A"}
              </p>
            </div>

            <div className={styles.user_item}>
              <p className={styles.user_label}>Instagram</p>
              <p className={styles.user_value}>
                {user.socials.instagram || "N/A"}
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Guarantor</h3>
          <div className={styles.user_grid}>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Full Name </p>
              <p className={styles.user_value}>
                {user.guarantor.fullName || "N/A"}
              </p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Phone Number</p>
              <p className={styles.user_value}>
                {user.guarantor.phoneNumber || "N/A"}
              </p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Email Address</p>
              <p className={styles.user_value}>
                {user.guarantor.email || "N/A"}
              </p>
            </div>
            <div className={styles.user_item}>
              <p className={styles.user_label}>Relationship</p>
              <p className={styles.user_value}>
                {user.guarantor.relationship || "N/A"}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDetails;
