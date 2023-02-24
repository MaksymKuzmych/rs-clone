import { memo, useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';

import { ITransaction, ITransactionAll } from '../../../interfaces';
import { BasicModal } from '../../UI/Modal/Modal';
import { AuthContext } from '../../../Auth/Auth';
import { Theme, ThemeColor, TransactionType } from '../../../enums';
import { SettingsBtn } from './SettingsBtn/SettingsBtn';
import { DeleteTransaction } from '../DeleteTransaction/DeleteTransaction';
import { Calculator } from '../../UI/Calculator/Calculator';
import { updateUserData } from '../../../firebase/update-user-data';
import { DuplicateTransaction } from '../DuplicateTransaction/DuplicateTransaction';

import styles from './Settings.module.scss';

interface SettingsProps {
  currentTransaction: ITransactionAll;
}

export const Settings = memo(({ currentTransaction }: SettingsProps) => {
  const { userData, changeUserData } = useContext(AuthContext);

  const [typeModal, setTypeModal] = useState('');

  const modalContentHandler = (value: string) => {
    setTypeModal(value);
    handleOpen();
  };

  const [openModal, setOpenModal] = useState(false);
  const [amount, setAmount] = useState(
    `${
      currentTransaction.type === TransactionType.Expense
        ? -currentTransaction.amount
        : currentTransaction.amount
    }`,
  );
  const [notes, setNotes] = useState(
    currentTransaction.description ? currentTransaction.description : '',
  );
  const [day, setDay] = useState<Dayjs | null>(dayjs(currentTransaction.date));
  const [isError, setIsError] = useState(false);

  const { t } = useTranslation();

  const handleOpen = useCallback(() => setOpenModal(true), []);
  const handleClose = useCallback(() => setOpenModal(false), []);
  const changeAmountHandler = (value: string) => setAmount(value);
  const changeNotesHandler = (value: string) => setNotes(value);
  const changeDayHandler = (value: Dayjs | null) => setDay(value);

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

  const Account = (
    <div className={styles.account} style={{ backgroundColor: currentTransaction.accountColor }}>
      <p className={styles.description}>
        {currentTransaction.type === TransactionType.Income ? t('To account') : t('From account')}
      </p>
      <p>{currentTransaction.accountName}</p>
      <div className={styles.accountIcon}>
        <span className='material-icons' style={{ color: currentTransaction.accountColor }}>
          {currentTransaction.accountIcon}
        </span>
      </div>
    </div>
  );

  const Category = (
    <div className={styles.category} style={{ backgroundColor: currentTransaction.categoryColor }}>
      <p className={styles.description}>
        {currentTransaction.type === TransactionType.Income
          ? t('From category')
          : currentTransaction.type === TransactionType.Transfer
          ? t('To account')
          : t('To category')}
      </p>
      <p>{currentTransaction.categoryName}</p>
      <div className={styles.categoryIcon}>
        <span className='material-icons' style={{ color: currentTransaction.categoryColor }}>
          {currentTransaction.categoryIcon}
        </span>
      </div>
    </div>
  );

  const transferMoney = async () => {
    if (amount === '') {
      return;
    }

    if (amount.length > 9) {
      setIsError(true);
      return;
    }

    const currentTransactionClone: ITransaction = {
      id: currentTransaction.id,
      date: new Date(dayjs(day).toDate()).getTime(),
      type: currentTransaction.type,
      account: currentTransaction.account,
      accountTo: currentTransaction.accountTo,
      category: currentTransaction.category,
      amount: currentTransaction.type === TransactionType.Expense ? -amount : +amount,
      description: notes,
    };

    setIsError(false);

    await updateUserData(userData.settings.userId, {
      transactions: {
        [currentTransaction.id]: currentTransactionClone,
      },
    });

    await changeUserData();
  };

  return (
    <>
      <div className={styles.headerWrapper}>
        <div className={styles.header}>
          {currentTransaction.type === TransactionType.Income ? Category : Account}
          {currentTransaction.type === TransactionType.Income ? Account : Category}
        </div>
      </div>
      {isError && <p className={styles.error}>{t('Amount must be at most 9 characters')}</p>}
      <Calculator
        type={currentTransaction.type}
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
