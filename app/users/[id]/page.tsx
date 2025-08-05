import { DashboardLayout } from '@/layout';
import { Metadata } from 'next';
import React from 'react'
import { UserDetails } from '@/features/user';

export const metadata: Metadata = {
  title: "Leadsqr UserDetails",
};

import { useParams } from 'next/navigation';

const UserDetailsPage = () => {
  const params = useParams<{ id: string }>();

  return (
    <DashboardLayout>
      <UserDetails params={{ id: params.id }} />
    </DashboardLayout>
  )
}

export default UserDetailsPage