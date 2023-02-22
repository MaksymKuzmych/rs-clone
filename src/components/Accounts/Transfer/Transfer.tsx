import { useCallback, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../Auth/Auth';
import { DrawerContext } from '../../../context/Drawer';
import { ThemeColor, Theme } from '../../../enums';
import { updateUserData } from '../../../firebase/update-user-data';
import { IAccount } from '../../../interfaces';
import { BasicModal } from '../../UI/Modal/Modal';
import { Account } from '../Account/Account';
import { SettingsHeader } from '../Settings/SettingsHeader/SettingsHeader';
import { TransferAccount } from './TransferAccount/TransferAccount';
import { Calculator } from '../../UI/Calculator/Calculator';

import styles from './Transfer.module.scss';

interface TransferProps {
  currentAccount: IAccount;
}

export const Transfer = ({ currentAccount }: TransferProps) => {
  const { userData, changeUserData } = useContext(AuthContext);
  const { drawerHandler } = useContext(DrawerContext);

  const [targetAccount, setTargetAccount] = useState<IAccount | null>(null);
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [isError, setIsError] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { t } = useTranslation();

  const changeAmountHandler = (value: string) => setAmount(value);

  const changeNotesHandler = (value: string) => setNotes(value);

  const handleOpen = useCallback((targetAccount: IAccount) => {
    setTargetAccount(targetAccount);
    setOpenModal(true);
  }, []);

  const handleClose = useCallback(() => setOpenModal(false), []);

  const transferMoney = async () => {
    if (amount.length > 9) {
      setIsError(true);
      return;
    }
    setIsError(false);
    if (targetAccount) {
      const from = currentAccount;
      const to = targetAccount;

      from.balance -= +amount;
      to.balance += +amount;

      await updateUserData(userData.userId, {
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
      userData.data.accounts
        .filter((account) => account.id !== currentAccount.id)
        .map((account) => (
          <Account account={account} key={account.id} onClick={() => handleOpen(account)} />
        )),
    [currentAccount.id, handleOpen, userData.data.accounts],
  );

  return (
    <>
      <SettingsHeader currentAccount={currentAccount} />
      <div
        className={styles.accountsWrapper}
        style={{
          backgroundColor:
            userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
          color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
        }}
      >
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
          {isError && <p className={styles.error}>{t('Amount must be at most 9 characters')}</p>}
          <Calculator
            type={'Transfer'}
            amount={amount}
            notes={notes}
            changeAmountHandler={changeAmountHandler}
            changeNotesHandler={changeNotesHandler}
            transferMoney={transferMoney}
          />
        </div>
      </BasicModal>
    </>
  );
};
