import { IAccount, ICategory, ITransaction } from './interfaces';

export type Anchor = 'top' | 'left' | 'bottom' | 'right';

export type DataAllFB = Partial<IAccount> | Partial<ICategory> | Partial<ITransaction>;
