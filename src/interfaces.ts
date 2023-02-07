import { Currency, Lang, Period, TransactionType } from './enums';

export interface ISettings {
  lang: Lang;
  currency: Currency;
  selectedAccount: null | number;
  periodType: Period;
  period: { start: number | null; end: number | null };
}

export interface IAccount {
  id: string;
  name: string;
  currency: Currency;
  iconID: number;
  colorID: number;
  balance: number;
  description: string;
}

export interface ICategory {
  id: string;
  name: string;
  iconID: number;
  colorID: number;
  description: string;
}

export interface ITransaction {
  id: string;
  date: number;
  currency: Currency;
  type: TransactionType;
  account: number;
  category: number;
  amount: number;
  description: string;
}

export interface IData {
  accounts: { [id: string]: IAccount };
  categories: { [id: string]: ICategory };
  transactions: { [id: string]: ITransaction };
}

export interface IDataFB {
  accounts?: { [id: string]: Partial<IAccount> };
  categories?: { [id: string]: Partial<ICategory> };
  transactions?: { [id: string]: Partial<ITransaction> };
}

export interface IDataFBDelete {
  accounts?: string;
  categories?: string;
  transactions?: string;
}

export interface IStore {
  login: boolean;
  settings: ISettings;
  data: IData;
}

export type DataAllFB = Partial<IAccount> | Partial<ICategory> | Partial<ITransaction>;
