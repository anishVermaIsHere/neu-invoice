import { z, object, string, number } from "zod";

export const onboardingSchema = object({
  firstName: string().min(2, "First name is required"),
  lastName: string().min(1, "Last name is required"),
  address: string().min(2, "Address is required"),
});

export const invoiceSchema = object({
  invoiceNumber: number().min(1, "Invoice number is required"),
  name: string().min(1, "Invoice Name is required"),
  description: string().min(1, "Description is required"),
  quantity: number().min(1, "Quantity is required"),
  rate: number().min(1, "Rate is required"),
  total: number().min(1, "1$ is minimum"),
  date: string().min(1, "Date is required"),
  status: z.enum(["PAID", "PENDING"]).default("PENDING"),
  dueDate: string().min(1, "Due Date is required"),
  fromName: string().min(1, "Your name is required"),
  fromEmail: string().email("Invalid Email address"),
  fromAddress: string().min(1, "Your address is required"),
  clientName: string().min(1, "Client name is required"),
  clientEmail: string().email("Invalid Email address"),
  clientAddress: string().min(1, "Client address is required"),
  currency: string().min(1, "Currency is required"),
  note: string().optional(),
});
