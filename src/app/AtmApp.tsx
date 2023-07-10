import { TransactionsMenu, useAtmNavigation } from '@entities/transaction'
import { EnterPin } from '@features/enter-pin'
import {
  WithdrawCash,
  WithdrawCashFail,
  WithdrawCashSuccess,
} from '@features/withdraw-cash'
import { Box, Flex } from '@shared/design-system'
import { ViewBalance } from '../features/view-balance/ViewBalance'
import { AtmAppLayout } from './AtmAppLayout'
import { defineAtmTransactionMap } from './defineAtmTransactionMap'

/**
 * @todo as of now there is no need for lazily loading the each transaction view, since the bundle size is rather small (129kb)
 * However, please note that we might need to consider lazily loading each transaction view, as features more transactions, and the bundle size gets large enough that it start to impact TTFB, and FCP
 * @see https://web.dev/vitals/
 */
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
