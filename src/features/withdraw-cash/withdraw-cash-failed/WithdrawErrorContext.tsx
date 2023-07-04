import { contextFactory } from '@shared/libs/context'
import { isError } from '@shared/libs/fp'
import { ComponentWithChildren } from '@shared/types'
import { useState } from 'react'

interface IWithdrawCashErrorContext {
  trackError: (error?: unknown) => void
  error: Error
}

const [useContext, context] = contextFactory<IWithdrawCashErrorContext>({
  contextError:
    'useWithdrawCashError must be wrapped by WithdrawCashErrorProvider',
})

export const WithdrawCashErrorProvider: ComponentWithChildren = ({
  children,
}) => {
  const [error, _setError] = useState({} as Error)
  const trackError = (error?: unknown) =>
    _setError(isError(error) ? error : ({} as Error))
  return (
    <context.Provider value={{ error, trackError }}>
      {children}
    </context.Provider>
  )
}

/**
 * @see https://github.com/TanStack/query/issues/2304
 */
export const useWithdrawCashError = useContext
