import { AtmNavigationProvider } from '@entities/transaction'
import { WithdrawCashErrorProvider } from '@features/withdraw-cash'
import { ThemeProvider, theme } from '@shared/design-system'
import {
  QueryClientProvider,
  ReactQueryDevtools,
  client,
} from '@shared/react-query'
import { ComponentWithChildren } from '@shared/types'

export const AtmAppProvider: ComponentWithChildren = ({ children }) => (
  <QueryClientProvider client={client}>
    <ThemeProvider theme={theme}>
      <AtmNavigationProvider>
        <WithdrawCashErrorProvider>{children}</WithdrawCashErrorProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </AtmNavigationProvider>
    </ThemeProvider>
  </QueryClientProvider>
)
