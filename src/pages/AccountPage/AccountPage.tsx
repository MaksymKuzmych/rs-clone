import { useCallback, useState } from 'react';
import { CircularProgress } from '@mui/material';

import { AccountHeader } from '../../components/Accounts/AccountHeader/AccountHeader';
import { TemporaryDrawer } from '../../components/UI/Drawer/Drawer';
import { Account } from '../../components/Accounts/Account/Account';
import { AddAccount } from '../../components/Accounts/AddAccount/AddAccount';
import { IAccount } from '../../interfaces';
import { Settings } from '../../components/Accounts/Settings/Settings';
import { AccountForm } from '../../components/Forms/AccountForm';
import { useAccounts } from '../../hooks/accounts';
import { useDrawer } from '../../hooks/drawer';
import { Anchor } from '../../types';

import styles from './AccountPage.module.scss';

export const AccountPage = () => {
  const { accounts, amount, currency, loading } = useAccounts();
  const { state, toggleDrawer } = useDrawer();
  const [typeDrawer, setTypeDrawer] = useState('');
  const [currentAccount, setCurrentAccount] = useState(accounts[0]);
  const [isOpenDrawer, setIsOpenDrawer] = useState(true);

  const drawerContent = () => {
    switch (typeDrawer) {
      case 'info':
        return (
          <Settings
            account={currentAccount}
            currency={currency}
            typeDrawerHandler={typeDrawerHandler}
          />
        );
      case 'edit':
        return (
          <AccountForm account={currentAccount} currency={currency} drawerHandler={drawerHandler} />
        );
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
        return <AccountForm currency={currency} drawerHandler={drawerHandler} />;
    }
  };

  const typeDrawerHandler = (type: string) => setTypeDrawer(type);

  const drawerHandler = useCallback(
    (type: string, anchor: Anchor) => {
      setTypeDrawer(type);
      setIsOpenDrawer(!isOpenDrawer);
      toggleDrawer(anchor, isOpenDrawer);
    },
    [isOpenDrawer, toggleDrawer],
  );

  const accountDrawerHandler = useCallback(
    (account: IAccount) => {
      setCurrentAccount(account);
      drawerHandler('info', 'bottom');
    },
    [drawerHandler],
  );

  return (
    <div className={styles.accountPage}>
      {loading && <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />}
      <AccountHeader currency={currency} amount={amount} />
      {accounts.length !== 0 &&
        accounts.map((account) => (
          <Account
            account={account}
            currency={currency}
            key={account.id}
            accountDrawerHandler={accountDrawerHandler}
          />
        ))}
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
