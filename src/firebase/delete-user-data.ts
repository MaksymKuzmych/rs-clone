import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { IDataFBGet } from '../interfaces';
import { db, FirebaseError } from './firebase-config';

export const deleteUserData = async (userId: string, data: IDataFBGet) => {
  let message = '';
  try {
    const accounts = Object.entries(data);
    const docRef = doc(db, `users/${userId}/${accounts[0][0]}`, accounts[0][1]);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      message = 'Delete User Data: Data not found!';
      throw new Error();
    } else {
      await deleteDoc(docRef);
    }
  } catch (error) {
    throw message ? new FirebaseError(message) : new FirebaseError(`Delete User Data: ${error}`);
  }
};
