import { memo, useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../Auth/Auth';
import { Theme, ThemeColor, TransactionType } from '../../../enums';
import { incrementBalance } from '../../../firebase/increment-balance';
import { pushUserData } from '../../../firebase/push-user-data';
import { ITransactionAll } from '../../../interfaces';

import styles from './DuplicateTransaction.module.scss';

interface DuplicateTransactionProps {
  currentTransaction: ITransactionAll;
  handleClose: () => void;
}

export const DuplicateTransaction = memo(
  ({ currentTransaction, handleClose }: DuplicateTransactionProps) => {
    const { userData, changeUserData } = useContext(AuthContext);

    const { t } = useTranslation();

    const duplicateTransaction = useCallback(async () => {
      const { id, date, type, account, accountTo, category, amount, description } =
        currentTransaction;

      await pushUserData(userData.settings.userId, {
        transactions: [{ id, date, type, account, accountTo, category, amount, description }],
      });

      if (category) {
        await incrementBalance(userData.settings.userId, account, amount);
      }

      if (accountTo) {
        await incrementBalance(userData.settings.userId, account, +amount);
        await incrementBalance(userData.settings.userId, accountTo, -amount);
      }

      await changeUserData();
      handleClose();
    }, [changeUserData, currentTransaction, handleClose, userData.settings.userId]);

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
  },
);
