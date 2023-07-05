import { AtmView } from '@entities/atm'
import { contextFactory } from '@shared/libs/context'
import { ComponentWithChildren } from '@shared/types'

import { useState } from 'react'

interface IAtmNavigationContext {
  navigate: (transaction: AtmView) => void
  backToMainMenu: () => void
  exit: () => void
  view: AtmView
}

type AtmNavigationProvider = ComponentWithChildren<{
  view?: AtmView
}>

const contextError = 'useAtmNavigation must be wrapped by AtmNavigationProvider'

const [useAtmNavigation, context] = contextFactory<IAtmNavigationContext>({
  contextError,
})

const defaultAtmView: AtmView = 'EnterPin'

const AtmNavigationProvider: AtmNavigationProvider = props => {
  const initialAtmView = props?.view ?? defaultAtmView
  const [view, navigate] = useState(initialAtmView)
  const backToMainMenu = () => navigate('TransactionsMenu')
  const exit = () => navigate('EnterPin')

  return (
    <context.Provider value={{ view, backToMainMenu, exit, navigate }}>
      {props?.children}
    </context.Provider>
  )
}

export { AtmNavigationProvider, useAtmNavigation }
