import { UserServices } from "@entities/user/api/types";
import { QueryClient, client } from "@shared/react-query";
import { Cash, User } from "@shared/types";

export class MockUserServices implements UserServices {
    private cache: QueryClient;
    private pin: string

    constructor(pin: string, cache: QueryClient = client) {
        this.cache = cache;
        this.pin = pin
    }

    getBalance(): Promise<Cash> {
        const user = this.cache.getQueryData<User>(['user', this.pin]);
        if (user) {
            return Promise.resolve(user.balance);
        } else {
            return Promise.reject(new Error('User data not found in cache'));
        }
    }

    getInformation(): Promise<User> {
        const user = this.cache.getQueryData<User>(['user', this.pin]);
        if (user) {
            return Promise.resolve(user);
        } else {
            return Promise.reject(new Error('User data not found in cache'));
        }
    }

    updateUserBalance(remainingBalance: number): Promise<void> {
        this.cache.setQueryData<User>(['user', this.pin], (prevData) => {
            if (prevData) {
                return { ...prevData, balance: { ...prevData.balance, value: remainingBalance } };
            } else {
                throw new Error('User data not found in cache');
            }
        });
        return Promise.resolve();
    }
}
