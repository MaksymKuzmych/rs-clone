import { onAuthStateChanged } from 'firebase/auth';
import { createAnonUser } from './create-anon-user';
import { auth } from './firebase-config';
import { pullUserData } from './pull-user-data';
import { signInAnon } from './sign-in-anon';

onAuthStateChanged(auth, async (user) => {
  if (user) {
    await createAnonUser();
    await pullUserData();
  } else {
    await signInAnon();
  }
});

export const getUserId = () => {
  if (auth.currentUser) {
    return auth.currentUser.uid;
  }
  return 'default';
};
