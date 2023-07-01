
import { api } from '@shared/apis';
import { separateQueryOperationAndResult, useQuery } from '@shared/react-query';
import { PinVerificationResponse, User, UserVerifyPinConfigs } from '@shared/types';
import axios from 'axios';

const mockUserInformation = {
    id: '1111',
    firstName: 'Micheal',
    lastName: 'Jackson',
    pin: '1111',
    balance: {
        value: 100,
        currency: 'EUR'
    },
    accountId: '123-456-789'
} satisfies User

/**
 * @todo replace this with Real, the pin verification should be done on BE for the following reason: 
 *  1) frontend don't need to perform set of operations to transform data required to operate on client (Tell don't ask principle) 
 *  2) minimize round trip on client/server, faster response
 */
export const getUserInformation = async (pin: string) => {
    const response = await axios.post<PinVerificationResponse>(api.userInformation, { pin })
    return {
        ...mockUserInformation, balance: {
            ...mockUserInformation.balance,
            value: response.data.currentBalance,
        }
    } satisfies User
}

export const useGetUserInformation = (pin: string, configs = {} as UserVerifyPinConfigs) => {
    const data = useQuery({
        queryKey: ['user', pin],
        queryFn: () => getUserInformation(pin),
        retry: false,
        enabled: false,
        onSuccess: data => {
            configs?.onSuccess?.(data)
        },
        onError: (error) => {
            configs?.onError?.(error)
        },
    })
    return separateQueryOperationAndResult(data)
}