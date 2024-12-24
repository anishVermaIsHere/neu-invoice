import { getAuth } from "@/auth";
import Section from "@/components/common/section";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import EditInvoiceForm from "@/components/invoice/edit-invoice";
import { prisma } from "@/lib/prisma/db";
import { Prisma } from "@prisma/client";

const EditInvoicePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const invoiceId = (await params).id;
  const session = await getAuth();

  const invoiceData = (await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: session?.user?.id,
    },
    select: {
      id: true,
      invoiceNumber: true,
      name: true,
      clientName: true,
      clientAddress: true,
      clientEmail: true,
      fromName: true,
      fromAddress: true,
      fromEmail: true,
      description: true,
      quantity: true,
      rate: true,
      total: true,
      date: true,
      dueDate: true,
      status: true,
      currency: true,
      note: true,
      createdAt: true,
    },
  })) as Prisma.InvoiceGetPayload<object>;

  return (
    <DashboardLayout>
      <Section>
        <h2 className="text-xl font-bold mb-2">Edit Invoice</h2>
        <div className="flex items-center">
          <EditInvoiceForm invoiceData={invoiceData} />
        </div>
      </Section>
    </DashboardLayout>
  );
};

export default EditInvoicePage;
