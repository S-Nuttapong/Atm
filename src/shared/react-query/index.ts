import { QueryClient, useQuery as tanstackUseQuery } from "@tanstack/react-query";
export { QueryCache, QueryClient, QueryClientProvider, useMutation, useQueryClient } from "@tanstack/react-query";
export type { UseMutationResult } from "@tanstack/react-query";
export { ReactQueryDevtools } from '@tanstack/react-query-devtools';
export { separateQueryOperationAndResult } from "./separateQueryOperationAndResult";

/**
 * @note "isLoading" state can produce unexpected result, if not use in conjunction with "isIdle" state. For example; when doing lazy query, we can run into infinite loading, if use "isLoading" solely to represent loading state here.
 * For majority of use cases, consider isFetching as a loading state will produce more predicable result
 * @see https://stackoverflow.com/questions/72501651/what-state-represents-the-loading-or-data-not-fetched-yet-state-when-using-enabl
 */
export const useQuery = tanstackUseQuery

export const client = new QueryClient()