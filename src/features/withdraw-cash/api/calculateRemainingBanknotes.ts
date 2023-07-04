import { AtmBankNotes } from "@entities/atm";

export const calculateRemainingBanknotes = (initial: AtmBankNotes, dispensed: AtmBankNotes) => {
    const denominations = Object.keys(dispensed).map(Number);
    return denominations.reduce((remaining, denomination) => {
        remaining[denomination] -= dispensed[denomination];
        return remaining;
    }, { ...initial });
};
