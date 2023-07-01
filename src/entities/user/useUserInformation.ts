
import { userConfig } from "@entities/user/userConfig";
import { QueryClient, useQueryClient } from "@shared/react-query";
import { User } from "@shared/types";

export const useUserInformation = (pin?: string) => {
    const queryClient = useQueryClient();

    if (pin) return queryClient.getQueryCache().find([userConfig.entry, pin])?.state?.data


    return getLastLoginUser(queryClient);
};

function getLastLoginUser(queryClient: QueryClient) {
    const cacheEntries = queryClient.getQueryCache().getAll();

    // Filter cache entries by the query key
    const users = cacheEntries.filter((entry) => entry.queryKey[0] === userConfig.entry);

    // Sort cache entries by the last update timestamp (dataUpdateCount)
    users.sort((a, b) => {
        const lastUpdatedA = a.state.dataUpdateCount ?? 0;
        const lastUpdatedB = b.state.dataUpdateCount ?? 0;
        return lastUpdatedB - lastUpdatedA;
    });

    return users[0]?.state?.data as User | undefined

}
