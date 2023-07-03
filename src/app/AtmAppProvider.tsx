import { TransactionNavigationProvider } from '@entities/transaction'
import { ThemeProvider, theme } from '@shared/design-system'
import { QueryClientProvider, client } from '@shared/react-query'
import { ComponentWithChildren } from '@shared/types'

export const AtmAppProvider: ComponentWithChildren = ({ children }) => (
  <QueryClientProvider client={client}>
    <ThemeProvider theme={theme}>
      <TransactionNavigationProvider>
        {children}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </TransactionNavigationProvider>
    </ThemeProvider>
  </QueryClientProvider>
)
