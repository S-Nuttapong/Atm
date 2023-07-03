import { atmConfigs } from '@entities/atm'
import { TransactionUnderMaintenance } from '@entities/transaction'
import { AtmView } from '@shared/types'
import { ComponentType } from 'react'
import { AtmAppLayoutProps } from './AtmAppLayout'

interface IAtmTransaction extends AtmAppLayoutProps {
  Component: ComponentType
}

export type AtmTransactionMap = Record<AtmView, IAtmTransaction>

const defaultAtmTransaction = atmConfigs.allTransactions.reduce(
  (map, transaction) => {
    map[transaction] = {
      Component: TransactionUnderMaintenance,
      title: 'Our service is under maintenance',
      spacing: 12,
    }
    return map
  },
  {} as AtmTransactionMap
)

export const defineAtmTransactionMap = (
  map: Partial<AtmTransactionMap>
): AtmTransactionMap => ({
  ...defaultAtmTransaction,
  ...map,
})
