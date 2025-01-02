import { ICurrency } from "@/interfaces";
import { format, endOfMonth, subDays } from "date-fns";

const formatCurrency = ({ amount, currency = "USD" }: ICurrency) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

const generateInvoiceNumber = () => {
  return format(new Date(), "t");
};

const getDateOfPrevMonth = (currentDate: Date | string) => {
  const prevMonDays = subDays(currentDate, 30);
  return endOfMonth(prevMonDays);
};

const getStartEndDates = (numberOfDays: number = 30) => ({
  startDate: subDays(new Date(), numberOfDays),
  endDate: new Date(),
});

export {
  formatCurrency,
  generateInvoiceNumber,
  getDateOfPrevMonth,
  getStartEndDates,
};
