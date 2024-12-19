import Section from '@/components/common/section'
import DashboardLayout from '@/components/dashboard/dashboard-layout'
import { CreateInvoice } from '@/components/invoice/create-invoice'
import React from 'react'

const CreateInvoicePage = () => {

    const user = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        address: ''
    }
  return (
    <DashboardLayout>
      <Section>
        <h2 className="text-xl font-bold mb-2">Create invoice</h2>
        <div className="flex items-center">
        <CreateInvoice
          firstName={user.firstName}
          lastName={user.lastName}
          address={user.address}
          email={user.email}
        />
        </div>

      </Section>
    </DashboardLayout>
  )
}

export default CreateInvoicePage