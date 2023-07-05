import { UseMutationOptions, useMutation as useTanStackMutation } from "@tanstack/react-query";

/**
 * apollo client flavor mutation hook: separating data from operation
 * @example 
 * @see https://tanstack.com/query/v4/docs/react/reference/useMutation
 * const [withdraw, result] = useMutation({mutationFn: withdrawCash, mutationKey: ['withdrawCash']})
 */
export function useMutation<
    TData = unknown,
    TError = unknown,
    TVariables = void,
    TContext = unknown,
>(
    arg: UseMutationOptions<TData, TError, TVariables, TContext>,
) {
    const { mutate, mutateAsync: _, ...rest } = useTanStackMutation<TData, TError, TVariables, TContext>(arg)
    return [mutate, rest] as const
}