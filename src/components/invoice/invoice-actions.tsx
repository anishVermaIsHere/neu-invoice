"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Icons } from "../ui/icons";
import toast from "react-hot-toast";
import { markedInvoiceAsPaid } from "@/app/actions/invoice.action";
import { ActionAlert } from "./action-alert";

const InvoiceActions = ({ id, status }: { id: string; status: string }) => {
  const handleSendReminder = () => {
    toast.promise(
      fetch(`/api/email/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      {
        loading: "Sending reminder email...",
        success: "Reminder email sent successfully",
        error: "Failed to send reminder email",
      }
    );
  };

  const markedAsPaid = () => {
    markedInvoiceAsPaid(id).then(() => {
      toast.success("Marked as paid");
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary">
          <Icons.morehoriz className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/invoices/${id}/edit`}>
            <Icons.pencil className="size-4 mr-2" /> Edit Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/api/invoice/${id}`} target="_blank">
            <Icons.downloadcloud className="size-4 mr-2" /> Download Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSendReminder}>
          <Icons.mail className="size-4 mr-2" /> Reminder Email
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/invoices/${id}/delete`}>
            <Icons.trash className="size-4 mr-2" /> Delete Invoice
          </Link>
        </DropdownMenuItem>
        {status !== "PAID" && (
            <ActionAlert
              toggleButton={
                <DropdownMenuItem>
                  <Icons.circlecheck className="size-4 mr-2" /> Mark as Paid
                </DropdownMenuItem>
              }
              continueHandler={markedAsPaid}
            />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default InvoiceActions;
