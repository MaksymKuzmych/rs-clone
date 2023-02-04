import { Currency, Lang, Period, TransactionType } from './enums';

export interface ISettings {
  lang: Lang;
  currency: Currency;
  selectedAccount: null | number;
  periodType: Period;
  period: { start: number | null; end: number | null };
}

export interface ISettingsFirebase {
  lang?: Lang;
  currency?: Currency;
  selectedAccount?: null | number;
  periodType?: Period;
  period?: { start: number | null; end: number | null };
}

export interface IAccount {
  id: number;
  name: string;
  iconID: number;
  colorID: number;
  balance: number;
  description: string;
}

export interface ICategory {
  id: number;
  name: string;
  iconID: number;
  colorID: number;
  description: string;
}

export interface ITransaction {
  id: number;
  date: Date;
  type: TransactionType;
  account: number;
  category: number;
  amount: number;
  description: string;
}

export interface IData {
  accounts: IAccount[];
  categories: ICategory[];
  transactions: ITransaction[];
}

export interface IStore {
  login: boolean;
  settings: ISettings;
  data: IData;
}
