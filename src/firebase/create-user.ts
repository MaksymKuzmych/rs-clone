import { doc, setDoc } from 'firebase/firestore';
import { IStore } from '../interfaces';
import { db, FirebaseError } from './firebase-config';

export const createUser = async (userId: string, userData: IStore) => {
  try {
    await setDoc(doc(db, 'users/', userId), {
      settings: userData.settings,
    });
    userData.data.accounts.forEach(async (account) => {
      await setDoc(doc(db, 'users/' + userId + '/accounts', account.id), account);
    });
    userData.data.categories.forEach(async (category) => {
      await setDoc(doc(db, 'users/' + userId + '/categories', category.id), category);
    });
  } catch (error) {
    throw new FirebaseError(`Create User: ${error}`);
  }
};
