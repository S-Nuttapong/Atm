
import { userConfig } from "@entities/user/userConfig";
import { QueryCache, useQueryClient } from "@shared/react-query";
import { User } from "@shared/types";

export const useUserInformation = (pin?: string) => {
    const queryCache = useQueryClient().getQueryCache()
    return pin ? findUserByPin(queryCache, pin) : getLastLoginUser(queryCache)
};

function findUserByPin(queryCache: QueryCache, pin: string) {
    return queryCache.find([userConfig.entry, pin])?.state?.data as User | undefined;
}

function getLastLoginUser(queryCache: QueryCache) {
    const cacheEntries = queryCache.getAll();

    const users = cacheEntries.filter((entry) => entry.queryKey[0] === userConfig.entry);

    users.sort((a, b) => {
        const lastUpdatedA = a.state.dataUpdateCount ?? 0;
        const lastUpdatedB = b.state.dataUpdateCount ?? 0;
        return lastUpdatedB - lastUpdatedA;
    });

    return users[0]?.state?.data as User | undefined

}
