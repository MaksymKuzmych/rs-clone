import { doc, updateDoc } from 'firebase/firestore';

import { ISettings } from '../interfaces';
import { db, FirebaseError } from './firebase-config';

export const updateUserSettings = async (userId: string, settings: Partial<ISettings>) => {
  const docRef = doc(db, 'users', userId);
  try {
    Object.entries(settings).forEach(async (setting) => {
      const updates = { [`settings.${setting[0]}`]: setting[1] };
      await updateDoc(docRef, updates);
    });
  } catch (error) {
    throw new FirebaseError(`Update User Settings: ${error}`);
  }
};
