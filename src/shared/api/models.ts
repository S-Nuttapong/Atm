

export type Currency = 'EUR'

export type TransactionName = 'WithdrawCash' | 'EnterPin' | 'ViewBalance' | 'MoneyTransfer' | 'ChangePin'

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

export interface DispensableBanknote extends Cash {
    count: number
}