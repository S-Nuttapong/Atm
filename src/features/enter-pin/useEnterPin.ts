import { userConfig } from '@entities/user';
import { separateQueryOperationAndResult, useQuery, useQueryClient } from '@shared/react-query';
import { User } from '@shared/types';
import { UserVerifyPinConfigs, getUserInformation } from '../../entities/user/api/getUserInformation';


export const useEnterPin = (pin: string, configs = {} as UserVerifyPinConfigs) => {
    const queryKey = [userConfig.entry, pin];
    const userCache = useQueryClient().getQueryData<User>(queryKey);

    const data = useQuery({
        queryKey: queryKey,
        queryFn: () => {
            if (userCache) return userCache
            return getUserInformation(pin)
        },
        retry: false,
        enabled: false,
        staleTime: 60000,
        ...configs,
    });

    return separateQueryOperationAndResult({ ...data });
};
