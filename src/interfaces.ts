import { Currency, Lang, Mode, Period, TransactionType } from './enums';

export interface ISettings {
  lang: Lang;
  currency: Currency;
  theme: Mode;
  selectedAccount: string | null;
  periodType: Period;
  period: { start: number | null; end: number | null };
}

export interface IAccount {
  id: string;
  date: number;
  name: string;
  icon: string;
  color: string;
  balance: number;
  description: string;
}

export interface ICategory {
  id: string;
  date: number;
  name: string;
  type: TransactionType;
  iconID: number;
  colorID: number;
}

export interface IPeriodItem {
  name: string;
  type: Period;
  iconID: number;
  description: string | null;
}

export interface ITransaction {
  id: string;
  date: number;
  type: TransactionType;
  account: string;
  category: string;
  amount: number;
  description: string;
}

export interface IData {
  accounts: IAccount[];
  categories: ICategory[];
  transactions: ITransaction[];
}

export interface IDataFB {
  accounts?: { [id: string]: Partial<IAccount> };
  categories?: { [id: string]: Partial<ICategory> };
  transactions?: { [id: string]: Partial<ITransaction> };
}

export interface IDataFBGet {
  accounts?: string;
  categories?: string;
  transactions?: string;
}

export interface IStore {
  userId: string;
  settings: ISettings;
  data: IData;
}

export interface IDataFBFiltered {
  accounts?: null;
  categories?: null;
  transactions?: null | {
    periodStart?: number;
    periodEnd?: number;
    account?: string;
    category?: string;
    type?: TransactionType;
  };
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

export interface IDrawerSide {
  top: boolean;
  left: boolean;
  bottom: boolean;
  right: boolean;
}

export interface IChart {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
}

export interface IDrawerSide {
  top: boolean;
  left: boolean;
  bottom: boolean;
  right: boolean;
}
