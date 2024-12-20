import Section from "@/components/common/section";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { CreateInvoice } from "@/components/invoice/create-invoice";
import React from "react";

const CreateInvoicePage = async () => {
  const user = {
    firstName: "David",
    lastName: "Paul",
    email: "davidpaul@example.com",
    address: "",
  };
  return (
    <DashboardLayout>
      <Section>
        <h2 className="text-xl font-bold px-5 mb-2">Create invoice</h2>
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
  );
};

export default CreateInvoicePage;
