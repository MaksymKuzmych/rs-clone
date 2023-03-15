import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material';

import { AccountHeader } from '../../components/Accounts/AccountHeader/AccountHeader';
import { TemporaryDrawer } from '../../components/UI/Drawer/Drawer';
import { Account } from '../../components/Accounts/Account/Account';
import { AddAccount } from '../../components/Accounts/AddAccount/AddAccount';
import { IAccount } from '../../interfaces';
import { Settings } from '../../components/Accounts/Settings/Settings';
import { AccountForm } from '../../components/Forms/AccountForm';
import { AuthContext } from '../../Auth/Auth';
import { DrawerContext } from '../../context/Drawer';
import { Transfer } from '../../components/Accounts/Transfer/Transfer';
import { theme } from '../../styles/theme';
import { Theme, ThemeColor } from '../../enums';

import styles from './AccountPage.module.scss';

export const AccountPage = () => {
  const { userData } = useContext(AuthContext);
  const { state, typeDrawer, drawerHandler } = useContext(DrawerContext);

  const [amount, setAmount] = useState(0);
  const [currentAccount, setCurrentAccount] = useState({
    id: '',
    date: Date.now(),
    name: '',
    icon: '',
    color: '',
    balance: 0,
    description: '',
  });

  useEffect(() => {
    if (userData.data.accounts) {
      const allCardsAmount = userData.data.accounts.reduce(
        (acc, account) => acc + account.balance,
        0,
      );
      setAmount(allCardsAmount);
    }
  }, [userData.data.accounts]);

  const drawerContent = useCallback(() => {
    switch (typeDrawer) {
      case 'info':
        return <Settings currentAccount={currentAccount} />;
      case 'edit':
        return <AccountForm currentAccount={currentAccount} />;
      case 'transfer':
        return <Transfer currentAccount={currentAccount} />;
      case 'addAccount':
        return <AccountForm />;
    }
  }, [currentAccount, typeDrawer]);

  const accountDrawerHandler = useCallback(
    (account: IAccount) => {
      setCurrentAccount(account);
      drawerHandler('info', 'bottom', true);
    },
    [drawerHandler],
  );

  const accounts = useMemo(
    () =>
      userData.data.accounts.map((account) => (
        <Account
          account={account}
          key={account.id}
          onClick={() => {
            accountDrawerHandler(account);
          }}
        />
      )),
    [accountDrawerHandler, userData.data.accounts],
  );

  return (
    <ThemeProvider theme={theme(userData.settings.theme)}>
      <div
        className={styles.accountPage}
        style={{
          color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
          backgroundColor:
            userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
        }}
      >
        <AccountHeader amount={amount} />
        <div className={styles.accountsWrapper}>
          {accounts}
          <AddAccount drawerHandler={drawerHandler} />
        </div>
        <TemporaryDrawer
          state={state}
          anchor='bottom'
          type={typeDrawer}
          drawerHandler={drawerHandler}
        >
          {drawerContent()}
        </TemporaryDrawer>
      </div>
    </ThemeProvider>
  );
};
