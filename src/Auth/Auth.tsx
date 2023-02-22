import { CircularProgress } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import { createContext, useCallback, useEffect, useState } from 'react';
import { BrowserRouterProps } from 'react-router-dom';

import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { Theme, ThemeColor } from '../enums';
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
  changeUserData: () => Promise<void>;
  setCurrency: ISetCurrency;
}

export const AuthContext = createContext<IAuthContext>({
  userData: emptyUserData,
  changeUserData: async () => {},
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
      setPending(false);
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: 'error' });
    }
  }, [enqueueSnackbar, userData]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setPending(true);
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
          setPending(false);
          if (user.isAnonymous) {
            enqueueSnackbar('Anonymous Login', { variant: 'success' });
          } else {
            enqueueSnackbar(`${user.email} Login`, { variant: 'success' });
          }
        } else {
          await signInAnon();
        }
      } catch (error) {
        enqueueSnackbar(`${error}`, { variant: 'error' });
      }
    });
  }, [enqueueSnackbar, userData]);

  if (pending) {
    return (
      <>
        <Header />
        <div
          style={{
            flexGrow: 1,
            backgroundColor:
              userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
          }}
        >
          <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <AuthContext.Provider value={{ userData, changeUserData, setCurrency }}>
      {children}
    </AuthContext.Provider>
  );
};
