import {
  GithubAuthProvider,
  GoogleAuthProvider,
  linkWithPopup,
  signInWithPopup,
} from 'firebase/auth';

import { Provider } from '../enums';
import { auth, FirebaseError } from './firebase-config';

export const signInProvider = async (provider: Provider) => {
  const CREDENTIALS_ERROR = 'FirebaseError: Firebase: Error (auth/credential-already-in-use).';
  const EMAIL_ERROR = 'FirebaseError: Firebase: Error (auth/email-already-in-use).';
  let authProvider = new GoogleAuthProvider();

  if (provider === Provider.Github) {
    authProvider = new GithubAuthProvider();
  }
  try {
    try {
      if (auth.currentUser) {
        await linkWithPopup(auth.currentUser, authProvider);
      } else {
        await signInWithPopup(auth, authProvider);
      }
    } catch (error) {
      switch (`${error}`) {
        case CREDENTIALS_ERROR:
          await signInWithPopup(auth, authProvider);
          break;
        case EMAIL_ERROR:
          throw new FirebaseError('Email Already Exist');
        default:
          throw new FirebaseError(`${error}`);
      }
    }
  } catch (error) {
    throw new FirebaseError(`Sign In ${provider}: ${error}`);
  }
};
