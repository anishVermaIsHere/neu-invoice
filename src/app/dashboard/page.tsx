import DashboardLayout from "@/components/dashboard/dashboard-layout";
import DashCard from "@/components/dashboard/dashboard-card";
import { redirect } from "next/navigation";
import { getAuth } from "@/auth";
import { getDashboardData } from "@/lib/prisma/utils";
import { Icons } from "@/components/ui/icons";
import GraphSection from "@/components/dashboard/charts/graph-section";
import Empty from "@/components/ui/empty";
import LinkElement from "@/components/ui/link";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import Section from "@/components/common/section";
import DashNavbar from "@/components/dashboard/navbar/dash-nav";

const DashboardPage = async ({
  searchParams,
}: {
  searchParams: { startdate: string; enddate: string };
}) => {
  const session = await getAuth();
  const sParams = await searchParams;
  const { startdate, enddate } = sParams;

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { total, paid, unpaid } = await getDashboardData(
    session?.user?.id,
    startdate,
    enddate
  );

  const dashboardCards = [
    {
      id: `nS6bapRc-PP85up-xFojv`,
      title: "Total revenue",
      description: "Invoices amount",
      value: total.reduce((acc, curr) => acc + curr.total, 0) || 0,
      link: "",
      icon: Icons.receiptdollar,
    },
    {
      id: `MFpMNW3WxRuJfNKNACsUS`,
      title: "Total invoices",
      description: "Issued invoices",
      value: total?.length || 0,
      link: "",
      icon: Icons.receipttext,
    },
    {
      id: `fESkBROFGeX-uVn_zBXXK`,
      title: "Total paid",
      description: "Invoices have been paid",
      value: paid?.length || 0,
      link: "",
      icon: Icons.creditcard,
    },
    {
      id: `DOb6Ew8nFIsSVrX-AXEqk`,
      title: "Total dues",
      description: "Unpaid invoices",
      value: unpaid?.length || 0,
      link: "",
      icon: Icons.rows,
    },
  ];

  return (
    <DashboardLayout>
        <DashNavbar title={`Hi ${session?.user?.firstName}!` || "User"} />
      {total?.length ? (
        <>
          <Section classes="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
            {dashboardCards.map((dcard) => (
              <DashCard key={dcard.id} {...dcard} />
            ))}
          </Section>

          <Section classes="grid grid-cols-1 gap-4 xl:grid-cols-3 mb-4">
            <GraphSection startDate={startdate} endDate={enddate} />
          </Section>

          <Section>
            <RecentInvoices />
          </Section>
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <Empty message="No invoices, first create" />
          <LinkElement href="/dashboard/invoices/create" classes="">
            <Icons.plus className="size-4" />
            Create
          </LinkElement>
        </div>
      )}
    </DashboardLayout>
  );
};

export default DashboardPage;
