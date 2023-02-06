import { Currency, Lang, Period, TransactionType } from './enums';

export interface ISettings {
  lang: Lang;
  currency: Currency;
  selectedAccount: null | number;
  periodType: Period;
  period: { start: Date | null; end: Date | null };
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

export interface IColor {
  color: string;
  id: number;
  name: string;
}

export interface IIcon {
  name: string;
  id: number;
}
