
export abstract class IAtmServices {
  abstract banknotes(): Promise<AtmBankNotes>;
  abstract configs(): Promise<AtmConfigs>;
  abstract updateUserPreference(configs: AtmConfigs): Promise<void>;
  abstract updateBanknotes(remainingBanknotes: AtmBankNotes): Promise<void>;
}

export interface AtmConfigs {
  currency: 'EUR';
  overdraft: number;
}

type Nominal = number
type Count = number
export type AtmBankNotes = Record<Nominal, Count>

type AtmMockData = {
  configs: AtmConfigs;
  banknotes: AtmBankNotes;
};

export class MockAtmServices implements IAtmServices {
  mockData: AtmMockData;

  constructor(mockData = defaultMockData) {
    this.mockData = mockData;
  }

  banknotes(): Promise<AtmBankNotes> {
    return Promise.resolve({ ...this.mockData.banknotes });
  }

  configs(): Promise<AtmConfigs> {
    return Promise.resolve({ ...this.mockData.configs });
  }

  updateUserPreference(configs: AtmConfigs): Promise<void> {
    this.mockData.configs = configs;
    return Promise.resolve();
  }

  updateBanknotes(remainingBanknotes: AtmBankNotes): Promise<void> {
    this.mockData.banknotes = remainingBanknotes;
    return Promise.resolve();
  }
}

const defaultMockData: AtmMockData = {
  configs: { currency: 'EUR', overdraft: 100 },
  banknotes: { 5: 4, 10: 15, 20: 7 },
};

//20 + 150 + 140 
//320