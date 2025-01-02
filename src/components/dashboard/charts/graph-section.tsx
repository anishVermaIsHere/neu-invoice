import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PaidInvoiceGraph from "./paid-invoice-graph";
import { getAuth } from "@/auth";
import { getDashboardData, getPaidInvoices } from "@/lib/prisma/utils";
import TotalInvoiceGraph from "./total-invoice-graph";

const GraphSection = async ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const session = await getAuth();

  const paidInvoices = await getPaidInvoices(
    session?.user?.id as string,
    startDate,
    endDate
  );
  const data = await getDashboardData(
    session?.user?.id as string,
    startDate,
    endDate
  );

  const totalDays =
    (new Date(endDate).getTime() - new Date(startDate).getTime()) /
    (1000 * 60 * 60 * 24);



  return (
    <>
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle>Paid Invoices</CardTitle>
          <CardDescription>
            Invoices which have been paid in the last {totalDays} days.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PaidInvoiceGraph data={paidInvoices} />
        </CardContent>
      </Card>

      <Card className="">
        <CardHeader>
          <CardTitle>Total Invoices</CardTitle>
          <CardDescription>
            Invoices status in the last {totalDays} days.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TotalInvoiceGraph
            data={[
              {
                total: data.paid.length,
                status: "paid",
                fill: "var(--chart-1)",
              },
              {
                total: data.unpaid.length,
                status: "due",
                fill: "var(--chart-2)",
              },
            ]}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default GraphSection;
