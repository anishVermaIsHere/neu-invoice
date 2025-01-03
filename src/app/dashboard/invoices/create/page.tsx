import Section from "@/components/common/section";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import DashNavbar from "@/components/dashboard/navbar/dash-nav";
import CreateInvoiceForm  from "@/components/invoice/create-invoice";


const CreateInvoicePage = async () => {
  return (
    <DashboardLayout>
      <DashNavbar title="Create invoice" isDatePicker={false} isBack />
      <Section>
        <div className="flex items-center">
          <CreateInvoiceForm />
        </div>
      </Section>
    </DashboardLayout>
  );
};

export default CreateInvoicePage;
