import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, FirebaseError } from './firebase-config';

export const signInGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    throw new FirebaseError(`Sign In Google: ${error}`);
  }
};
