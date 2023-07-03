import { atmConfigs } from '@entities/atm'
import { Button, Grid } from '@shared/design-system'
import { isTruthy } from '@shared/libs/fp'
import { Transaction } from '@shared/types'
import { useTransactionNavigation } from './transaction-navigation'

const twoByTwoWrapOnMobile = ['1fr', '1fr 1fr']

const transactionTitleMap: Partial<Record<Transaction, string>> = {
  EnterPin: 'Enter Pin',
  MoneyTransfer: 'MoneyTransfer',
  ViewBalance: 'View Balance',
  WithdrawCash: 'Withdraw Cash',
}

const transactions = atmConfigs.allTransactions.filter(transaction =>
  isTruthy(transactionTitleMap[transaction])
)

export const TransactionsMenu = () => {
  const { navigate } = useTransactionNavigation()

  return (
    <Grid
      w="full"
      h="fit-content"
      gridTemplateRows={twoByTwoWrapOnMobile}
      gridTemplateColumns={twoByTwoWrapOnMobile}
      gridGap={10}
    >
      {transactions.map(transaction => (
        <Button
          onClick={() => navigate(transaction)}
          variant="primary"
          size={'lg'}
          key={transaction}
        >
          {transactionTitleMap[transaction]}
        </Button>
      ))}
    </Grid>
  )
}
