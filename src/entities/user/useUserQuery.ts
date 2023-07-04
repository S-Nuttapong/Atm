import { User } from "@shared/api";
import { reactQueryConfigs } from "@shared/configs";
import { QueryCache, useQueryClient } from "@shared/react-query";


export const useUserInformation = <TResult = User | undefined>(pin?: string) => {
    const queryCache = useQueryClient().getQueryCache()
    const user = pin ? findUserByPin(queryCache, pin) : getLastLoginUser(queryCache)
    return (user ?? {}) as TResult
};

function findUserByPin(queryCache: QueryCache, pin: string) {
    return queryCache.find([reactQueryConfigs.cacheEntry.user, pin])?.state?.data
}

function getLastLoginUser(queryCache: QueryCache) {
    const cacheEntries = queryCache.getAll();

    const userEntries = cacheEntries.filter((entry) => entry.queryKey[0] === reactQueryConfigs.cacheEntry.user);

    userEntries.sort((a, b) => {
        const lastUpdatedA = a.state.dataUpdateCount ?? 0;
        const lastUpdatedB = b.state.dataUpdateCount ?? 0;
        return lastUpdatedB - lastUpdatedA;
    });

    return userEntries[0]?.state?.data

}
