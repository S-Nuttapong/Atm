import { IAtmRepository } from "@entities/atm";
import { IUserRepository } from "@entities/user/UserRepository";
import { dispenseCash } from "@features/withdraw-cash/api/dispenseCash";
import { DispensableBanknote } from "@shared/api";

const calculateRemainingBalance = (balance: number, amount: number, overdraft: number) => {
    const remainingBalance = balance - amount;
    if (remainingBalance < 0 && Math.abs(remainingBalance) > overdraft) throw new Error("Your request has exceeded the overdraft limit. Please contact our customer support for further assistance.")
    return remainingBalance;
}

/**
 * BE implementation
 * @todo as of now the atm and user repositories are required, but once BE is available we can apply dependency injection, so consumers of this do not have to instantiate the repositories every time, hence better DX
 * @todo stress tests this module, particularly withdraw amount, once the requirement has been consolidated
 * @todo delegate to BE
 * @todo we can argue that 
 */
export class WithdrawalCashService {
    constructor(
        private readonly atm: IAtmRepository,
        private readonly user: IUserRepository,
    ) {
        this.atm = atm
        this.user = user
    }

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


