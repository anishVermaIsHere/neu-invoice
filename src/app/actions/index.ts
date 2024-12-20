"use server";
import { getAuth, signOut } from "@/auth";
import { invoiceSchema, onboardingSchema } from "@/shared/schemas";
import { parseWithZod } from "@conform-to/zod";
import { prisma } from "@/lib/prisma/db";
import { redirect } from "next/navigation";
import { formatCurrency } from "@/shared/utils";
import { CurrencyType } from "@/interfaces";
import { mailtrapClient } from "@/config/mailtrap.config";
import AppConfig from "@/config/app.config";
import fakeInvoices from "@/shared/data/Invoice.json"


export const handleLogout = async () => await signOut();

export const onboardUser = async (prevState: any, formData: FormData) => {
  const session = await getAuth();

  const submission = parseWithZod(formData, {
    schema: onboardingSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.user.update({
    where: {
      id: session?.user?.id,
    },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      address: submission.value.address,
    },
  });

  return redirect("/dashboard");
};

export async function createInvoice(prevState: any, formData: FormData) {
  const session = await getAuth();

  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.invoice.createMany({
    data: fakeInvoices.map((s)=>({
      clientAddress: s.clientAddress,
      clientEmail: s.clientEmail,
      clientName: s.clientName,
      currency: s.currency,
      date: submission.value.date,
      dueDate: s.dueDate,
      fromAddress: s.fromAddress,
      fromEmail: s.fromEmail,
      fromName: s.fromName,
      description: s.description,
      quantity: s.quantity,
      rate: s.rate,
      name: s.name,
      invoiceNumber: s.invoiceNumber,
      status: "PENDING",
      total: s.total,
      note: s.note,
      userId: session?.user?.id,
    })),
  });

  const totalAmount = formatCurrency({
    amount: submission.value.total,
    currency: submission.value.currency as CurrencyType,
  });

  const sender = {
    email: AppConfig.mailTrap.senderEmail,
    name: AppConfig.mailTrap.senderName,
  };


  console.log('invoice', data);

  // mailtrapClient.send({
  //   from: sender,
  //   to: [{ email: submission.value.clientEmail }],
  //   template_uuid: "794e66aa-d559-469d-9730-f6ce99a991e9",
  //   template_variables: {
  //     clientName: submission.value.clientName,
  //     invoiceNumber: submission.value.invoiceNumber,
  //     invoiceDate: new Intl.DateTimeFormat("en-US", {
  //       dateStyle: "long",
  //     }).format(new Date(submission.value.date)),
  //     invoiceAmount: totalAmount,
  //     invoiceTotal: totalAmount,
  //     supportEmail: AppConfig.mailTrap.supportEmail,
  //     companyName: `${AppConfig.appName} Invoice`
  //     // invoiceLink:
  //     //   process.env.NODE_ENV !== "production"
  //     //     ? `http://localhost:3000/api/invoice/${data.id}`
  //     //     : `https://invoice-marshal.vercel.app/api/invoice/${data.id}`,
  //   },
  // });

  // return redirect("/dashboard/invoices");
}
