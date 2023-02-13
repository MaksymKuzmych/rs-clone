import { doc, getDoc } from 'firebase/firestore';
import { db, FirebaseError } from './firebase-config';

export const checkUser = async (userId: string) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (error) {
    throw new FirebaseError(`Check User: ${error}`);
  }
};
