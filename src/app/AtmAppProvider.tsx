import { ThemeProvider, theme } from '@chakra-ui/react'
import { TransactionNavigationProvider } from '@entities/transaction'
import { ComponentWithChildren } from '@shared/types'
import { QueryClient, QueryClientProvider } from 'react-query'

const client = new QueryClient()

export const AtmAppProvider: ComponentWithChildren = ({ children }) => (
  <QueryClientProvider client={client}>
    <ThemeProvider theme={theme}>
      <TransactionNavigationProvider transaction="WithdrawCash">
        {children}
      </TransactionNavigationProvider>
    </ThemeProvider>
  </QueryClientProvider>
)
