import { IAccount, ICategory, ITransaction } from '../interfaces';
import { getFilteredUserData } from './get-filtered-user-data';
import { getUserId } from './get-user-id';
import { getUserSettings } from './get-user-settings';
import { userData } from './user-data';

export const pullUserData = async () => {
  userData.userId = getUserId();
  userData.settings = await getUserSettings(getUserId());
  userData.data.accounts = (await getFilteredUserData(getUserId(), {
    accounts: null,
  })) as IAccount[];
  userData.data.categories = (await getFilteredUserData(getUserId(), {
    categories: null,
  })) as ICategory[];
  userData.data.transactions = (await getFilteredUserData(getUserId(), {
    transactions: null,
  })) as ITransaction[];
};
