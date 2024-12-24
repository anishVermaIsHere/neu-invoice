import { invoiceSchema, onboardingSchema } from "@/shared/schemas";
import { LucideProps } from "lucide-react";
import { TypeOf } from "zod";


interface IDashCard {
    id: string;
    title: string;
    description: string;
    value: number;
    link: string;
    icon: (props: LucideProps) => JSX.Element;
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