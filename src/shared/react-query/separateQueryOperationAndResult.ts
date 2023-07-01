import { UseQueryResult } from "@tanstack/react-query";

export const separateQueryOperationAndResult = <TData = unknown, TError = unknown>(mutationResult: UseQueryResult<TData, TError>) => {
    const { refetch, ...result } = mutationResult;
    return [refetch, result] as const;
};
