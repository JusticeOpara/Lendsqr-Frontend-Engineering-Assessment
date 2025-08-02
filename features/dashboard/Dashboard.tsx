"use client";

import React from "react";
import Image from "next/image";
import StatCard from "@/components/Card";
import styles from "./dashboard.module.scss";
import { AppIcons } from "@/elements";
import user from "@/public/assets/users.svg";
import { Table } from "@/components/Table";
import { columns, sampleData } from "@/mock/user";
const Dashboard = () => {
  return (
    <div className={styles.sect}>
       <h1 className={styles.stat_header}>Users</h1>
      <div className={styles.stat_container}>
       
        <StatCard
          icon={<Image src={user} alt="users" width={24} height={24} />}
          label="Users"
          value={2453}
          className={styles.user_card}
        />

        <StatCard
          icon={AppIcons.ic_active_users}
          label="Active Users"
          value={2453}
            className={styles.active_card}
        />

        <StatCard
          icon={AppIcons.ic_loans}
          label="Users With loans"
          value={12453}
            className={styles.loan_card}
        />

        <StatCard
          icon={AppIcons.ic_savings}
          label="Users With Savings"
          value={102453}
            className={styles.savings_card}
        />
      </div>

      <div
       
         className={styles.table_container}
      >
        <Table columns={columns} data={sampleData} />
      </div>
    </div>
  );
};

export default Dashboard;
