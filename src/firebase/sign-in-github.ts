import { signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { auth, FirebaseError } from './firebase-config';

export const signInGithub = async () => {
  const provider = new GithubAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    throw new FirebaseError(`Sign In Github: ${error}`);
  }
};
