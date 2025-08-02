import { DashboardLayout } from '@/layout';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Leadsqr UserDetails",
};

const UserDetails = () => {

  return (
    <DashboardLayout>
       <UserDetails/>
    </DashboardLayout>
  )
}

export default UserDetails