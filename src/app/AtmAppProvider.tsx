import { TransactionNavigationProvider } from '@entities/transaction'
import { ComponentWithChildren } from '@shared/types'
import { ThemeProvider, theme } from '@shared/ui'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const client = new QueryClient()

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
