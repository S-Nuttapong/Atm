import { IAtmRepository } from "@entities/atm";
import { IUserRepository } from "@entities/user/UserRepository";
import { dispenseCash } from "@features/withdraw-cash/api/dispenseCash";
import { DispensableBanknote } from "@shared/api";

/**
 * Calculates the remaining balance after deducting the withdrawal amount from the current balance.
 * @param balance - The current balance.
 * @param amount - The withdrawal amount.
 * @param overdraft - The overdraft limit.
 * @returns The remaining balance after deducting the withdrawal amount.
 * @throws {Error} If the remaining balance is less than 0 and exceeds the overdraft limit.
 */
const calculateRemainingBalance = (balance: number, amount: number, overdraft: number): number => {
    const remainingBalance = balance - amount;
    if (remainingBalance < 0 && Math.abs(remainingBalance) > overdraft) {
        throw new Error(
            "Your request has exceeded the overdraft limit. Please contact our customer support for further assistance."
        );
    }
    return remainingBalance;
}

/**
 * Withdrawal Cash Service implementation.
 * Employs the "fail fast" practice by throwing an error if the remaining balance is insufficient.
 */
export class WithdrawalCashService {
    /**
     * Creates an instance of WithdrawalCashService.
     * @param atm - The ATM repository.
     * @param user - The user repository.
     */
    constructor(
        private readonly atm: IAtmRepository,
        private readonly user: IUserRepository,
    ) {
        this.atm = atm;
        this.user = user;
    }

    /**
     * Withdraws the specified amount from the user's balance.
     * @param amount - The withdrawal amount.
     * @returns A Promise that resolves to an object containing the remaining balance and the banknotes to dispense.
     * @throws {Error} If the remaining balance is insufficient or if there is an error during the withdrawal process.
     */
    public async withdraw(amount: number): Promise<{ remainingBalance: number; banknotes: DispensableBanknote[] }> {
        const balance = await this.user.getBalance();
        const { overdraft, currency } = await this.atm.configs();
        const remainingBalance = calculateRemainingBalance(balance.value, amount, overdraft);
        const banknotes = await this.atm.banknotes();
        const result = dispenseCash(banknotes, amount, currency);
        await this.atm.updateBanknotes(result.remainingBanknotes);
        await this.user.updateUserBalance(remainingBalance);
        return { remainingBalance: remainingBalance, banknotes: result.banknotesToDispense };
    }
}
