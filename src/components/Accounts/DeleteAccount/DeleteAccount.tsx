import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../Auth/Auth';
import { DrawerContext } from '../../../context/Drawer';
import { Theme, ThemeColor } from '../../../enums';
import { deleteUserData } from '../../../firebase/delete-user-data';
import { IAccount } from '../../../interfaces';

import styles from './DeleteAccount.module.scss';

interface DeleteAccountProps {
  currentAccount: IAccount;
  handleClose: () => void;
}

export const DeleteAccount = ({ currentAccount, handleClose }: DeleteAccountProps) => {
  const { userData, changeUserData } = useContext(AuthContext);
  const { drawerHandler } = useContext(DrawerContext);

  const [transactions, setTransactions] = useState(0);

  const { t } = useTranslation();

  useEffect(() => {
    if (userData.data.transactions) {
      const transactionsQuantity = userData.data.transactions.filter(
        (transaction) => transaction.account === currentAccount.name,
      ).length;

      setTransactions(transactionsQuantity);
    }
  }, [currentAccount.name, userData.data.transactions]);

  const deleteUser = useCallback(async () => {
    deleteUserData(userData.settings.userId, { accounts: currentAccount.id });
    changeUserData();
    drawerHandler('info', 'bottom', false);
  }, [changeUserData, currentAccount.id, drawerHandler, userData.settings.userId]);

  return (
    <div
      className={styles.wrapper}
      style={{
        color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
      }}
    >
      <div className={styles.header}>
        <div className={styles.iconWrapper} style={{ backgroundColor: currentAccount.color }}>
          <span className='material-icons' style={{ color: 'white' }}>
            {currentAccount.icon}
          </span>
        </div>
        <p className={styles.headerText}>
          {t('Delete')} {currentAccount.name} ?
        </p>
      </div>
      <div className={styles.description}>
        <p>
          {t('All transactions')} ( <span style={{ fontWeight: 'bold' }}>{transactions}</span> ){' '}
          {t(
            'associated with this account will be deleted. The balances of your other accounts will not change',
          )}
          .
        </p>
        <p>{t('The account cannot be restored')}.</p>
      </div>
      <div className={styles.btnsWrapper}>
        <button className={`${styles.btn} ${styles.cancel}`} onClick={handleClose}>
          {t('Cancel')}
        </button>
        <button className={`${styles.btn} ${styles.delete}`} onClick={deleteUser}>
          {t('Delete')}
        </button>
      </div>
    </div>
  );
};
