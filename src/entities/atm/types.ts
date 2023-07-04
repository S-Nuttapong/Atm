import { TransactionName } from "@shared/api";

export type WithTransactionEvent<T extends string> = T | `${T}Success` | `${T}Failed` | `${T}Pending`

export type AtmView = 'TransactionsMenu' | WithTransactionEvent<TransactionName>
