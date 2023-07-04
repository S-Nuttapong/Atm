import { AtmServices } from "@entities/atm";
import { getBanknotesToDispense } from "@features/withdraw-cash/api/getBanknotesToDispense";
import { Currency } from "@features/withdraw-cash/api/getCurrencySymbol";
import { DispensableBanknote } from "@shared/api";
import { isString } from "@shared/libs/fp";
import { calculateRemainingBanknotes } from "./calculateRemainingBanknotes";


type Norminal = number
type NoteCount = number
export type AtmBankNotes = Record<Norminal, NoteCount>

const toDispensableBanknotesList = (banknotes: AtmBankNotes, currency: Currency) => Object.keys(banknotes).map(Number).map(norminal => ({ value: norminal, count: banknotes[norminal], currency }));
const calculateRemainingBalance = (balance: number, amount: number, overdraft: number) => {
    const remainingBalance = balance - amount;
    return { value: remainingBalance, isOverdraft: remainingBalance < 0 && Math.abs(remainingBalance) > overdraft };
}

/**
 * BE implementation
 * @todo delegate to BE
 * @todo check the business logic with stake holders again what it means to dispense the notes evenly? number of notes wise, note value (denomination * count) wise, or how?
 * @todo Repository should be invoke inside or outside
 */
export class WithdrawalCashService {
    constructor(
        private readonly Atm: AtmServices,
        private readonly user: UserServices,
    ) {
        this.Atm = Atm
        this.user = user
    }

    public async withdraw(amount: number): Promise<{ remainingBalance: number; banknotes: DispensableBanknote[] }> {
        const balance = await this.user.getBalance();
        const { overdraft, currency } = await this.Atm.configs();
        const remainingBalance = calculateRemainingBalance(balance.value, amount, overdraft);

        if (remainingBalance.isOverdraft) throw new Error("Your request has exceeded the overdraft limit. Please contact our customer support for further assistance.")

        const banknotes = await this.Atm.banknotes();
        const banknotesToDispense = getBanknotesToDispense(banknotes, amount);

        if (isString(banknotesToDispense)) throw new Error(banknotesToDispense)

        const remainingBanknotes = calculateRemainingBanknotes(banknotes, banknotesToDispense)
        await this.Atm.updateBanknotes(remainingBanknotes);
        await this.user.updateUserBalance(remainingBalance.value);
        return { remainingBalance: remainingBalance.value, banknotes: toDispensableBanknotesList(banknotesToDispense, currency) };
    }
}


