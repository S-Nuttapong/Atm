import { User } from '@shared/api';
import { getUser } from '@shared/api/Api';
import { reactQueryConfigs } from '@shared/configs';
import { useLazyQuery, useQueryClient } from '@shared/react-query';

export type UserLazyQuery = {
    onSuccess?: (data: User) => void
    onError?: (err: unknown) => void
    refetch?: boolean
    enabled?: boolean
}

export const useUserLazyQuery = (pin: string, configs = {} as UserLazyQuery) => {
    const queryKey = [reactQueryConfigs.cacheEntry.user, pin];
    const userCache = useQueryClient().getQueryData<User>(queryKey);
    return useLazyQuery({
        queryKey: queryKey,
        queryFn: () => {
            if (userCache) return userCache
            return getUser(pin)
        },
        retry: false,
        staleTime: 60000,
        ...configs,
    });
};
