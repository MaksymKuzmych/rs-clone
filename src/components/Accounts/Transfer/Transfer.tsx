import { memo, useCallback, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';

import { AuthContext } from '../../../Auth/Auth';
import { DrawerContext } from '../../../context/Drawer';
import { ThemeColor, Theme, TransactionType } from '../../../enums';
import { IAccount } from '../../../interfaces';
import { BasicModal } from '../../UI/Modal/Modal';
import { Account } from '../Account/Account';
import { SettingsHeader } from '../Settings/SettingsHeader/SettingsHeader';
import { TransferAccount } from './TransferAccount/TransferAccount';
import { Calculator } from '../../UI/Calculator/Calculator';
import { pushUserData } from '../../../firebase/push-user-data';
import { incrementBalance } from '../../../firebase/increment-balance';

import styles from './Transfer.module.scss';

interface TransferProps {
  currentAccount: IAccount;
}

export const Transfer = memo(({ currentAccount }: TransferProps) => {
  const { userData, changeUserData } = useContext(AuthContext);
  const { drawerHandler } = useContext(DrawerContext);

  const [targetAccount, setTargetAccount] = useState<IAccount | null>(null);
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [day, setDay] = useState<Dayjs | null>(dayjs(Date.now()));
  const [isError, setIsError] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { t } = useTranslation();

  const changeAmountHandler = (value: string) => setAmount(value);
  const changeNotesHandler = (value: string) => setNotes(value);
  const changeDayHandler = (value: Dayjs | null) => setDay(value);

  const handleOpen = useCallback((targetAccount: IAccount) => {
    setTargetAccount(targetAccount);
    setOpenModal(true);
  }, []);

  const handleClose = useCallback(() => setOpenModal(false), []);

  const transferMoney = async () => {
    if (amount === '') {
      return;
    }

    if (amount.length > 9) {
      setIsError(true);
      return;
    }

    setIsError(false);

    if (targetAccount) {
      await pushUserData(userData.settings.userId, {
        transactions: [
          {
            id: '',
            date: new Date(dayjs(day).toDate()).getTime(),
            type: TransactionType.Transfer,
            account: currentAccount.id,
            accountTo: targetAccount.id,
            category: null,
            amount: +amount,
            description: notes,
          },
        ],
      });

      await incrementBalance(userData.settings.userId, currentAccount.id, +-amount);
      await incrementBalance(userData.settings.userId, targetAccount.id, +amount);

      await changeUserData();
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
            day={day}
            changeAmountHandler={changeAmountHandler}
            changeNotesHandler={changeNotesHandler}
            changeDayHandler={changeDayHandler}
            transferMoney={transferMoney}
          />
        </div>
      </BasicModal>
    </>
  );
});
