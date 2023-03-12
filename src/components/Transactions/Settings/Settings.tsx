import { memo, useCallback, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';

import { ITransactionAll } from '../../../interfaces';
import { BasicModal } from '../../UI/Modal/Modal';
import { AuthContext } from '../../../Auth/Auth';
import { Theme, ThemeColor, TransactionType } from '../../../enums';
import { SettingsBtn } from './SettingsBtn/SettingsBtn';
import { DeleteTransaction } from '../DeleteTransaction/DeleteTransaction';
import { Calculator } from '../../UI/Calculator/Calculator';
import { updateUserData } from '../../../firebase/update-user-data';
import { DuplicateTransaction } from '../DuplicateTransaction/DuplicateTransaction';
import { incrementBalance } from '../../../firebase/increment-balance';
import { defaultNames } from '../../../data/defaultNames';

import styles from './Settings.module.scss';

interface SettingsProps {
  currentTransaction: ITransactionAll;
  handleClose: () => void;
}

export const Settings = memo(({ currentTransaction, handleClose }: SettingsProps) => {
  const { userData, changeUserData } = useContext(AuthContext);

  const [typeModal, setTypeModal] = useState('');

  const modalContentHandler = (value: string) => {
    setTypeModal(value);
    handleOpen();
  };

  const [openModal, setOpenModal] = useState(false);
  const [amount, setAmount] = useState(
    `${
      currentTransaction.type === TransactionType.Income
        ? +currentTransaction.amount
        : -currentTransaction.amount
    }`,
  );
  const [notes, setNotes] = useState(
    currentTransaction.description ? currentTransaction.description : '',
  );
  const [day, setDay] = useState<Dayjs | null>(dayjs(currentTransaction.date));
  const [isError, setIsError] = useState(false);

  const { t } = useTranslation();

  const handleOpen = useCallback(() => setOpenModal(true), []);

  const changeAmountHandler = useCallback((value: string) => setAmount(value), []);
  const changeNotesHandler = useCallback((value: string) => setNotes(value), []);
  const changeDayHandler = useCallback((value: Dayjs | null) => setDay(value), []);

  const modalContent = useCallback(() => {
    switch (typeModal) {
      case 'duplicate':
        return (
          <DuplicateTransaction currentTransaction={currentTransaction} handleClose={handleClose} />
        );
      case 'delete':
        return (
          <DeleteTransaction currentTransaction={currentTransaction} handleClose={handleClose} />
        );
    }
  }, [currentTransaction, handleClose, typeModal]);

  const transferMoney = useCallback(async () => {
    const { id, type, account, accountTo, category } = currentTransaction;
    if (amount === '') {
      return;
    }

    if (amount.length > 9) {
      setIsError(true);
      return;
    }

    setIsError(false);

    await updateUserData(userData.settings.userId, {
      transactions: {
        [id]: {
          date: new Date(dayjs(day).toDate()).getTime(),
          amount: type === TransactionType.Expense ? -amount : +amount,
          description: notes,
        },
      },
    });

    if (category) {
      await incrementBalance(
        userData.settings.userId,
        account,
        (type === TransactionType.Income ? +amount : -amount) - currentTransaction.amount,
      );
    }
    if (accountTo) {
      await incrementBalance(
        userData.settings.userId,
        account,
        -amount - currentTransaction.amount,
      );
      await incrementBalance(
        userData.settings.userId,
        accountTo,
        currentTransaction.amount + +amount,
      );
    }

    await changeUserData();
    handleClose();
  }, [
    amount,
    changeUserData,
    currentTransaction,
    day,
    handleClose,
    notes,
    userData.settings.userId,
  ]);

  const Account = useMemo(
    () => (
      <div className={styles.account} style={{ backgroundColor: currentTransaction.accountColor }}>
        <div>
          <p className={styles.text}>
            {currentTransaction.type === TransactionType.Income
              ? t('To account')
              : t('From account')}
          </p>
          <p className={styles.name}>
            {defaultNames.includes(currentTransaction.accountName)
              ? t(currentTransaction.accountName)
              : currentTransaction.accountName}
          </p>
        </div>
        <div className={styles.iconWrapper}>
          <span className='material-icons' style={{ color: currentTransaction.accountColor }}>
            {currentTransaction.accountIcon}
          </span>
        </div>
      </div>
    ),
    [
      currentTransaction.accountColor,
      currentTransaction.accountIcon,
      currentTransaction.accountName,
      currentTransaction.type,
      t,
    ],
  );

  const Category = useMemo(
    () => (
      <div
        className={styles.category}
        style={{ backgroundColor: currentTransaction.categoryColor }}
      >
        <div>
          <p className={styles.text}>
            {currentTransaction.type === TransactionType.Income
              ? t('From category')
              : currentTransaction.type === TransactionType.Transfer
              ? t('To account')
              : t('To category')}
          </p>
          <p className={styles.name}>
            {defaultNames.includes(currentTransaction.categoryName)
              ? t(currentTransaction.categoryName)
              : currentTransaction.categoryName}
          </p>
        </div>
        <div className={styles.iconWrapper} style={{ borderRadius: '50%' }}>
          <span className='material-icons' style={{ color: currentTransaction.categoryColor }}>
            {currentTransaction.categoryIcon}
          </span>
        </div>
      </div>
    ),
    [
      currentTransaction.categoryColor,
      currentTransaction.categoryIcon,
      currentTransaction.categoryName,
      currentTransaction.type,
      t,
    ],
  );

  return (
    <>
      <div className={styles.headerWrapper}>
        <div className={styles.modalHeader}>
          {currentTransaction.type === TransactionType.Income ? Category : Account}
          {currentTransaction.type === TransactionType.Income ? Account : Category}
        </div>
      </div>
      {isError && <p className={styles.error}>{t('Amount must be at most 9 characters')}</p>}
      <Calculator
        type={
          currentTransaction.type === TransactionType.Income
            ? 'Income '
            : currentTransaction.type === TransactionType.Transfer
            ? 'Transfer '
            : 'Expense'
        }
        amount={amount}
        notes={notes}
        day={day}
        changeAmountHandler={changeAmountHandler}
        changeNotesHandler={changeNotesHandler}
        changeDayHandler={changeDayHandler}
        transferMoney={transferMoney}
      />
      <div
        className={styles.btnsWrapper}
        style={{
          backgroundColor:
            userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
        }}
      >
        <SettingsBtn
          icon='content_copy'
          color='#5c6ac2'
          title={t('Duplicate')}
          onClick={() => modalContentHandler('duplicate')}
        />
        <SettingsBtn
          icon='delete'
          color='#f34334'
          title={t('Delete')}
          onClick={() => modalContentHandler('delete')}
        />
      </div>
      <BasicModal openModal={openModal} handleClose={handleClose}>
        {modalContent()}
      </BasicModal>
    </>
  );
});
