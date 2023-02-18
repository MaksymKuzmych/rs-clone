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
import { IData, ISettings } from '../interfaces';

interface ISetCurrency {
  (amount: number, signDisplay?: 'always' | 'auto' | 'never'): string;
}

interface IAuthContext {
  userSettings: ISettings;
  userData: IData;
  changeUserSettings: () => void;
  changeUserData: () => void;
  setCurrency: ISetCurrency;
}

export const AuthContext = createContext<IAuthContext>({
  userSettings: emptyUserData.settings,
  userData: emptyUserData.data,
  changeUserSettings: () => {},
  changeUserData: () => {},
  setCurrency: () => '',
});

export const AuthProvider = ({ children }: BrowserRouterProps) => {
  const [userSettings, setUserSettings] = useState(emptyUserData.settings);
  const [userData, setUserData] = useState(emptyUserData.data);
  const [pending, setPending] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const setCurrency: ISetCurrency = (amount, signDisplay = 'auto') =>
    new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: userSettings.currency,
      currencyDisplay: 'narrowSymbol',
      minimumFractionDigits: 0,
      signDisplay,
    }).format(amount);

  const changeUserSettings = useCallback(async () => {
    try {
      setPending(true);
      setUserSettings(await pullUserSettings(userSettings, userSettings.userId));
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: 'error' });
    } finally {
      setPending(false);
    }
  }, [enqueueSnackbar, userSettings]);

  const changeUserData = useCallback(async () => {
    try {
      setPending(true);
      setUserData(await pullUserData(userData, userSettings.userId));
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: 'error' });
    } finally {
      setPending(false);
    }
  }, [enqueueSnackbar, userData, userSettings.userId]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          await createAnonUser(user.uid);
          setUserSettings(await pullUserSettings(userSettings, user.uid));
          setUserData(
            await pullUserData(
              userData,
              user.uid,
              userSettings.selectedAccount,
              userSettings.period,
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
      } catch (error) {
        enqueueSnackbar(`${error}`, { variant: 'error', persist: true });
      }
    });
  }, [enqueueSnackbar, userData, userSettings]);

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
    <AuthContext.Provider
      value={{ userSettings, userData, changeUserSettings, changeUserData, setCurrency }}
    >
      {children}
    </AuthContext.Provider>
  );
};
