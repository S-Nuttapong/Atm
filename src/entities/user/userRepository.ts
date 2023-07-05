import { Cash, User } from "@shared/api";
import { reactQueryConfigs } from "@shared/configs";
import { QueryClient, client } from "@shared/react-query";

export interface IUserRepository {
    getBalance(): Promise<Cash>;
    getInformation(): Promise<User>;
    updateUserBalance(remainingBalance: number): Promise<void>;
}

export class MockUserRepository implements IUserRepository {
    private cache: QueryClient;
    private pin: string

    constructor(pin: string, cache: QueryClient = client) {
        this.cache = cache;
        this.pin = pin
    }

    getBalance(): Promise<Cash> {
        const user = this.cache.getQueryData<User>([reactQueryConfigs.cacheEntry.user, this.pin]);
        if (user) {
            return Promise.resolve(user.balance);
        } else {
            return Promise.reject(new Error('User data not found in cache'));
        }
    }

    getInformation(): Promise<User> {
        const user = this.cache.getQueryData<User>([reactQueryConfigs.cacheEntry.user, this.pin]);
        if (user) {
            return Promise.resolve(user);
        } else {
            return Promise.reject(new Error('User data not found in cache'));
        }
    }

    updateUserBalance(remainingBalance: number): Promise<void> {
        this.cache.setQueryData<User>([reactQueryConfigs.cacheEntry.user, this.pin], (prevData) => {
            if (prevData) {
                return { ...prevData, balance: { ...prevData.balance, value: remainingBalance } };
            } else {
                throw new Error('User data not found in cache');
            }
        });
        return Promise.resolve();
    }
}
