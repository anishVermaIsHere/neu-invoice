import Section from "@/components/common/section";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import CreateInvoiceForm  from "@/components/invoice/create-invoice";


const CreateInvoicePage = async () => {
  return (
    <DashboardLayout>
      <Section>
        <h2 className="text-xl font-bold px-5 mb-2">Create invoice</h2>
        <div className="flex items-center">
          <CreateInvoiceForm />
        </div>
      </Section>
    </DashboardLayout>
  );
};

export default CreateInvoicePage;
