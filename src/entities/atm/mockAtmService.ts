import { AtmServices } from "@entities/atm";


export interface AtmConfigs {
  currency: 'EUR';
  overdraft: number;
}

export interface AtmBankNotes {
  [nominal: number]: number;
}

type AtmMockData = {
  configs: AtmConfigs;
  banknotes: AtmBankNotes;
};

export class MockAtmServices implements AtmServices {
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