import {
  TransactionsMenu,
  useTransactionNavigation,
} from '@entities/transaction'
import { EnterPin } from '@features/enter-pin'
import { WithdrawCash } from '@features/withdraw-cash'
import { Transaction } from '@shared/types'
import { Box, Flex } from '@shared/ui'
import { ComponentType } from 'react'
import { AtmLayout } from './AtmLayout'
import { TransactionNotAvailable } from './TransactionNotAvailable'

type AtmTransactionUiMap = Record<Transaction, ComponentType>

const allTransactions: Transaction[] = [
  'EnterPin',
  'MoneyTransfer',
  'TransactionsMenu',
  'ViewBalance',
  'WithdrawCash',
]

const defaultAtmTransaction = allTransactions.reduce((map, transaction) => {
  map[transaction] = TransactionNotAvailable
  return map
}, {} as AtmTransactionUiMap)

const AtmTransactionMap: AtmTransactionUiMap = {
  ...defaultAtmTransaction,
  EnterPin,
  WithdrawCash,
  TransactionsMenu,
}

function App() {
  const { transaction } = useTransactionNavigation()
  const AtmTransaction = AtmTransactionMap[transaction]
  return (
    <Box w="100vw" h="100vh">
      <Flex h="full" w="full" alignItems="center" justifyContent="center">
        <AtmLayout>
          <AtmTransaction />
        </AtmLayout>
      </Flex>
    </Box>
  )
}

export default App
