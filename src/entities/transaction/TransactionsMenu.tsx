import { Transaction } from '@shared/types'
import { Button, Grid } from '@shared/ui'
import { useTransactionNavigation } from './transaction-navigation'

//2 by 2 on all view, except mobile: they will be wrap into single column instead
const gridStyle = ['1fr', '1fr 1fr']

const transactions: Transaction[] = [
  'EnterPin',
  'MoneyTransfer',
  'ViewBalance',
  'WithdrawCash',
]

export const TransactionsMenu = () => {
  const { navigate } = useTransactionNavigation()

  return (
    <Grid
      w="full"
      h="fit-content"
      gridTemplateRows={gridStyle}
      gridTemplateColumns={gridStyle}
      gridGap={10}
    >
      {transactions.map(transaction => (
        <Button
          onClick={() => navigate(transaction)}
          variant="primary"
          size="lg"
          key={transaction}
        >
          {transaction}
        </Button>
      ))}
    </Grid>
  )
}
