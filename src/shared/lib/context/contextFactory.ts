import { createContext, useContext } from 'react'

const defaultConfig = {
    contextError: 'useContext must be wrapped by context its associate Provider',
}

export const contextFactory = <A extends unknown | null>(
    configs = defaultConfig
) => {
    const context = createContext<A | undefined>(undefined)
    const useCtx = () => {
        const ctx = useContext(context)
        if (ctx === undefined) {
            throw new Error(configs.contextError)
        }
        return ctx
    }
    return [useCtx, context] as const
}
