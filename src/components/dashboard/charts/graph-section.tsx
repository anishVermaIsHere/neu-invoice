import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PaidInvoiceGraph from "./paid-invoice-graph";
import { getAuth } from "@/auth";
import {
  getDashboardData,
  getPaidInvoices,
} from "@/lib/prisma/utils";
import TotalInvoiceGraph from "./total-invoice-graph";

const GraphSection = async () => {
  const session = await getAuth();

  const paidInvoices = await getPaidInvoices(session?.user?.id as string);
  const data = await getDashboardData(session?.user?.id as string);

  return (
    <>
      <Card className="xl:col-span-2 bg-gray-50">
        <CardHeader>
          <CardTitle>Paid Invoices</CardTitle>
          <CardDescription>
            Invoices which have been paid in the last 12 months.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PaidInvoiceGraph data={paidInvoices} />
        </CardContent>
      </Card>

      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle>Total Invoices</CardTitle>
          <CardDescription>
            Invoices status in the last 12 months.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TotalInvoiceGraph
            data={[{ total: data.paid.length, status: "paid", fill: "hsl(var(--chart-1))" },{ total: data.unpaid.length, status: "due", fill: "hsl(var(--chart-2))" }]}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default GraphSection;
