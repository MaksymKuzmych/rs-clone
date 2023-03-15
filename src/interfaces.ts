import { Currency, Lang, Theme, Period, TransactionType } from './enums';

export interface IPeriod {
  start: number | null;
  end: number | null;
}

export interface ISettings {
  userId: string;
  lang: Lang;
  currency: Currency;
  theme: Theme;
  selectedAccount: string | null;
  periodType: Period;
  period: IPeriod;
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
  icon: string;
  color: string;
}

export interface IPeriodItem {
  name: string;
  type: Period;
  icon: string;
}

export interface ITransaction {
  id: string;
  date: number;
  type: TransactionType;
  account: string;
  accountTo: string | null;
  category: string | null;
  amount: number;
  description: string | null;
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
  settings: ISettings;
  data: IData;
}

export interface IDataFBFiltered {
  accounts?: null;
  categories?: null;
  transactions?: null | {
    account: string | null;
    period: IPeriod;
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

export interface ITransactionAll extends ITransaction {
  accountName: string;
  accountColor: string;
  accountIcon: string;
  categoryName: string;
  categoryColor: string;
  categoryIcon: string;
}

export interface IPrivat {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: number;
  6: string;
  7: number;
  8: string;
  9: number;
  10: string;
}

export interface IMono {
  0: string;
  1: string;
  2: string;
  3: number;
  4: number;
  5: string;
  6: string;
  7: string;
  8: string;
  9: number;
}

export interface IImportedData {
  transactions: ITransaction[];
  accounts: IAccount[];
  categories: ICategory[];
}
