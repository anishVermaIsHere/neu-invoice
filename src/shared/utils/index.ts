
import { ICurrency } from "@/interfaces";
import { format } from "date-fns";

const formatCurrency = ({ amount, currency }: ICurrency) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};


const generateInvoiceNumber = () => {
  return format(new Date(),'t');
};

export {
  formatCurrency,
  generateInvoiceNumber
}