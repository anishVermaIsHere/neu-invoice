import Section from "@/components/common/section";
import { InvoiceTable } from "@/components/invoice/invoice-table";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import CreateInvoiceButton from "@/components/invoice/create-invoice-button";
import { Suspense } from "react";
import Spinner from "@/components/ui/spinner";
import SearchBox from "@/components/invoice/search-box";
import { findInvoices } from "@/lib/prisma/utils";
import { getAuth } from "@/auth";

const InvoicePage = async ({ params }: { params : { query: string }}) => {

  const query = (await params).query;
  const session = await getAuth();

  const data = await findInvoices(session?.user?.id as string, query);
  console.log('query data', data);

  return (
    <DashboardLayout>
      <Section classes="p-1">
        <h2 className="text-xl font-bold mb-2">Invoices</h2>
        <div className="flex items-center gap-3">
          <CreateInvoiceButton />
          <SearchBox />
        </div>
        <Suspense fallback={<Spinner />}>
          <InvoiceTable />
        </Suspense>
      </Section>
    </DashboardLayout>
  );
};

export default InvoicePage;
