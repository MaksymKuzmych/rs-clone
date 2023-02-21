import { IAccount, ICategory, IStore, ITransaction } from '../interfaces';
import { getFilteredUserData } from './get-filtered-user-data';
import { getUserSettings } from './get-user-settings';

export const pullUserData = async (userData: IStore, id: string) => {
  userData.userId = id;
  userData.settings = await getUserSettings(id);
  userData.data.accounts = (await getFilteredUserData(
    id,
    {
      accounts: null,
    },
    'asc',
  )) as IAccount[];
  userData.data.categories = (await getFilteredUserData(
    id,
    {
      categories: null,
    },
    'asc',
  )) as ICategory[];
  userData.data.transactions = (await getFilteredUserData(
    id,
    {
      transactions: null,
    },
    'desc',
  )) as ITransaction[];
  return userData;
};
