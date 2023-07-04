import { useQuery as useTanStackQuery } from "@tanstack/react-query"

/**
 * @note "isLoading" state can produce unexpected result, if not use in conjunction with "isIdle" state. For example; when doing lazy query, we can run into infinite loading, if use "isLoading" solely to represent loading state here.
 * For majority of use cases, consider isFetching as a loading state will produce more predicable result
 * @see https://stackoverflow.com/questions/72501651/what-state-represents-the-loading-or-data-not-fetched-yet-state-when-using-enabl
 */
export const useQuery = useTanStackQuery