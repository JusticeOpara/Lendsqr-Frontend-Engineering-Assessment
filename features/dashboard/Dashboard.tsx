"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { StatCard } from "@/components/Card";
import styles from "./dashboard.module.scss";
import { AppIcons } from "@/elements";
import user from "@/public/assets/users.svg";

import { users, columns } from "@/mock-data/users";
import { Table } from "@/components/Table";
import { Pagination } from "@/components/Pagination";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return users
      .slice(start, end)
      .map((user) => ({ ...user, id: String(user.id) }));
  }, [users, currentPage, itemsPerPage]);

  return (
    <section className={styles.sect}>
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

      <div className={styles.table_container}>
        <Table columns={columns} data={paginatedData} />
        <Pagination
          currentPage={currentPage}
          totalItems={users.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(count) => {
            setItemsPerPage(count);
            setCurrentPage(1);
          }}
        />
      </div>
    </section>
  );
};

export default Dashboard;
