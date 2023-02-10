import { doc, getDoc } from 'firebase/firestore';
import { IDataFBGet } from '../interfaces';
import { db, FirebaseError } from './firebase-config';

export const getUserData = async (userId: string, data: IDataFBGet) => {
  let message = '';
  try {
    const accounts = Object.entries(data);
    const docRef = doc(db, `users/${userId}/${accounts[0][0]}`, accounts[0][1]);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      message = 'Firebase getUserData: Data not found!';
    }
  } catch (error) {
    throw message
      ? new FirebaseError(message)
      : new FirebaseError(`getUserData: Read failed... ${error}`);
  }
};
