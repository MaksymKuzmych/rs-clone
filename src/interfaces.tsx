import { Currency, Lang, Period, TransactionType } from './enums';

export interface ISettings {
  lang: Lang;
  currency: Currency;
  selectedAccount: null | number;
  periodType: Period;
  periodStart: Date | null;
  periodEnd: Date | null;
}

export interface IAcount {
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
  accounts: IAcount[];
  categories: ICategory[];
  transactions: ITransaction[];
}

export interface IStore {
  login: boolean;
  settings: ISettings;
  data: IData;
}
