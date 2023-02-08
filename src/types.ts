import { IAccount, ICategory, ITransaction } from './interfaces';

export type IChart = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
};

export type Anchor = 'top' | 'left' | 'bottom' | 'right';

export type DataAllFB = Partial<IAccount> | Partial<ICategory> | Partial<ITransaction>;
