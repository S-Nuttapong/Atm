import { TransactionsMenu, useAtmNavigation } from '@entities/transaction'
import { EnterPin } from '@features/enter-pin'
import {
  WithdrawCash,
  WithdrawCashFail,
  WithdrawCashSuccess,
} from '@features/withdraw-cash'
import { Box, Flex } from '@shared/design-system'
import { AtmAppLayout } from './AtmAppLayout'
import { defineAtmTransactionMap } from './defineAtmTransactionMap'

const atmTransactionMap = defineAtmTransactionMap({
  EnterPin: {
    Component: EnterPin,
    showExitButton: false,
    showUsername: false,
    title: 'Please Enter Your PIN',
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
