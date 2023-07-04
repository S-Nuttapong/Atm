import { QueryClient } from "@tanstack/react-query";
export { QueryCache, QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
export type { UseMutationResult } from "@tanstack/react-query";
export { ReactQueryDevtools } from '@tanstack/react-query-devtools';
export { useLazyQuery } from "./useLazyQuery";
export { useMutation } from "./useMutation";
export { useQuery } from "./useQuery";


export const client = new QueryClient()