import { signOut } from 'firebase/auth';
import { auth, FirebaseError } from './firebase-config';

export const signOutUser = async () => {
  try {
    if (auth.currentUser && !auth.currentUser.isAnonymous) {
      await signOut(auth);
      console.log('user signed out');
    }
  } catch (error) {
    throw new FirebaseError(`Sign Out User: ${error}`);
  }
};
