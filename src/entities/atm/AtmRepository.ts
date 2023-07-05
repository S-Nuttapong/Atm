import { AtmBankNotes } from "@entities/atm";

export interface IAtmRepository {
  banknotes(): Promise<AtmBankNotes>;
  configs(): Promise<AtmConfigs>;
  updateUserPreference(configs: AtmConfigs): Promise<void>;
  updateBanknotes(remainingBanknotes: AtmBankNotes): Promise<void>;
}

export type AtmConfigs = {
  currency: 'EUR';
  overdraft: number;
}

type AtmMockData = {
  configs: AtmConfigs;
  banknotes: AtmBankNotes;
};

export class MockAtmRepository implements IAtmRepository {
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
