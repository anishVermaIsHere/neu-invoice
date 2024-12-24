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
import { markedInvoiceAsPaid, invoiceDelete } from "@/app/actions/invoice.action";
import { ActionAlert } from "./alert-modal";
import { useState } from "react";
import useAppStore from "@/store/app.store";

const InvoiceActions = ({ id, status }: { id: string; status: string }) => {
  const { setIsDialog, setDialogConfirm, resetDialog } = useAppStore((s) => s);

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
    setDialogConfirm(() => {
      toast.promise(
        markedInvoiceAsPaid(id),
        {
          loading: "Wait...",
          success: <span>Marked as paid successfully!</span>,
          error: <span>Marked as paid failed.</span>,
        }
      );
      resetDialog();
    });
    setIsDialog(true);
  };

  const handleDeleteInvoice = ()=>{
    setDialogConfirm(() => {
      toast.promise(
        invoiceDelete(id),
        {
          loading: "Wait...",
          success: <span>Invoice deleted successfully!</span>,
          error: <span>Invoice deletion failed.</span>,
        }
      );
      resetDialog();
    });
    setIsDialog(true);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary">
          <Icons.morehoriz className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {status !== "PAID" && (
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/invoices/${id}`}>
              <Icons.pencil className="size-4 mr-2" /> Edit Invoice
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link href={`/api/invoice/${id}`} target="_blank">
            <Icons.downloadcloud className="size-4 mr-2" /> Download Invoice
          </Link>
        </DropdownMenuItem>
        {status !== "PAID" && (
          <DropdownMenuItem onClick={handleSendReminder}>
            <Icons.mail className="size-4 mr-2" /> Reminder Email
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleDeleteInvoice}>
            <Icons.trash className="size-4 mr-2" /> Delete Invoice
        </DropdownMenuItem>
        {status !== "PAID" && (
          <DropdownMenuItem onClick={markedAsPaid}>
            <Icons.circlecheck className="size-4 mr-2" /> Mark as Paid
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default InvoiceActions;
