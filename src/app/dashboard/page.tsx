import DashboardLayout from "@/components/dashboard/dashboard-layout";
import DashCard from "@/components/dashboard/dashboard-card";
import { redirect } from "next/navigation";
import { getAuth } from "@/auth";
import { getDashboardData } from "@/lib/prisma/utils";
import { Icons } from "@/components/ui/icons";
import InvoiceGraph from "@/components/dashboard/charts/invoice-graph";

const DashboardPage = async () => {
  const session = await getAuth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const invoices = await getDashboardData(session?.user?.id);

  const dashboardCards = [
    {
      id: `nS6bapRc-PP85up-xFojv`,
      title: "Total revenue",
      description: "Invoices amount",
      value: invoices.reduce((acc, curr) => acc + curr.total, 0),
      link: "",
      icon: Icons.receiptdollar,
    },
    {
      id: `MFpMNW3WxRuJfNKNACsUS`,
      title: "Total invoices",
      description: "Issued invoices",
      value: invoices.length,
      link: "",
      icon: Icons.receipttext,
    },
    {
      id: `fESkBROFGeX-uVn_zBXXK`,
      title: "Total paid",
      description: "Invoices have been paid",
      value: invoices.filter((d) => d.status === "PAID").length,
      link: "",
      icon: Icons.creditcard,
    },
    {
      id: `DOb6Ew8nFIsSVrX-AXEqk`,
      title: "Total dues",
      description: "Unpaid invoices",
      value: invoices.filter((d) => d.status === "PENDING").length,
      link: "",
      icon: Icons.rows,
    },
  ];

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {dashboardCards.map((dcard) => (
          <DashCard key={dcard.id} {...dcard} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
        <InvoiceGraph />
        {/* <RecentInvoices /> */}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
