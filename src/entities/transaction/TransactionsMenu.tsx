import { Button, Grid } from '@shared/design-system'
import { capitalizeBy } from '@shared/libs/fp'
import { Transaction } from '@shared/types'
import { useTransactionNavigation } from './transaction-navigation'

const twoByTwoWrapOnMobile = ['1fr', '1fr 1fr']

const transactions: Transaction[] = [
  'Enter_Pin',
  'Money_Transfer',
  'View_Balance',
  'Withdraw_Cash',
]
const capitalizeWordsSeparatedByUnderScore = capitalizeBy('_', ' ')

const transactionsMenuData = transactions.map(transaction => ({
  title: capitalizeWordsSeparatedByUnderScore(transaction),
  transaction,
}))

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
      {transactionsMenuData.map(data => (
        <Button
          onClick={() => navigate(data.transaction)}
          variant="primary"
          size={'lg'}
          key={data.title}
        >
          {data.title}
        </Button>
      ))}
    </Grid>
  )
}
