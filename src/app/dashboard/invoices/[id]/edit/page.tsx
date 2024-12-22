import Section from "@/components/common/section";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import EditInvoiceForm from "@/components/invoice/edit-invoice";
import { prisma } from "@/lib/prisma/db";
import { getInvoice } from "@/lib/prisma/utils";

const EditInvoicePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const invoiceId = (await params).id;

  const invoiceData = await getInvoice(invoiceId);

  return (
    <DashboardLayout>
      <Section>
        <h2 className="text-xl font-bold mb-2">Edit Invoice no. {invoiceId}</h2>
        <div className="flex items-center">
          <EditInvoiceForm invoiceData={invoiceData} />
        </div>
      </Section>
    </DashboardLayout>
  );
};

export default EditInvoicePage;
