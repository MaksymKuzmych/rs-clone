import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../Auth/Auth';
import { DrawerContext } from '../../../context/Drawer';
import { Theme, ThemeColor, TransactionType } from '../../../enums';
import { deleteUserData } from '../../../firebase/delete-user-data';
import { incrementBalance } from '../../../firebase/increment-balance';
import { ITransactionAll } from '../../../interfaces';
import { findOppositeTransfer } from '../../../utils/find-opposite-transfer';

import styles from './DeleteTransaction.module.scss';

interface DeleteAccountProps {
  currentTransaction: ITransactionAll;
  handleClose: () => void;
}

export const DeleteTransaction = ({ currentTransaction, handleClose }: DeleteAccountProps) => {
  const { userData, changeUserData } = useContext(AuthContext);
  const { drawerHandler } = useContext(DrawerContext);

  const { t } = useTranslation();

  const deleteTransaction = useCallback(async () => {
    await deleteUserData(userData.settings.userId, { transactions: currentTransaction.id });
    await incrementBalance(
      userData.settings.userId,
      currentTransaction.account,
      -currentTransaction.amount,
    );
    if (currentTransaction.accountTo) {
      await deleteUserData(userData.settings.userId, {
        transactions: findOppositeTransfer(userData.data.transactions, currentTransaction),
      });
      await incrementBalance(
        userData.settings.userId,
        currentTransaction.accountTo,
        currentTransaction.amount,
      );
    }
    await changeUserData();
    drawerHandler('info', 'bottom', false);
  }, [
    changeUserData,
    currentTransaction,
    drawerHandler,
    userData.data.transactions,
    userData.settings.userId,
  ]);

  return (
    <div
      className={styles.wrapper}
      style={{
        color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
      }}
    >
      <div className={styles.header}>
        <div
          className={
            currentTransaction.type === TransactionType.Transfer
              ? styles.accountIconWrapper
              : styles.iconWrapper
          }
          style={{ backgroundColor: currentTransaction.categoryColor }}
        >
          <span className='material-icons' style={{ color: 'white' }}>
            {currentTransaction.categoryIcon}
          </span>
        </div>
        <p className={styles.headerText}>
          {t('Delete')}{' '}
          {currentTransaction.type === TransactionType.Transfer
            ? `${t('Transfer ')}?`
            : `${t('Transaction')} ?`}
        </p>
      </div>
      <div className={styles.description}>
        <p>{t('Transaction will be deleted')}.</p>
        <p>
          {currentTransaction.type === TransactionType.Transfer
            ? `${t('Transaction associated with this transfer will be deleted too')}.`
            : ''}
        </p>
        <p>{t('This action cannot be undone')}.</p>
      </div>
      <div className={styles.btnsWrapper}>
        <button className={`${styles.btn} ${styles.cancel}`} onClick={handleClose}>
          {t('Cancel')}
        </button>
        <button className={`${styles.btn} ${styles.delete}`} onClick={deleteTransaction}>
          {t('Delete')}
        </button>
      </div>
    </div>
  );
};
