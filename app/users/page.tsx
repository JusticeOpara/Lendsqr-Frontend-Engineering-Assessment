import { Dashboard } from '@/features/dashboard';
import { DashboardLayout } from '@/layout';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Leadsqr Users",
};

const UsersPage = () => {
  return (
     <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  )
}

export default UsersPage