import { Currency } from "@shared/libs/currency";
import { FC, PropsWithChildren } from "react";

export type ComponentWithChildren<P = unknown> = FC<PropsWithChildren<P>>

export type TransactionName = 'WithdrawCash' | 'EnterPin' | 'ViewBalance' | 'MoneyTransfer' | 'ChangePin'
export type WithTransactionEvent<T extends string> = T | `${T}Success` | `${T}Failed` | `${T}Pending`
export type AtmView = 'TransactionsMenu' | WithTransactionEvent<TransactionName>

export type UseVerifyPinConfigs = {
    onSuccess?: (data: User, variables: string, context: unknown) => void | Promise<unknown>
    onError?: (error: unknown, variables: string, context: unknown) => void | Promise<unknown>
}
export interface Cash {
    value: number,
    currency: Currency
}

export interface User {
    id: string
    firstName: string
    lastName: string
    pin: string
    balance: Cash
    accountId: string
}

export type getUserInformation = (pin: string) => Promise<User>

export interface PinVerificationResponse {
    currentBalance: number;
}

//
//how many available today
export interface DispensableBanknote extends Cash {
    count: number
}