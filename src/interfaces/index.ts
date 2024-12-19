

interface IDashCard {
    id: string;
    title: string;
    link: string;
};

type CurrencyType = "INR" | "USD";

interface ICurrency {
    amount: number;
    currency: CurrencyType;
}

export type {
    IDashCard,
    ICurrency,
    CurrencyType
}