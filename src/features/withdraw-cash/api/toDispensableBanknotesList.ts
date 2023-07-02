import { Currency } from "@shared/libs/currency";
import { AtmBankNotes } from "./WithdrawCashService";

export const toDispensableBanknotesList = (banknotes: AtmBankNotes, currency: Currency) => Object.keys(banknotes).map(Number).map(norminal => ({ value: norminal, count: banknotes[norminal], currency }));
