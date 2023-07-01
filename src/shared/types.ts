import { FC, PropsWithChildren } from "react";

export type ComponentWithChildren<P = unknown> = FC<PropsWithChildren<P>>

export type Transaction = 'WithdrawCash' | 'EnterPin' | 'ViewBalance' | 'MoneyTransfer' | 'TransactionsMenu'