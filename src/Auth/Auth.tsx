import { CircularProgress } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import { createContext, useEffect, useState } from 'react';
import { BrowserRouterProps } from 'react-router-dom';
import { Currency, Lang, Period } from '../enums';
import { createAnonUser } from '../firebase/create-anon-user';
import { defaultUserData } from '../firebase/default-user-data';
import { auth } from '../firebase/firebase-config';
import { pullUserData } from '../firebase/pull-user-data';
import { signInAnon } from '../firebase/sign-in-anon';
import { IStore } from '../interfaces';
import { getPeriod } from '../utils/get-period';

interface IAuthContext {
  userData: IStore;
  changeUserData: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  userData: {
    userId: '',
    settings: {
      lang: Lang.EN,
      currency: Currency.USD,
      selectedAccount: null,
      periodType: Period.Month,
      period: getPeriod(Period.Month, Date.now()),
    },
    data: {
      accounts: [],
      categories: [],
      transactions: [],
    },
  },
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
