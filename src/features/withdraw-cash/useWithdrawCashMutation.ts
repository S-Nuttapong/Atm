import { MockAtmRepository } from "@entities/atm/AtmRepository";
import { MockUserRepository } from "@entities/user/userRepository";
import { WithdrawalCashService } from "@features/withdraw-cash/api/WithdrawCashService";
import { DispensableBanknote, User } from "@shared/api";
import { noop } from "@shared/libs/fp";
import { useMutation, useQueryClient } from "@shared/react-query";


interface InputData {
    pin: string;
    amount: number;
}

const withdrawCash = async (data: InputData) => {
    const { pin, amount } = data;
    const userService = new MockUserRepository(pin);
    const mockAtmService = new MockAtmRepository();
    const withdrawCashService = new WithdrawalCashService(mockAtmService, userService);
    return await withdrawCashService.withdraw(amount);
};

type UseWithdrawCashConfigs = {
    onSuccess?: (data: { remainingBalance: number; banknotes: DispensableBanknote[]; }, variables: InputData, context: unknown) => void
    onError?: (error: unknown, variables: InputData, context: unknown) => void
}

export const useWithdrawCashMutation = (configs = {} as UseWithdrawCashConfigs) => {
    const queryClient = useQueryClient();
    const { onSuccess = noop, onError = noop } = configs
    return useMutation({
        mutationFn: withdrawCash,
        mutationKey: ['withdrawCash'],
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
        },
        onError: onError
    })
}



