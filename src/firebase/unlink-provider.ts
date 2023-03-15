import { unlink } from 'firebase/auth';

import { Provider } from '../enums';
import { auth, FirebaseError } from './firebase-config';

export const unlinkProvider = async (provider: Provider) => {
  try {
    if (auth.currentUser) {
      await unlink(auth.currentUser, provider);
    }
  } catch (error) {
    throw new FirebaseError(`Unlink Provider: ${error}`);
  }
};
