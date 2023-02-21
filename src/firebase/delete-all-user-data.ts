import { deleteDoc, doc } from 'firebase/firestore';
import { IData } from '../interfaces';
import { db, FirebaseError } from './firebase-config';

export const deleteAllUserData = async (userId: string, data: Partial<IData>) => {
  try {
    Object.entries(data).forEach(async (accounts) => {
      accounts[1].forEach(async (account) => {
        const docRef = doc(db, `users/${userId}/${accounts[0]}`, account.id);
        await deleteDoc(docRef);
      });
    });
  } catch (error) {
    throw new FirebaseError(`Delete User Data: ${error}`);
  }
};
