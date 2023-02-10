import { onAuthStateChanged } from 'firebase/auth';
import { createAnonUser } from './create-anon-user';
import { auth } from './firebase-config';
import { pullUserData } from './pull-user-data';
import { signInAnon } from './sign-in-anon';
import { userData } from './user-data';

onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log('user signed in', auth.currentUser?.uid);
    await createAnonUser();
    await pullUserData();
    console.log(userData);
  } else {
    console.log('user signed out');
    await signInAnon();
  }
});

export const getUserId = () => {
  if (auth.currentUser) {
    return auth.currentUser.uid;
  }
  return '';
};
