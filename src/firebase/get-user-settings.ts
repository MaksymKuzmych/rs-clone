import { doc, getDoc } from 'firebase/firestore';

import { db, FirebaseError } from './firebase-config';

export const getUserSettings = async (userId: string) => {
  const docRef = doc(db, 'users', userId);
  let message = '';
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().settings;
    } else {
      message = 'Get User Settings: User not found!';
      throw new Error();
    }
  } catch (error) {
    throw message ? new FirebaseError(message) : new FirebaseError(`Get User Settings: ${error}`);
  }
};
