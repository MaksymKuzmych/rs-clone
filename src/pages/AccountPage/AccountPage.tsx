import { useCallback, useState } from 'react';

import { ErrorMessage } from '../../components/UI/ErrorMessage/ErrorMessage';
import { Header } from '../../components/Accounts/Header/Header';
import { Loader } from '../../components/UI/Loader/Loader';
import { TemporaryDrawer } from '../../components/UI/Drawer/Drawer';
import { Account } from '../../components/Accounts/Account/Account';
import { AddAccount } from '../../components/Accounts/AddAccount/AddAccount';
import { IAccount } from '../../interfaces';
import { Settings } from '../../components/Accounts/Settings/Settings';
import { AddSettings } from '../../components/Accounts/AddSettings/AddSettings';
import { useAccounts } from '../../hooks/accounts';
import { useDrawer } from '../../hooks/drawer';
import { Anchor } from '../../types';

import styles from './AccountPage.module.scss';

export const AccountPage = () => {
  const { accounts, amount, currency, loading, error } = useAccounts();
  const { state, toggleDrawer } = useDrawer();
  const [typeDrawer, setTypeDrawer] = useState('');
  const [currentAccount, setCurrentAccount] = useState(accounts[0]);
  const [isOpenDrawer, setIsOpenDrawer] = useState(true);

  const drawerContent = () => {
    switch (typeDrawer) {
      case 'info':
        return <Settings account={currentAccount} currency={currency} />;
      case 'edit':
        return <div>Edit</div>;
      case 'balance':
        return <div>Balance</div>;
      case 'transactions':
        return <div>Transactions</div>;
      case 'rechacrge':
        return <div>Recharge</div>;
      case 'withdraw':
        return <div>Withdraw</div>;
      case 'transfer':
        return <div>Transfer</div>;
      case 'addAccount':
        return <AddSettings currency={currency} drawerHandler={drawerHandler} />;
    }
  };

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
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      <Header currency={currency} amount={amount} />
      {accounts.length &&
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
