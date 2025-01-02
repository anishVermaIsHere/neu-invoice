import Section from "@/components/common/section";
import { InvoiceTable } from "@/components/invoice/invoice-table";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import CreateInvoiceButton from "@/components/invoice/create-invoice-button";
import { Suspense } from "react";
import Spinner from "@/components/ui/spinner";
import SearchBox from "@/components/invoice/search-box";
import DashNavbar from "@/components/dashboard/navbar/dash-nav";
// import { findInvoices } from "@/lib/prisma/utils";
// import { getAuth } from "@/auth";

const InvoicePage = async ({ searchParams }: { searchParams: { startdate: string, enddate: string, query: string }}) => {

  const sParams = (await searchParams);

  // const session = await getAuth();

  // const data = await findInvoices(session?.user?.id as string, query);
  // console.log('query data', data);



  return (
    <DashboardLayout>
      <DashNavbar title="Invoices"/>
      <Section classes="p-1">
        <div className="flex items-center gap-3">
          <CreateInvoiceButton />
          <SearchBox />
        </div>
        <Suspense fallback={<Spinner />}>
          <InvoiceTable startDate={sParams.startdate} endDate={sParams.enddate}/>
        </Suspense>
      </Section>
    </DashboardLayout>
  );
};

export default InvoicePage;
