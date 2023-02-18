import { doc, setDoc } from 'firebase/firestore';
import { IStore } from '../interfaces';
import { storeTr } from '../mockData/transactions';
import { db, FirebaseError } from './firebase-config';
import { updateUserSettings } from './update-user-settings';

export const createUser = async (userId: string, userData: IStore) => {
  try {
    await setDoc(doc(db, 'users/', userId), {
      settings: userData.settings,
    });
    await updateUserSettings(userId, { userId: userId });
    userData.data.accounts.forEach(async (account) => {
      await setDoc(doc(db, 'users/' + userId + '/accounts', account.id), account);
    });
    userData.data.categories.forEach(async (category) => {
      await setDoc(doc(db, 'users/' + userId + '/categories', category.id), category);
    });
    storeTr.data.transactions.forEach(async (transaction) => {
      await setDoc(doc(db, 'users/' + userId + '/transactions', transaction.id), transaction);
    });
  } catch (error) {
    throw new FirebaseError(`Create User: ${error}`);
  }
};
