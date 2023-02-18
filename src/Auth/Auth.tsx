import { CircularProgress } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import { createContext, useCallback, useEffect, useState } from 'react';
import { BrowserRouterProps } from 'react-router-dom';

import { Header } from '../components/Header/Header';
import { createAnonUser } from '../firebase/create-anon-user';
import { emptyUserData } from '../firebase/default-user-data';
import { auth } from '../firebase/firebase-config';
import { pullUserData } from '../firebase/pull-user-data';
import { pullUserSettings } from '../firebase/pull-user-settings';
import { signInAnon } from '../firebase/sign-in-anon';
import { IStore } from '../interfaces';

interface ISetCurrency {
  (amount: number, signDisplay?: 'always' | 'auto' | 'never'): string;
}

interface IAuthContext {
  userData: IStore;
  changeUserData: () => void;
  setCurrency: ISetCurrency;
}

export const AuthContext = createContext<IAuthContext>({
  userData: emptyUserData,
  changeUserData: () => {},
  setCurrency: () => '',
});

export const AuthProvider = ({ children }: BrowserRouterProps) => {
  const [userData, setUserData] = useState(emptyUserData);
  const [pending, setPending] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const setCurrency: ISetCurrency = (amount, signDisplay = 'auto') =>
    new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: userData.settings.currency,
      currencyDisplay: 'narrowSymbol',
      minimumFractionDigits: 0,
      signDisplay,
    }).format(amount);

  const changeUserData = useCallback(async () => {
    try {
      setPending(true);
      setUserData(await pullUserSettings(userData, userData.settings.userId));
      setUserData(
        await pullUserData(
          userData,
          userData.settings.userId,
          userData.settings.selectedAccount,
          userData.settings.period,
        ),
      );
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: 'error' });
    } finally {
      setPending(false);
    }
  }, [enqueueSnackbar, userData]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      // try {
      if (user) {
        await createAnonUser(user.uid);
        setUserData(await pullUserSettings(userData, user.uid));
        setUserData(
          await pullUserData(
            userData,
            user.uid,
            userData.settings.selectedAccount,
            userData.settings.period,
          ),
        );
        if (user.isAnonymous) {
          enqueueSnackbar('Anonymous Login', { variant: 'success' });
        } else {
          enqueueSnackbar(`${user.email} Login`, { variant: 'success' });
        }
        setPending(false);
      } else {
        await signInAnon();
      }
      // } catch (error) {
      //   enqueueSnackbar(`${error}`, { variant: 'error' });
      // }
    });
  }, [enqueueSnackbar, userData]);

  if (pending) {
    return (
      <>
        <Header />
        <div style={{ flexGrow: 1 }}>
          <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
        </div>
      </>
    );
  }

  return (
    <AuthContext.Provider value={{ userData, changeUserData, setCurrency }}>
      {children}
    </AuthContext.Provider>
  );
};
