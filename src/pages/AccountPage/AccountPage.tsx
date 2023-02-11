import { useCallback, useState } from 'react';

import { ErrorMessage } from '../../components/UI/ErrorMessage/ErrorMessage';
import { AccountsHeader } from '../../components/Accounts/AccountsHeader/AccountsHeader';
import { Loader } from '../../components/UI/Loader/Loader';
import { TemporaryDrawer } from '../../components/UI/Drawer/Drawer';
import { AccountInfo } from '../../components/Accounts/AccountInfo/AccountInfo';
import { AddAccountInfo } from '../../components/Accounts/AddAccountInfo/AddAccountInfo';
import { IAccount } from '../../interfaces';
import { AccountSettings } from '../../components/Accounts/AccountSettings/AccountSettings';
import { AddAccountSettings } from '../../components/Accounts/AddAccountSettings/AddAccountSettings';
import { useAccounts } from '../../hooks/accounts';
import { useDrawer } from '../../hooks/drawer';
import { Anchor } from '../../types';

import styles from './AccountPage.module.scss';

export const AccountPage = () => {
  const { accounts, amount, currency, loading, error } = useAccounts();
  const { state, toggleDrawer } = useDrawer();
  const [iconName, setIcon] = useState('');
  const [colorName, setColor] = useState('');
  const [typeDrawer, setTypeDrawer] = useState('');
  const [currentAccount, setCurrentAccount] = useState(accounts[0]);
  const [isOpenDrawer, setIsOpenDrawer] = useState(true);

  const drawerContent = () => {
    switch (typeDrawer) {
      case 'info':
        return (
          <AccountSettings
            account={currentAccount}
            icon={iconName}
            color={colorName}
            currency={currency}
          />
        );
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
        return <AddAccountSettings />;
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
    (type: string, anchor: Anchor, account: IAccount) => {
      setCurrentAccount(account);
      setIcon(account.icon);
      setColor(account.color);
      drawerHandler(type, anchor);
    },
    [drawerHandler],
  );
  return (
    <div className={styles.accountPage}>
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      <AccountsHeader currency={currency} amount={amount} />
      {accounts.length &&
        accounts.map((account) => (
          <AccountInfo
            account={account}
            icon={account.icon}
            color={account.color}
            currency={currency}
            key={account.id}
            accountDrawerHandler={accountDrawerHandler}
          />
        ))}
      <AddAccountInfo drawerHandler={drawerHandler} />
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
