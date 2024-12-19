
import { ICurrency } from "@/interfaces";

const formatCurrency = ({ amount, currency }: ICurrency) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export {
  formatCurrency
}