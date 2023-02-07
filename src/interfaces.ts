import { ReactNode } from 'react';

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

export interface IDataFB {
  accounts?: { [id: number]: Partial<IAccount> };
  categories?: { [id: number]: Partial<ICategory> };
  transactions?: { [id: number]: Partial<ITransaction> };
}

export interface IDataFBDelete {
  accounts?: number;
  categories?: number;
  transactions?: number;
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

export type DataAllFB = Partial<IAccount> | Partial<ICategory> | Partial<ITransaction>;

export type PropsWithChildren<P> = P & { children?: ReactNode };
