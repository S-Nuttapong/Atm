import { UseMutationOptions, useMutation as useTanStackMutation } from "@tanstack/react-query";

export function useMutation<
    TData = unknown,
    TError = unknown,
    TVariables = void,
    TContext = unknown,
>(
    arg: UseMutationOptions<TData, TError, TVariables, TContext>,
) {
    const { mutate, mutateAsync: _, ...rest } = useTanStackMutation<TData, TError, TVariables, TContext>(arg)
    return [mutate, rest]
}