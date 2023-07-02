import { first, last, pipe } from "remeda";

// const a = { 100: 5, 80: 3, 20: 1 }
// const inputs = [[100, a], [560, a], [160, a], [240, a], [375, { 100: 5, 50: 3, 20: 20, 10: 5, 5: 1 }], [120, a], [800, { 100: 5, 50: 3 }]].filter(i => i[0])

export function getBanknotesToDispense(atmBanknotes: Record<number, number>, requestAmount: number) {
    const totalDispensableAmount = getTotalDispensableAmount(atmBanknotes)

    if (requestAmount > totalDispensableAmount) return `There is not enough money in the ATM, maximum: ${totalDispensableAmount}`

    return searchNotes(atmBanknotes, requestAmount);
}

function searchNotes(_atmBanknotes: Record<number, number>, requestAmount: number) {
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

    const searchSmallestBanknotesCombination = (requestAmount: number, banknotesList: number[][]): Record<number, number> | string => {
        if (banknotesList.length === 0) {
            return `Failed to issue this amount, minimum nominal: ${minimumNominalAvailable}, maximum amount: ${totalDispensableAmount}`
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