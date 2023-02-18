import { TextField } from '@mui/material';
import { useCallback, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../Auth/Auth';
import { DrawerContext } from '../../../context/Drawer';
import { CurrencySymbol } from '../../../enums';
import { updateUserData } from '../../../firebase/update-user-data';
import { IAccount } from '../../../interfaces';
import { BasicModal } from '../../UI/Modal/Modal';
import { Account } from '../Account/Account';
import { SettingsHeader } from '../Settings/SettingsHeader/SettingsHeader';
import { TransferAccount } from './TransferAccount/TransferAccount';

import styles from './Transfer.module.scss';

interface TransferProps {
  currentAccount: IAccount;
}

export const Transfer = ({ currentAccount }: TransferProps) => {
  const { userSettings, userData, changeUserData } = useContext(AuthContext);
  const { drawerHandler } = useContext(DrawerContext);

  const [targetAccount, setTargetAccount] = useState<IAccount | null>(null);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const { t } = useTranslation();

  const changeAmountHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);

    if (+event.target.value.trim() > currentAccount.balance) {
      setError(`${t('Not enough money in the account')}`);
    } else {
      setError('');
    }
  };

  const handleOpen = useCallback((targetAccount: IAccount) => {
    setTargetAccount(targetAccount);
    setOpenModal(true);
  }, []);

  const handleClose = useCallback(() => setOpenModal(false), []);

  const transferMoney = async (targetAccount: IAccount | null) => {
    if (targetAccount) {
      const from = currentAccount;
      const to = targetAccount;
      if (amount.trim().length === 0) {
        setError(`${t('Enter transfer amount')}`);
        return;
      }

      if (+amount.trim() > currentAccount.balance) {
        return;
      }

      from.balance -= +amount;
      to.balance += +amount;

      await updateUserData(userSettings.userId, {
        accounts: {
          [currentAccount.id]: from,
          [targetAccount.id]: to,
        },
      });

      changeUserData();
      drawerHandler('info', 'bottom', false);
    }
  };

  const accounts = useMemo(
    () =>
      userData.accounts
        .filter((account) => account.id !== currentAccount.id)
        .map((account) => (
          <Account account={account} key={account.id} onClick={() => handleOpen(account)} />
        )),
    [currentAccount.id, handleOpen, userData.accounts],
  );

  return (
    <>
      <SettingsHeader currentAccount={currentAccount} />
      <div className={styles.accountsWrapper}>
        {accounts.length ? (
          accounts
        ) : (
          <p className={styles.emptyAccountsTitle}>{t('No other accounts')}</p>
        )}
      </div>
      <BasicModal openModal={openModal} handleClose={handleClose}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <TransferAccount account={currentAccount} text={t('From account')} />
            <TransferAccount account={targetAccount} text={t('To account')} />
          </div>
          <div className={styles.inputWrapper}>
            <TextField
              autoComplete='off'
              variant='standard'
              color='primary'
              name='balance'
              label={t('Amount')}
              type='number'
              sx={{ width: '160px' }}
              value={amount}
              onChange={changeAmountHandler}
            />
            <span className={styles.currency}>{CurrencySymbol[userSettings.currency]}</span>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button
            className={styles.modalBtn}
            onClick={() => transferMoney(targetAccount)}
            style={{ backgroundColor: error ? '#f34334' : '#18ab81' }}
          >
            {t('Transfer')}
          </button>
        </div>
      </BasicModal>
    </>
  );
};
