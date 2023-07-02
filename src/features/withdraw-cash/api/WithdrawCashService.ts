import { AtmServices } from "@entities/atm";
import { UserServices } from "@entities/user";
import { getBanknotesToDispense } from "@features/withdraw-cash/api/getBanknotesToDispense";
import { calculateRemainingBalance } from "@features/withdraw-cash/api/getRemainingBalance";
import { DispensableBanknote } from "@shared/types";
import { isString } from "remeda";
import { calculateRemainingBanknotes } from "./calculateRemainingBanknotes";
import { toDispensableBanknotesList } from "./toDispensableBanknotesList";


type Norminal = number
type NoteCount = number
export type AtmBankNotes = Record<Norminal, NoteCount>


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

        if (remainingBalance.isOverdraft) throw new Error("Your request has exceed our overdraft limit please contact our officer")

        const banknotes = await this.Atm.banknotes();
        const banknotesToDispense = getBanknotesToDispense(banknotes, amount);

        if (isString(banknotesToDispense)) throw new Error(banknotesToDispense)

        const remainingBanknotes = calculateRemainingBanknotes(banknotes, banknotesToDispense)
        await this.Atm.updateBanknotes(remainingBanknotes);
        await this.user.updateUserBalance(remainingBalance.value);
        console.debug({ initial: banknotes, taken: banknotesToDispense, remaining: await this.Atm.banknotes() })
        return { remainingBalance: remainingBalance.value, banknotes: toDispensableBanknotesList(banknotesToDispense, currency) };
    }
}


