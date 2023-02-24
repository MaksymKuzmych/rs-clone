import { doc, setDoc } from 'firebase/firestore';
import { ISettings } from '../interfaces';
import { db, FirebaseError } from './firebase-config';

export const setUserSettings = async (userId: string, settings: ISettings) => {
  const docRef = doc(db, 'users/', userId);
  try {
    await setDoc(docRef, { settings });
  } catch (error) {
    throw new FirebaseError(`Update User Settings: ${error}`);
  }
};
