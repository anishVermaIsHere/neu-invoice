import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { invoices } from "@/shared/data"
import InvoiceActions from "./invoice-actions";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { getInvoices } from "@/lib/prisma/utils";
import { getAuth } from "@/auth";
import { formatCurrency } from "@/shared/utils";
import Empty from "../ui/empty";

const invoiceStatus = (status: string) => {
  switch (status?.toLowerCase()) {
    case "paid":
      return (
        <Badge className="text-green-500 bg-muted hover:bg-muted max-w-20 p-2 rounded">
          {status}
        </Badge>
      );
    case "pending":
      return (
        <Badge className="text-orange-500 bg-muted hover:bg-muted  max-w-20 p-2 rounded">
          {status}
        </Badge>
      );
    case "unpaid":
      return (
        <Badge className="text-red-500 bg-muted hover:bg-muted  max-w-20 p-2 rounded">
          {status}
        </Badge>
      );
    default:
      return;
  }
};

export async function InvoiceTable() {
  const session = await getAuth();
  const invoices = await getInvoices(session?.user?.id as string);
  const grandTotal = invoices.reduce((a, p) => a + p.total, 0);

  return invoices.length ? (
    <Table className="caption-top">
      <TableCaption className="font-semibold text-lg">
        Recent invoices
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Inv. No.</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead className="">Date</TableHead>
          <TableHead className="">Qty</TableHead>
          <TableHead className="">Rate</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Method</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice?.id}>
            <TableCell className="font-medium">
              {invoice?.invoiceNumber}
            </TableCell>
            <TableCell>{invoice?.clientName}</TableCell>
            <TableCell className="">
              {format(invoice?.date, "dd/MM/yyyy")}
            </TableCell>
            <TableCell>{invoice?.quantity}</TableCell>
            <TableCell>{invoice?.rate}</TableCell>
            <TableCell className="text-right">{invoice?.total}</TableCell>
            <TableCell className="text-center">
              {invoiceStatus(invoice?.status)}
            </TableCell>
            <TableCell className="text-center">
              {invoice?.paymentMethod || "-"}
            </TableCell>
            <TableCell className="text-center">
              <InvoiceActions
                id={invoice?.id}
                status={invoice?.paymentStatus}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className="bg-white">
          <TableCell colSpan={5} className="font-semibold">
            Total
          </TableCell>
          <TableCell className="text-right font-semibold">
            {formatCurrency({
              amount: grandTotal,
              currency: "USD",
            })}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    
  ) : (
    <Empty message="No invoices create" />
  );
}
