import { AtmBankNotes } from "@entities/atm";
import { Currency } from "@shared/api";
import { first, last, pipe } from "@shared/libs/fp";

export const dispenseCash = (atmBanknotes: Record<number, number>, requestAmount: number, currency: Currency) => {
    const totalDispensableAmount = getTotalDispensableAmount(atmBanknotes)

    if (requestAmount > totalDispensableAmount) throw new Error(`The ATM does not have sufficient funds available. Please contact our customer support for further assistance.`)

    const banknotes = getBankNotesToDispense(atmBanknotes, requestAmount)
    const remainingBanknotes = getRemainingBanknotes(atmBanknotes, banknotes)
    return { banknotesToDispense: toDispensableBanknotesList(banknotes, currency), remainingBanknotes }
}

const toDispensableBanknotesList = (banknotes: AtmBankNotes, currency: Currency) => Object.keys(banknotes).map(Number).map(norminal => ({ value: norminal, count: banknotes[norminal], currency }));


const getRemainingBanknotes = (initial: AtmBankNotes, dispensed: AtmBankNotes) => {
    const denominations = Object.keys(dispensed).map(Number);
    return denominations.reduce((remaining, denomination) => {
        remaining[denomination] -= dispensed[denomination];
        return remaining;
    }, { ...initial });
};

const getBankNotesToDispense = (_atmBanknotes: Record<number, number>, requestAmount: number) => {
    const atmBanknotes = { ..._atmBanknotes }
    const banknotesList = getBanknotesListSortedByLargestFirst(atmBanknotes)
    const minimumNominalAvailable = pipe(banknotesList, last, first)
    const totalDispensableAmount = getTotalDispensableAmount(atmBanknotes)

    function getBanknotesCombination(requestAmount: number, banknotesList: number[][]) {
        const banknotesToDispense = {} as Record<number, number>;

        for (let i = 0; i < banknotesList.length; i++) {
            const [nominal, num] = banknotesList[i];
            let availableAmount = nominal * num;
            while (availableAmount && requestAmount >= nominal) {
                requestAmount -= nominal;
                availableAmount -= nominal;
                const accNoteCount = banknotesToDispense[nominal] ?? 0
                banknotesToDispense[nominal] = accNoteCount + 1
            }
        }

        return { remainingRequestAmount: requestAmount, banknotesToDispense };
    }

    const searchSmallestBanknotesCombination = (requestAmount: number, banknotesList: number[][]): Record<number, number> => {
        if (banknotesList.length === 0) {
            throw new Error(`Failed to issue this amount, minimum nominal: ${minimumNominalAvailable}, maximum amount: ${totalDispensableAmount}`)
        }

        const { remainingRequestAmount, banknotesToDispense } = getBanknotesCombination(requestAmount, banknotesList)

        if (remainingRequestAmount > 0) {
            return searchSmallestBanknotesCombination(requestAmount, banknotesList.slice(1))
        }

        return banknotesToDispense
    }

    return searchSmallestBanknotesCombination(requestAmount, banknotesList)
}

function getBanknotesListSortedByLargestFirst(atmBanknotesRecord: Record<number, number>) {
    return Object.entries(atmBanknotesRecord).map(([nominal, noteCount]) => [Number(nominal), noteCount]).sort((a, b) => b[0] - a[0]);
}

function getTotalDispensableAmount(atmBanknotesRecord: Record<number, number>) {
    const nominals = Object.keys(atmBanknotesRecord).map(Number)
    return nominals.reduce((totalDispensableAmount, nominal) => {
        const noteCount = atmBanknotesRecord[nominal]
        return totalDispensableAmount += (nominal * noteCount)
    }, 0);
}