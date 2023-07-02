export const calculateRemainingBalance = (balance: number, amount: number, overdraft: number) => {
    const remainingBalance = balance - amount;
    return { value: remainingBalance, isOverdraft: remainingBalance < 0 && Math.abs(remainingBalance) > overdraft };
}