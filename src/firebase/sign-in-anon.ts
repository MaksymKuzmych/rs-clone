import { signInAnonymously } from 'firebase/auth';
import { auth, FirebaseError } from './firebase-config';

export const signInAnon = async () => {
  try {
    await signInAnonymously(auth);
    console.log('user signed in anonymously');
  } catch (error) {
    throw new FirebaseError(`Sign In Anon: ${error}`);
  }
};
