import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, FirebaseError } from './firebase-config';

export const signInUser = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log('user ' + email + ' signed in');
  } catch (error) {
    throw new FirebaseError(`Sign In User: ${error}`);
  }
};
