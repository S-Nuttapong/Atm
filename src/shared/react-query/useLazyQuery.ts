import {
    QueryKey,
    UseQueryOptions,
    useQuery,
} from '@tanstack/react-query';

/**
 * lazy query loading state produces difference result to normal query whose query function is being executed right away. 
 * Please use "isLoading" state cautiously, and in conjunction with "isIdle" state. Otherwise you may run into one of these situations; when doing lazy query, we can run into infinite loading, if use "isLoading" solely to represent loading state here.
 * For majority of use cases, consider isFetching as a loading state will produce more predicable result
 * @see https://stackoverflow.com/questions/72501651/what-state-represents-the-loading-or-data-not-fetched-yet-state-when-using-enabl
 * @see also https://tanstack.com/query/v4/docs/react/reference/useMutation
 */
export function useLazyQuery<TQueryFnData,
    TError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
>(
    arg: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
    const { refetch, ...rest } = useQuery({ enabled: false, retry: false, ...arg })
    return [refetch, rest] as const
}