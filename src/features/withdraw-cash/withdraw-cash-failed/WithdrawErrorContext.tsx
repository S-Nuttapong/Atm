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
 * due to limitation of react-query useMutation, we can not retain state of mutation on different components despite they are in the same context provider
 * hence we work around that with manual mutation error tracking
 * @todo bump up to v5 once stable, remove the workaround
 * @see https://github.com/TanStack/query/issues/2304
 */
export const useWithdrawCashError = useContext
