import { QueryClient } from "@tanstack/react-query";
export { QueryCache, QueryClient, QueryClientProvider, useQuery, useQueryClient } from "@tanstack/react-query";
export type { UseMutationResult } from "@tanstack/react-query";
export { ReactQueryDevtools } from '@tanstack/react-query-devtools';
export { useLazyQuery } from "./useLazyQuery";
export { useMutation } from "./useMutation";

/**
 * @todo re-consider the proper cache time, once connect with real BE
 */
export const client = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: Infinity
        }
    }
})