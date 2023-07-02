import { AtmBankNotes, AtmConfigs } from "./mockAtmServices";

export abstract class AtmServices {
    abstract banknotes(): Promise<AtmBankNotes>;
    abstract configs(): Promise<AtmConfigs>;
    abstract updateUserPreference(configs: AtmConfigs): Promise<void>;
    abstract updateBanknotes(remainingBanknotes: AtmBankNotes): Promise<void>;
}