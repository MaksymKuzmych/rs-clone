import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { AccountHeader } from '../../components/Accounts/AccountHeader/AccountHeader';
import { TemporaryDrawer } from '../../components/UI/Drawer/Drawer';
import { Account } from '../../components/Accounts/Account/Account';
import { AddAccount } from '../../components/Accounts/AddAccount/AddAccount';
import { IAccount } from '../../interfaces';
import { Settings } from '../../components/Accounts/Settings/Settings';
import { AccountForm } from '../../components/Accounts/AccountForm/AccountForm';
import { AuthContext } from '../../Auth/Auth';
import { DrawerContext } from '../../context/Drawer';
import { CurrencySymbol } from '../../enums';

import styles from './AccountPage.module.scss';

export const AccountPage = () => {
  const { userData } = useContext(AuthContext);
  const { state, typeDrawer, drawerHandler } = useContext(DrawerContext);

  const [amount, setAmount] = useState(0);
  const [currentAccount, setCurrentAccount] = useState(userData.data.accounts[0]);

  useEffect(() => {
    const allCardsAmount = userData.data.accounts.reduce(
      (acc, account) => acc + account.balance,
      0,
    );
    setAmount(allCardsAmount);
  }, [userData.data.accounts]);

  const drawerContent = useCallback(() => {
    switch (typeDrawer) {
      case 'info':
        return <Settings account={currentAccount} />;
      case 'edit':
        return <AccountForm account={currentAccount} />;
      case 'transactions':
        return <div>Transactions</div>;
      case 'delete':
        return <div>delete</div>;
      case 'recharge':
        return <div>Recharge</div>;
      case 'withdraw':
        return <div>Withdraw</div>;
      case 'transfer':
        return <div>Transfer</div>;
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
          currency={CurrencySymbol[userData.settings.currency]}
          key={account.id}
          accountDrawerHandler={accountDrawerHandler}
        />
      )),
    [accountDrawerHandler, userData.data.accounts, userData.settings.currency],
  );

  return (
    <div className={styles.accountPage}>
      <AccountHeader currency={CurrencySymbol[userData.settings.currency]} amount={amount} />
      {accounts}
      <AddAccount drawerHandler={drawerHandler} />
      <TemporaryDrawer
        state={state}
        anchor='bottom'
        type={typeDrawer}
        drawerHandler={drawerHandler}
      >
        {drawerContent()}
      </TemporaryDrawer>
    </div>
  );
};
