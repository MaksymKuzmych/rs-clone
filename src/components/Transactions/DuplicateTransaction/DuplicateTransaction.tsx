import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../Auth/Auth';
import { Theme, ThemeColor, TransactionType } from '../../../enums';
import { incrementBalance } from '../../../firebase/increment-balance';
import { pushUserData } from '../../../firebase/push-user-data';
import { ITransaction, ITransactionAll } from '../../../interfaces';
import { findOppositeTransfer } from '../../../utils/find-opposite-transfer';

import styles from './DuplicateTransaction.module.scss';

interface DuplicateTransactionProps {
  currentTransaction: ITransactionAll;
  handleClose: () => void;
}

export const DuplicateTransaction = ({
  currentTransaction,
  handleClose,
}: DuplicateTransactionProps) => {
  const { userData, changeUserData } = useContext(AuthContext);

  const { t } = useTranslation();

  const duplicateTransaction = useCallback(async () => {
    currentTransaction.date += 1;
    if (currentTransaction.accountTo) {
      await pushUserData(userData.settings.userId, {
        transactions: [
          currentTransaction,
          findOppositeTransfer(userData.data.transactions, currentTransaction) as ITransaction,
        ],
      });

      await incrementBalance(
        userData.settings.userId,
        currentTransaction.account,
        -currentTransaction.amount,
      );

      await incrementBalance(
        userData.settings.userId,
        currentTransaction.accountTo,
        currentTransaction.amount,
      );
    } else {
      await pushUserData(userData.settings.userId, {
        transactions: [currentTransaction],
      });

      await incrementBalance(
        userData.settings.userId,
        currentTransaction.account,
        currentTransaction.amount,
      );
    }
    await changeUserData();
  }, [changeUserData, currentTransaction, userData.data.transactions, userData.settings.userId]);

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
          {t('Duplicate')}{' '}
          {currentTransaction.type === TransactionType.Transfer
            ? `${t('Transfer ')}?`
            : `${t('Transaction')} ?`}
        </p>
      </div>
      <div className={styles.description}>
        <p>{t('Transaction will be duplicated with the same parameters')}.</p>
      </div>
      <div className={styles.btnsWrapper}>
        <button className={`${styles.btn} ${styles.cancel}`} onClick={handleClose}>
          {t('Cancel')}
        </button>
        <button className={`${styles.btn} ${styles.duplicate}`} onClick={duplicateTransaction}>
          {t('Duplicate')}
        </button>
      </div>
    </div>
  );
};
