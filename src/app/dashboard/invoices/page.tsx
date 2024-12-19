import Section from "@/components/common/section";
import { InvoiceTable } from "@/components/invoice/invoice-table";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import CreateInvoiceButton from "@/components/invoice/create-invoice-button";

const InvoicePage = () => {
  return (
    <DashboardLayout>
      <Section classes="p-1">
        <h2 className="text-xl font-bold mb-2">Invoices</h2>
        <div className="flex items-center">
          <CreateInvoiceButton />
        </div>

        <InvoiceTable />
      </Section>
    </DashboardLayout>
  );
};

export default InvoicePage;
