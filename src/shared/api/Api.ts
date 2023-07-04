import { PinVerificationResponse, User } from "@shared/api/models"

import axios from "axios"

const baseUri = 'https://frontend-challenge.screencloud-michael.now.sh/api/'

const withUri = (endpoint: string) => baseUri + endpoint

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
export const getUser = async (pin: string) => {
    const response = await axios.post<PinVerificationResponse>(withUri('pin'), { pin })
    return {
        ...mockUserInformation, balance: {
            ...mockUserInformation.balance,
            value: response.data.currentBalance,
        }
    } satisfies User
}

