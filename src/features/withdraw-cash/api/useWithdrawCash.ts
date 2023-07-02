import { MockAtmServices } from "@entities/atm/mockAtmServices";
import { MockUserServices } from "@entities/user";
import { WithdrawalCashService } from "@features/withdraw-cash/api/WithdrawCashService";
import { useMutation, useQueryClient } from "@shared/react-query";
import { User } from "@shared/types";
import { UseBaseMutationResult } from "@tanstack/react-query";

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

export const useWithdrawCash = () => {
    const queryClient = useQueryClient();

    const withdrawCashMutation = useMutation(withdrawCash, {
        onSuccess: (data, variables) => {
            const { pin } = variables;
            const user = queryClient.getQueryData(['user', pin]) as User
            const remainingBalance = data.remainingBalance;
            queryClient.setQueryData<User>(['user', pin], {
                ...user, balance: {
                    ...user.balance,
                    value: remainingBalance
                }
            });
        }
    })

    return separateMutationAndResult(withdrawCashMutation);
}

const separateMutationAndResult = <TData = unknown, TError = Error, TVariables = unknown, TContext = unknown>(mutationResult: UseBaseMutationResult<TData, TError, TVariables, TContext>) => {
    const { mutate, ...rest } = mutationResult;
    return [mutate, rest] as const;
}

