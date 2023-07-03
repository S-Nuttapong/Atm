import { TransactionNavigationProvider } from '@entities/transaction'
import { ThemeProvider, theme } from '@shared/design-system'
import { QueryClientProvider, client } from '@shared/react-query'
import { ComponentWithChildren } from '@shared/types'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const AtmAppProvider: ComponentWithChildren = ({ children }) => (
  <QueryClientProvider client={client}>
    <ThemeProvider theme={theme}>
      <TransactionNavigationProvider>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </TransactionNavigationProvider>
    </ThemeProvider>
  </QueryClientProvider>
)
