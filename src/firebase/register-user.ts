import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  linkWithCredential,
} from 'firebase/auth';
import { auth, FirebaseError } from './firebase-config';

export const registerUser = async (email: string, password: string) => {
  const credential = EmailAuthProvider.credential(email, password);
  try {
    if (auth.currentUser) {
      linkWithCredential(auth.currentUser, credential);
      console.log('Anonymous account successfully upgraded');
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User ' + email + ' registered');
    }
  } catch (error) {
    throw new FirebaseError(`Register User: ${error}`);
  }
};
