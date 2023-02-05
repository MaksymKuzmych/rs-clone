import { Currency, Lang, Period, TransactionType } from './enums';

export interface ISettings {
  lang: Lang;
  currency: Currency;
  selectedAccount: null | number;
  periodType: Period;
  period: { start: number | null; end: number | null };
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
  date: number;
  type: TransactionType;
  account: number;
  category: number;
  amount: number;
  description: string;
}

export interface IData {
  accounts: { [id: number]: IAccount };
  categories: { [id: number]: ICategory };
  transactions: { [id: number]: ITransaction };
}

export interface IStore {
  login: boolean;
  settings: ISettings;
  data: IData;
}

export interface ISettingsFB {
  lang?: Lang;
  currency?: Currency;
  selectedAccount?: null | number;
  periodType?: Period;
  period?: { start: number | null; end: number | null };
}

export interface IAccountFB {
  id?: number;
  name?: string;
  iconID?: number;
  colorID?: number;
  balance?: number;
  description?: string;
}

export interface ICategoryFB {
  id?: number;
  name?: string;
  iconID?: number;
  colorID?: number;
  description?: string;
}

export interface ITransactionFB {
  id?: number;
  date?: number;
  type?: TransactionType;
  account?: number;
  category?: number;
  amount?: number;
  description?: string;
}

export interface IDataFBUpdate {
  accounts?: { [id: number]: IAccountFB };
  categories?: { [id: number]: ICategoryFB };
  transactions?: { [id: number]: ITransactionFB };
}

export interface IDataFBPush {
  accounts?: { [id: number]: IAccount };
  categories?: { [id: number]: ICategory };
  transactions?: { [id: number]: ITransaction };
}

export interface IDataFBDelete {
  accounts?: number;
  categories?: number;
  transactions?: number;
}

export type DataAllFB = IAccountFB | ICategoryFB | ITransactionFB;
