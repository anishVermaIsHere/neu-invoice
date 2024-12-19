"use server";
import { getAuth, signOut } from "@/auth";
import { invoiceSchema, onboardingSchema } from "@/shared/schemas";
import { parseWithZod } from "@conform-to/zod";
import { prisma } from "@/lib/prisma/db";
import { redirect } from "next/navigation";
import { formatCurrency } from "@/shared/utils";
import { CurrencyType } from "@/interfaces";
import { mailtrapClient } from "@/config/mailtrap.config";


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

  const data = await prisma.invoice.create({
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      description: submission.value.description,
      quantity: submission.value.quantity,
      rate: submission.value.rate,
      name: submission.value.name,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      total: submission.value.total,
      note: submission.value.note,
      userId: session?.user?.id,
    },
  });

  const sender = {
    email: "hello@demomailtrap.com",
    name: "David Paul",
  };

  console.log('invoice', submission.value);
  // mailtrapClient.send({
  //   from: sender,
  //   to: [{ email: "jan@alenix.de" }],
  //   template_uuid: "3c01e4ee-a9ed-4cb6-bbf7-e57c2ced6c94",
  //   template_variables: {
  //     clientName: submission.value.clientName,
  //     invoiceNumber: submission.value.invoiceNumber,
  //     invoiceDueDate: new Intl.DateTimeFormat("en-US", {
  //       dateStyle: "long",
  //     }).format(new Date(submission.value.date)),
  //     invoiceAmount: formatCurrency({
  //       amount: submission.value.total,
  //       currency: submission.value.currency as CurrencyType,
  //     }),
  //     invoiceLink:
  //       process.env.NODE_ENV !== "production"
  //         ? `http://localhost:3000/api/invoice/${data.id}`
  //         : `https://invoice-marshal.vercel.app/api/invoice/${data.id}`,
  //   },
  // });

  // return redirect("/dashboard/invoices");
}
