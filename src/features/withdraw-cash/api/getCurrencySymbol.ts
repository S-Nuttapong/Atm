import { Currency } from "@shared/api";

const currencySymbolMap: Record<Currency, string> = {
    EUR: "€", // Euro
    // GBP: "£", // British Pound Sterling
    // JPY: "¥", // Japanese Yen
    // CHF: "Fr.", // Swiss Franc
    // SEK: "kr", // Swedish Krona
    // NOK: "kr", // Norwegian Krone
    // DKK: "kr", // Danish Krone
} as const;

export const getCurrencySymbol = (currency: Currency) => currencySymbolMap[currency]

