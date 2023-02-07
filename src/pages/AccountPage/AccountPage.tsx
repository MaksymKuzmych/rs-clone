import { ErrorMessage } from '../../components/UI/ErrorMessage/ErrorMessage';
import { AccountsHeader } from '../../components/Accounts/AccountsHeader/AccountsHeader';
import { Loader } from '../../components/UI/Loader/Loader';
import { useAccounts } from '../../hooks/accounts';
import { Anchor, TemporaryDrawer } from '../../components/UI/Drawer/Drawer';
import { useCallback, useEffect, useState } from 'react';
import { AccountInfo } from '../../components/Accounts/AccountInfo/AccountInfo';
import { AddAccountInfo } from '../../components/Accounts/AddAccountInfo/AddAccountInfo';
import { IAccount } from '../../interfaces';
import { AccountSettings } from '../../components/Accounts/AccountSettings/AccountSettings';
import { icons } from '../../data/icons';
import { colors } from '../../data/colors';
import { settings } from '../../data/settings';
import { AddAccountSettings } from '../../components/Accounts/AddAccountSettings/AddAccountSettings';

import styles from './AccountPage.module.scss';

export const AccountPage = () => {
  const { accounts, loading, error } = useAccounts();
  const [amount, setAmount] = useState(0);
  const [iconName, setIconName] = useState('');
  const [colorName, setColorName] = useState('');
  const [currency, setCurrency] = useState('');
  const [typeDrawer, setTypeDrawer] = useState('');
  const [currentAccount, setCurrentAccount] = useState(accounts[0]);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  useEffect(() => {
    const allCardsAmount = accounts.reduce((acc, account) => acc + account.balance, 0);
    setAmount(allCardsAmount);
  }, []);

  useEffect(() => {
    setCurrentAccount(accounts[0]);
  }, [accounts]);

  const setIcon = useCallback((account: IAccount) => {
    const defaultIcon = icons[9];
    const iconObj = icons.find((el) => account.iconID === el.id) || defaultIcon;

    setIconName(iconObj.name);
  }, []);

  const setColor = useCallback((account: IAccount) => {
    const defaultColor = colors[0];
    const colorObj = colors.find((el) => account.colorID === el.id) || defaultColor;

    setColorName(colorObj.name);
  }, []);

  const getIcon = useCallback((account: IAccount) => {
    const defaultIcon = icons[9];
    const iconObj = icons.find((el) => account.iconID === el.id) || defaultIcon;

    return iconObj.name;
  }, []);

  const getColor = useCallback((account: IAccount) => {
    const defaultColor = colors[0];
    const colorObj = colors.find((el) => account.colorID === el.id) || defaultColor;

    return colorObj.name;
  }, []);

  useEffect(() => {
    setCurrency(settings.currency);
  }, []);

  const toggleDrawer = useCallback(
    (anchor: Anchor, open: boolean) => {
      setState({ ...state, [anchor]: open });
    },
    [state],
  );

  const insideDrawer = useCallback(() => {
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
        return <div>edit</div>;
      case 'balance':
        return <div>balance</div>;
      case 'transactions':
        return <div>transactions</div>;
      case 'rechacrge':
        return <div>recharge</div>;
      case 'withdraw':
        return <div>withdraw</div>;
      case 'transfer':
        return <div>Transfer</div>;
      case 'addAccount':
        return <AddAccountSettings />;
    }
  }, [colorName, currency, currentAccount, iconName, typeDrawer]);

  const onClickEventHandler = useCallback(
    (type: string, anchor: Anchor) => {
      setTypeDrawer(type);
      setIsOpenDrawer(!isOpenDrawer);
      setIcon(currentAccount);
      setColor(currentAccount);
      toggleDrawer(anchor, isOpenDrawer);
    },
    [currentAccount, isOpenDrawer, setColor, setIcon, toggleDrawer],
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
            icon={getIcon(account)}
            color={getColor(account)}
            currency={currency}
            key={account.id}
            onClick={() => {
              setCurrentAccount(account);
              onClickEventHandler('info', 'bottom');
            }}
          />
        ))}
      <AddAccountInfo onClick={() => onClickEventHandler('addAccount', 'bottom')} />
      <TemporaryDrawer
        state={state}
        toggleDrawer={toggleDrawer}
        anchor='bottom'
        onClick={() => onClickEventHandler('info', 'bottom')}
      >
        {insideDrawer()}
      </TemporaryDrawer>
    </div>
  );
};
