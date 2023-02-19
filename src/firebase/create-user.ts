import { IStore } from '../interfaces';
import { storeTr } from '../mockData/transactions';
import { FirebaseError } from './firebase-config';
import { setUserData } from './set-user-data';
import { setUserSettings } from './set-user-settings';
import { updateUserSettings } from './update-user-settings';

export const createUser = async (userId: string, userData: IStore) => {
  try {
    await setUserSettings(userId, userData.settings);
    await updateUserSettings(userId, { userId: userId });
    await setUserData(userId, {
      accounts: userData.data.accounts,
      categories: userData.data.categories,
      transactions: storeTr.data.transactions,
    });
  } catch (error) {
    throw new FirebaseError(`Create User: ${error}`);
  }
};
