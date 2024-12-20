"use client";
import { useActionState, useState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent,PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { invoiceSchema } from "@/shared/schemas";
import { formatCurrency } from "@/shared/utils";
import { createInvoice } from "@/app/actions";
import { Icons } from "../ui/icons";
import { CurrencyType } from "@/interfaces";
import { User } from "@/store/auth.store";
import { currencies } from "@/shared/data";


export function CreateInvoice({
  address,
  email,
  firstName,
  lastName,
}: Omit<User, "id" | "image">) {
  const [lastResult, action] = useActionState(createInvoice, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: invoiceSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [invoiceValues, setInvoiceValues] = useState({
    rate: "",
    quantity: "",
    currency: "USD",
    date: new Date(),
  });


  const calcualteTotal =
    (Number(invoiceValues.quantity) || 0) * (Number(invoiceValues.rate) || 0);

  const handleChange = (key: string, value: string | Date | undefined) => {
    setInvoiceValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="w-full min-h-[60vh] border-none shadow-none mx-auto">
      <CardContent className="p-6">
        <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate>
          <input
            type="hidden"
            name={fields.date.name}
            value={invoiceValues.date.toISOString()}
          />

          <input
            type="hidden"
            name={fields.total.name}
            value={calcualteTotal}
          />

          <div className="flex flex-col gap-1 w-fit mb-6">
            <div className="flex items-center gap-4">
            <Label>Invoice label</Label>
              <Input
                name={fields.name.name}
                key={fields.name.key}
                defaultValue={fields.name.initialValue}
                placeholder="Invoice I2024"
              />
            </div>
            <p className="text-sm text-red-500">{fields.name.errors}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <Label>Invoice No.</Label>
              <div className="flex">
                <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">
                  #
                </span>
                <Input
                  name={fields.invoiceNumber.name}
                  key={fields.invoiceNumber.key}
                  defaultValue={fields.invoiceNumber.initialValue}
                  className="rounded-l-none"
                  placeholder="5"
                />
              </div>
              <p className="text-red-500 text-sm">
                {fields.invoiceNumber.errors}
              </p>
            </div>

            <div>
              <Label>Currency</Label>
              <Select
                defaultValue="USD"
                name={fields.currency.name}
                key={fields.currency.key}
                onValueChange={(value) => handleChange("currency", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((cur) => (
                    <SelectItem key={cur.id} value={cur.value}>
                      {cur.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-red-500 text-sm">{fields.currency.errors}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label>From</Label>
              <div className="space-y-2">
                <Input
                  name={fields.fromName.name}
                  key={fields.fromName.key}
                  placeholder="Your Name"
                  defaultValue={firstName + " " + lastName}
                />
                <p className="text-red-500 text-sm">{fields.fromName.errors}</p>
                <Input
                  placeholder="Your Email"
                  name={fields.fromEmail.name}
                  key={fields.fromEmail.key}
                  defaultValue={email as string}
                />
                <p className="text-red-500 text-sm">
                  {fields.fromEmail.errors}
                </p>
                <Input
                  placeholder="Your Address"
                  name={fields.fromAddress.name}
                  key={fields.fromAddress.key}
                  defaultValue={address}
                />
                <p className="text-red-500 text-sm">
                  {fields.fromAddress.errors}
                </p>
              </div>
            </div>

            <div>
              <Label>To</Label>
              <div className="space-y-2">
                <Input
                  name={fields.clientName.name}
                  key={fields.clientName.key}
                  defaultValue={fields.clientName.initialValue}
                  placeholder="Client Name"
                />
                <p className="text-red-500 text-sm">
                  {fields.clientName.errors}
                </p>
                <Input
                  name={fields.clientEmail.name}
                  key={fields.clientEmail.key}
                  defaultValue={fields.clientEmail.initialValue}
                  placeholder="Client Email"
                />
                <p className="text-red-500 text-sm">
                  {fields.clientEmail.errors}
                </p>
                <Input
                  name={fields.clientAddress.name}
                  key={fields.clientAddress.key}
                  defaultValue={fields.clientAddress.initialValue}
                  placeholder="Client Address"
                />
                <p className="text-red-500 text-sm">
                  {fields.clientAddress.errors}
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <div>
                <Label>Date</Label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[280px] text-left justify-start"
                  >
                    <Icons.calendar />

                    {invoiceValues.date ? (
                      new Intl.DateTimeFormat("en-US", {
                        dateStyle: "long",
                      }).format(new Date(invoiceValues.date))
                    ) : (
                      <span>Pick a Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    selected={invoiceValues.date}
                    onSelect={(date) => handleChange("date", date)}
                    mode="single"
                    fromDate={new Date()}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-red-500 text-sm">{fields.date.errors}</p>
            </div>

            <div>
              <Label>Invoice Due</Label>
              <Select
                name={fields.dueDate.name}
                key={fields.dueDate.key}
                defaultValue={fields.dueDate.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select due date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Due on Reciept</SelectItem>
                  <SelectItem value="15">Net 15</SelectItem>
                  <SelectItem value="30">Net 30</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500 text-sm">{fields.dueDate.errors}</p>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
              <p className="col-span-6">Description</p>
              <p className="col-span-2">Quantity</p>
              <p className="col-span-2">Rate</p>
              <p className="col-span-2">Amount</p>
            </div>

            <div className="grid grid-cols-12 gap-4 mb-4">
              <div className="col-span-6">
                <Textarea
                  className="resize-none"
                  rows={5}
                  name={fields.description.name}
                  key={fields.description.key}
                  defaultValue={fields.description.initialValue}
                  placeholder="Item name & description"
                />
                <p className="text-red-500 text-sm">
                  {fields.description.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  name={fields.quantity.name}
                  key={fields.quantity.key}
                  type="number"
                  placeholder="0"
                  value={invoiceValues.quantity}
                  onChange={(e) => handleChange("quantity", e.target.value)}
                />
                <p className="text-red-500 text-sm">{fields.quantity.errors}</p>
              </div>
              <div className="col-span-2">
                <Input
                  name={fields.rate.name}
                  key={fields.rate.key}
                  value={invoiceValues.rate}
                  onChange={(e) => handleChange("rate", e.target.value)}
                  type="number"
                  placeholder="0"
                />
                <p className="text-red-500 text-sm">{fields.rate.errors}</p>
              </div>
              <div className="col-span-2">
                <Input
                  value={formatCurrency({
                    amount: calcualteTotal,
                    currency: invoiceValues.currency as CurrencyType,
                  })}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="w-1/3">
              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span>
                  {formatCurrency({
                    amount: calcualteTotal,
                    currency: invoiceValues.currency as CurrencyType,
                  })}
                </span>
              </div>
              <div className="flex justify-between py-2 border-t">
                <span>Total ({invoiceValues.currency})</span>
                <span className="font-medium underline underline-offset-2">
                  {formatCurrency({
                    amount: calcualteTotal,
                    currency: invoiceValues.currency as CurrencyType,
                  })}
                </span>
              </div>
            </div>
          </div>

          <div>
            <Label>Note</Label>
            <Textarea
              className="resize-none"
              rows={5}
              name={fields.note.name}
              key={fields.note.key}
              defaultValue={fields.note.initialValue}
              placeholder="Add your Note/s right here..."
            />
            <p className="text-red-500 text-sm">{fields.note.errors}</p>
          </div>

          <div className="flex items-center justify-end mt-6">
            <div>
              <Button>Send to Client</Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
