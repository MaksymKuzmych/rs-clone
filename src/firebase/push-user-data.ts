import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { IData } from '../interfaces';
import { db, FirebaseError } from './firebase-config';

export const pushUserData = async (userId: string, data: Partial<IData>) => {
  try {
    Object.entries(data).forEach(async (accounts) => {
      accounts[1].forEach(async (id) => {
        const docRef = doc(collection(db, `users/${userId}/${accounts[0]}`));
        const docRefId = doc(db, `users/${userId}/${accounts[0]}`, docRef.id);
        await setDoc(docRef, id);
        await updateDoc(docRefId, { id: docRef.id });
      });
    });
  } catch (error) {
    throw new FirebaseError(`pushUserData: Write failed... ${error}`);
  }
};
