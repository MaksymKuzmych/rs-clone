import { doc, setDoc } from 'firebase/firestore';
import { IData } from '../interfaces';
import { db, FirebaseError } from './firebase-config';

export const setUserData = async (userId: string, data: Partial<IData>) => {
  try {
    Object.entries(data).forEach(async (accounts) => {
      accounts[1].forEach(async (account) => {
        await setDoc(doc(db, `users/${userId}/${accounts[0]}`, account.id), account);
      });
    });
  } catch (error) {
    throw new FirebaseError(`Set User Data: ${error}`);
  }
};
