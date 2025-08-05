import { DashboardLayout } from '@/layout';
import { Metadata } from 'next';
import React from 'react'
import { UserDetails } from '@/features/user';

export const metadata: Metadata = {
  title: "Leadsqr UserDetails",
};

const UserDetailsPage = () => {


  return (
    <DashboardLayout>
      <UserDetails  />
    </DashboardLayout>
  )
}

export default UserDetailsPage