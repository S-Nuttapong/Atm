import { AtmView, WithTransactionEvent } from "@entities/atm";
import { TransactionName } from "@shared/api";

const allTransactions: TransactionName[] = [
    'EnterPin',
    'MoneyTransfer',
    'ViewBalance',
    'WithdrawCash',
    'ChangePin',
]

const getAllAtmViews = <T extends TransactionName>(names: T[]): WithTransactionEvent<T>[] => {
    return names.map((name) => `${name}Success` as WithTransactionEvent<T>)
        .concat(names.map((name) => `${name}Failed` as WithTransactionEvent<T>))
        .concat(names.map((name) => `${name}Pending` as WithTransactionEvent<T>));
}

const allViews: AtmView[] = getAllAtmViews(allTransactions)

export const atmConfigs = {
    allTransactions,
    allViews
}