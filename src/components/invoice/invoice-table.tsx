import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { invoices } from "@/shared/data"  
import InvoiceActions from "./invoice-actions"
import { Badge } from "../ui/badge"
import { format } from "date-fns";


const invoiceStatus = (status: string) => {
    switch (status?.toLowerCase()) {
        case "paid":
            return <Badge className="text-green-500 bg-muted hover:bg-muted max-w-20 p-2 rounded">{status}</Badge>
        case "pending":
            return <Badge className="text-orange-500 bg-muted hover:bg-muted  max-w-20 p-2 rounded">{status}</Badge>
        case "unpaid":
            return <Badge className="text-red-500 bg-muted hover:bg-muted  max-w-20 p-2 rounded">{status}</Badge>
        default:
            return
    }
}
  
  export function InvoiceTable() {
    return (
      <Table className="caption-top">
        <TableCaption className="font-semibold text-lg">Recent invoices</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Inv. No.</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="">Date</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-center">Actions</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice?.id}>
              <TableCell className="font-medium">{invoice?.id}</TableCell>
              <TableCell>{invoice?.customerName}</TableCell>
              <TableCell className="">{format(invoice?.date, 'dd/MM/yyyy')}</TableCell>
              <TableCell className="text-center">{invoiceStatus(invoice.paymentStatus)}</TableCell>
              <TableCell className="text-center">{invoice?.paymentMethod}</TableCell>
              <TableCell className="text-right">{invoice?.totalAmount}</TableCell>
              <TableCell className="text-center"><InvoiceActions id={invoice?.id} status={invoice?.paymentStatus} /></TableCell>
              
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="font-semibold">Total</TableCell>
            <TableCell className="text-right font-semibold">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
  