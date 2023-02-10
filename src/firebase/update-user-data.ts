import { doc, updateDoc } from 'firebase/firestore';
import { IDataFB } from '../interfaces';
import { DataAllFB } from '../types';
import { db, FirebaseError } from './firebase-config';

export const updateUserData = async (userId: string, data: IDataFB) => {
  try {
    Object.entries(data).forEach(async (accounts) => {
      Object.entries(accounts[1]).forEach(async (id) => {
        Object.entries(id[1] as DataAllFB).forEach(async (color) => {
          const docRef = doc(db, `users/${userId}/${accounts[0]}`, id[0]);
          const updates = { [color[0]]: color[1] };
          await updateDoc(docRef, updates);
        });
      });
    });
  } catch (error) {
    throw new FirebaseError(`updateUserData: Write failed... ${error}`);
  }
};
