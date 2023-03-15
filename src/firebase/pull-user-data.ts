import { Sort } from '../enums';
import { IAccount, ICategory, IPeriod, IStore, ITransaction } from '../interfaces';
import { getFilteredUserData } from './get-filtered-user-data';

export const pullUserData = async (
  userData: IStore,
  id: string,
  account: string | null = null,
  period: IPeriod = { start: null, end: null },
) => {
  userData.data.accounts = (await getFilteredUserData(
    id,
    {
      accounts: null,
    },
    Sort.ASC,
  )) as IAccount[];
  userData.data.categories = (await getFilteredUserData(
    id,
    {
      categories: null,
    },
    Sort.ASC,
  )) as ICategory[];
  userData.data.transactions = (await getFilteredUserData(
    id,
    {
      transactions: {
        account,
        period,
      },
    },
    Sort.DESC,
  )) as ITransaction[];
  return userData;
};
