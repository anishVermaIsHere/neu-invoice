"use server";
import { invoiceSchema } from "@/shared/schemas";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { formatCurrency } from "@/shared/utils";
import { CurrencyType } from "@/interfaces";
import { mailtrapClient } from "@/config/mailtrap.config";
import AppConfig from "@/config/app.config";
import { addInvoice, markedAsPaid, updateInvoice } from "@/lib/prisma/utils";





const sender = {
  email: AppConfig.mailTrap.senderEmail,
  name: AppConfig.mailTrap.senderName,
};

export async function createInvoice(prevState: any, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

 const invoice = await addInvoice(submission.value);

  const totalAmount = formatCurrency({
    amount: invoice.total,
    currency: invoice.currency as CurrencyType,
  });

  mailtrapClient.send({
    from: sender,
    to: [{ email: invoice.clientEmail }],
    template_uuid: "794e66aa-d559-469d-9730-f6ce99a991e9",
    template_variables: {
      clientName: invoice.clientName,
      invoiceNumber: invoice.invoiceNumber,
      invoiceDate: new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
      }).format(new Date(submission.value.date)),
      invoiceAmount: totalAmount,
      invoiceTotal: totalAmount,
      supportEmail: AppConfig.mailTrap.supportEmail,
      companyName: `${AppConfig.appName} Invoice`
    },
  });

  return redirect("/dashboard/invoices");
}


export async function editInvoice(prevState: any, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

 const invoice = await updateInvoice(formData.get('id') as string, submission.value);

 const totalAmount = formatCurrency({
  amount: invoice.total,
  currency: invoice.currency as CurrencyType,
  });

  mailtrapClient.send({
    from: sender,
    to: [{ email: invoice.clientEmail }],
    template_uuid: "794e66aa-d559-469d-9730-f6ce99a991e9",
    template_variables: {
      clientName: invoice.clientName,
      invoiceNumber: invoice.invoiceNumber,
      invoiceDate: new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
      }).format(new Date(submission.value.date)),
      invoiceAmount: totalAmount,
      invoiceTotal: totalAmount,
      supportEmail: AppConfig.mailTrap.supportEmail,
      companyName: `${AppConfig.appName} Invoice`
    },
  });

  return redirect("/dashboard/invoices");
}

export const markedInvoiceAsPaid = async (invoiceId: string) => {
    await markedAsPaid(invoiceId);
};
