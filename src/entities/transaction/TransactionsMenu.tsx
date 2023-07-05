import { atmConfigs } from '@entities/atm'
import { TransactionName } from '@shared/api'
import { Button, Grid } from '@shared/design-system'
import { isTruthy } from '@shared/libs/fp'
import { useAtmNavigation } from '../atm/atm-navigation'

const twoByTwoWrapOnMobile = ['1fr', '1fr 1fr']

const transactionTitleMap: Partial<Record<TransactionName, string>> = {
  ChangePin: 'Change Pin',
  MoneyTransfer: 'Money Transfer',
  ViewBalance: 'View Balance',
  WithdrawCash: 'Withdraw Cash',
}

const transactions = atmConfigs.allTransactions.filter(transaction =>
  isTruthy(transactionTitleMap[transaction])
)

export const TransactionsMenu = () => {
  const { navigate } = useAtmNavigation()

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
