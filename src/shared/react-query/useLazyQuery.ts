import {
    QueryKey,
    UseQueryOptions,
    useQuery,
} from '@tanstack/react-query';

export function useLazyQuery<TQueryFnData,
    TError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
>(
    arg: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
    const { refetch, ...rest } = useQuery({ enabled: false, retry: false, ...arg })
    return [refetch, rest]
}