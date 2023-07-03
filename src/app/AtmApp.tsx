import { atmConfigs } from '@entities/atm'
import {
  TransactionNotAvailable,
  TransactionsMenu,
  useTransactionNavigation,
} from '@entities/transaction'
import { EnterPin } from '@features/enter-pin'
import { WithdrawCash } from '@features/withdraw-cash'
import { Box, Flex } from '@shared/design-system'
import { Transaction } from '@shared/types'
import { ComponentType } from 'react'
import { AtmLayout } from './AtmLayout'

type AtmTransactionUiMap = Record<Transaction, ComponentType>

const defaultAtmTransaction = atmConfigs.allTransactions.reduce(
  (map, transaction) => {
    map[transaction] = TransactionNotAvailable
    return map
  },
  {} as AtmTransactionUiMap
)

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
    <Box w="100vw" h="100vh" bg="bg.primary">
      <Flex h="full" w="full" alignItems="center" justifyContent="center">
        <AtmLayout>
          <AtmTransaction />
        </AtmLayout>
      </Flex>
    </Box>
  )
}

export default App
