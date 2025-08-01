
import { Dashboard } from '@/features/dashboard'
import DashboardLayout from '@/layout/DashboardLayout'
import React from 'react'

const DashboardPage = () => {
  return (
     <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  )
}

export default DashboardPage;