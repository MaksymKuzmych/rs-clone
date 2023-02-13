import { CircularProgress } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import { createContext, useEffect, useState } from 'react';
import { BrowserRouterProps } from 'react-router-dom';

import { createAnonUser } from '../firebase/create-anon-user';
import { defaultUserData } from '../firebase/default-user-data';
import { auth } from '../firebase/firebase-config';
import { pullUserData } from '../firebase/pull-user-data';
import { signInAnon } from '../firebase/sign-in-anon';

export const AuthContext = createContext({
  userData: defaultUserData,
  changeUserData: () => {},
});

export const AuthProvider = ({ children }: BrowserRouterProps) => {
  const [userData, setUserData] = useState(JSON.parse(JSON.stringify(defaultUserData)));
  const [pending, setPending] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const changeUserData = async () => {
    try {
      setUserData(await pullUserData(userData, userData.userId));
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: 'error' });
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          await createAnonUser(user.uid);
          setUserData(await pullUserData(userData, user.uid));
          if (user.isAnonymous) {
            enqueueSnackbar('Anonymous Login', { variant: 'success' });
          } else {
            enqueueSnackbar(`${user.email} Login`, { variant: 'success' });
          }
          setPending(false);
        } else {
          await signInAnon();
        }
      } catch (error) {
        enqueueSnackbar(`${error}`, { variant: 'error', persist: true });
      }
    });
  }, [enqueueSnackbar, userData]);

  if (pending) {
    return (
      <div style={{ flexGrow: 1 }}>
        <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ userData, changeUserData }}>{children}</AuthContext.Provider>
  );
};
