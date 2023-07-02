import { Cash, User } from "@shared/types";

export abstract class UserServices {
    abstract getBalance(): Promise<Cash>;
    abstract getInformation(): Promise<User>;
    abstract updateUserBalance(remainingBalance: number): Promise<void>;
}
