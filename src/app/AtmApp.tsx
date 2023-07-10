import { TransactionsMenu, useAtmNavigation } from '@entities/transaction'
import { useUserQuery } from '@entities/user'
import { EnterPin } from '@features/enter-pin'
import {
  WithdrawCash,
  WithdrawCashFail,
  WithdrawCashSuccess,
} from '@features/withdraw-cash'
import { Cash, User } from '@shared/api'
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Txt,
} from '@shared/design-system'
import { AtmAppLayout } from './AtmAppLayout'
import { defineAtmTransactionMap } from './defineAtmTransactionMap'

const ViewBalance = () => {
  const user = useUserQuery<User>()
  const { backToMainMenu } = useAtmNavigation()
  const formatBalance = (balance: Cash) =>
    balance.value.toLocaleString('en-US', {
      style: 'currency',
      currency: balance.currency,
      currencyDisplay: 'symbol',
    })

  return (
    <Stack>
      <Heading variant="h3">{JSON.stringify(user)}</Heading>
      <Txt variant="body1" fontWeight="light">
        {formatBalance(user.balance)}
      </Txt>
      <Center>
        <Button variant="primary" w="full" maxW={48} onClick={backToMainMenu}>
          Back
        </Button>
      </Center>
    </Stack>
  )
}

const atmTransactionMap = defineAtmTransactionMap({
  EnterPin: {
    Component: EnterPin,
    showExitButton: false,
    showUsername: false,
    title: 'Please Enter Your PIN',
  },
  ViewBalance: {
    Component: ViewBalance,
    title: 'Your balance',
    spacing: 20,
  },
  WithdrawCashFailed: {
    Component: WithdrawCashFail,
    title: 'Your Transaction Cannot Be Completed...',
    spacing: 20,
  },
  WithdrawCashSuccess: {
    Component: WithdrawCashSuccess,
    title: 'Please ensure to collect your cash',
    spacing: 20,
  },
  WithdrawCash: {
    Component: WithdrawCash,
    title: 'Enter amount you wish to withdraw',
  },
  TransactionsMenu: {
    Component: TransactionsMenu,
    title: 'Choose your transaction',
  },
})

function App() {
  const { view } = useAtmNavigation()
  const { Component: AtmView, ...layoutProps } = atmTransactionMap[view]
  return (
    <Box w="100vw" h="100vh" bg="bg.primary">
      <Flex h="full" w="full" alignItems="center" justifyContent="center">
        <AtmAppLayout {...layoutProps}>
          <AtmView />
        </AtmAppLayout>
      </Flex>
    </Box>
  )
}

export default App
