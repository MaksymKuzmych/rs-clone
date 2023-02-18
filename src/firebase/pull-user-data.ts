import { Period } from '../enums';
import { IAccount, ICategory, IData, IPeriod, ITransaction } from '../interfaces';
import { getPeriod } from '../utils/get-period';
import { getFilteredUserData } from './get-filtered-user-data';

export const pullUserData = async (
  userData: IData,
  id: string,
  account: string | null = null,
  period: IPeriod = getPeriod(Period.Month, Date.now()),
) => {
  userData.accounts = (await getFilteredUserData(id, {
    accounts: null,
  })) as IAccount[];
  userData.categories = (await getFilteredUserData(id, {
    categories: null,
  })) as ICategory[];
  userData.transactions = (await getFilteredUserData(id, {
    transactions: {
      account,
      period,
    },
  })) as ITransaction[];
  return userData;
};
