import { MockAtmServices } from "@entities/atm/mockAtmServices";
import { MockUserServices } from "@entities/user";
import { WithdrawalCashService } from "@features/withdraw-cash/api/WithdrawCashService";
import { useMutation, useQueryClient } from "@shared/react-query";
import { DispensableBanknote, User } from "@shared/types";
import { UseBaseMutationResult } from "@tanstack/react-query";
import { noop } from "remeda";

interface InputData {
    pin: string;
    amount: number;
}

const withdrawCash = async (data: InputData) => {
    const { pin, amount } = data;
    const userService = new MockUserServices(pin);
    const mockAtmService = new MockAtmServices();
    const withdrawCashService = new WithdrawalCashService(mockAtmService, userService);
    return await withdrawCashService.withdraw(amount);
};

type UseWithdrawCashConfigs = {
    onSuccess?: ((data: {
        remainingBalance: number;
        banknotes: DispensableBanknote[];
    }, variables: InputData, context: unknown) => unknown) | undefined
}

/**
 * @todo expose onError configs 
 */
export const useWithdrawCash = (configs = {} as UseWithdrawCashConfigs) => {
    const queryClient = useQueryClient();
    const { onSuccess = noop } = configs
    const withdrawCashMutation = useMutation(withdrawCash, {
        onSuccess: (data, variables, context) => {
            const { pin } = variables;
            const user = queryClient.getQueryData(['user', pin]) as User
            const remainingBalance = data.remainingBalance;
            queryClient.setQueryData<User>(['user', pin], {
                ...user, balance: {
                    ...user.balance,
                    value: remainingBalance
                }
            });
            onSuccess(data, variables, context)
        }
    })

    return separateMutationAndResult(withdrawCashMutation);
}

const separateMutationAndResult = <TData = unknown, TError = Error, TVariables = unknown, TContext = unknown>(mutationResult: UseBaseMutationResult<TData, TError, TVariables, TContext>) => {
    const { mutate, ...rest } = mutationResult;
    return [mutate, rest] as const;
}

