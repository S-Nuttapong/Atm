import { contextFactory } from '@shared/lib/context'
import { ComponentWithChildren, Transaction } from '@shared/types'
import { useState } from 'react'

interface ITransactionNavigationContext {
  navigate: (transaction: Transaction) => void
  goToMainMenu: () => void
  exit: () => void
  transaction: Transaction
}

type TransactionNavigationProvider = ComponentWithChildren<{
  transaction?: Transaction
}>

const contextError =
  'useTransactionNavigation must be wrapped by TransactionNavigationProvider'

const [useTransactionNavigation, context] =
  contextFactory<ITransactionNavigationContext>({ contextError })

const defaultTransaction: Transaction = 'EnterPin'

const TransactionNavigationProvider: TransactionNavigationProvider = props => {
  const initialTransaction = props?.transaction ?? defaultTransaction
  const [transaction, navigate] = useState(initialTransaction)
  const goToMainMenu = () => navigate('TransactionsMenu')
  const exit = () => navigate('EnterPin')

  return (
    <context.Provider value={{ transaction, goToMainMenu, exit, navigate }}>
      {props?.children}
    </context.Provider>
  )
}

export { TransactionNavigationProvider, useTransactionNavigation }
