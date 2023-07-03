import { AtmNavigationProvider } from '@entities/transaction'
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
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </AtmNavigationProvider>
    </ThemeProvider>
  </QueryClientProvider>
)
