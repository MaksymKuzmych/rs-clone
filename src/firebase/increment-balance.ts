import { doc, updateDoc, increment } from 'firebase/firestore';
import { db, FirebaseError } from './firebase-config';

export const incrementBalance = async (userId: string, accountId: string, amount: number) => {
  const docRef = doc(db, `users/${userId}/accounts`, accountId);
  try {
    await updateDoc(docRef, { balance: increment(amount) });
  } catch (error) {
    throw new FirebaseError(`Update User Data: ${error}`);
  }
};
