import { invoiceSchema, onboardingSchema } from "@/shared/schemas";
import { TypeOf } from "zod";


interface IDashCard {
    id: string;
    title: string;
    link: string;
};

type CurrencyType = "INR" | "USD";

interface ICurrency {
    amount: number;
    currency?: CurrencyType;
}


type InvoiceType = TypeOf<typeof invoiceSchema>
type OnboardUserType = TypeOf<typeof onboardingSchema>

export type {
    IDashCard,
    ICurrency,
    CurrencyType,
    InvoiceType,
    OnboardUserType
}