import { Sort } from '../enums';
import { IAccount, ICategory, IStore, ITransaction } from '../interfaces';
import { getUserData } from './get-user-data';

export const pullUserData = async (userData: IStore, id: string) => {
  userData.data.accounts = (await getUserData(
    id,
    {
      accounts: null,
    },
    Sort.ASC,
  )) as IAccount[];
  userData.data.categories = (await getUserData(
    id,
    {
      categories: null,
    },
    Sort.ASC,
  )) as ICategory[];
  userData.data.transactions = (await getUserData(
    id,
    {
      transactions: null,
    },
    Sort.DESC,
  )) as ITransaction[];
  return userData;
};
