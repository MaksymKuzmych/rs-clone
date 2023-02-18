import { useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import { AuthContext } from '../../../Auth/Auth';
import { deleteUserData } from '../../../firebase/delete-user-data';
import { defaultUserData } from '../../../firebase/default-user-data';
import { pushUserData } from '../../../firebase/push-user-data';
import { ThemeColor } from '../../../enums';

import styles from './DeleteButton.module.scss';

export const DeleteButton = () => {
  const { userData, changeUserData } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const deleteAllData = useCallback(async () => {
    userData.data.accounts.forEach(async (account) => {
      await deleteUserData(userData.userId, { accounts: account.id });
    });
    userData.data.categories.forEach(async (category) => {
      await deleteUserData(userData.userId, { categories: category.id });
    });
    userData.data.transactions.forEach(async (transaction) => {
      await deleteUserData(userData.userId, { transactions: transaction.id });
    });

    await pushUserData(userData.userId, {
      accounts: [...defaultUserData.data.accounts],
      categories: [...defaultUserData.data.categories],
    });

    changeUserData();
  }, [
    changeUserData,
    userData.data.accounts,
    userData.data.categories,
    userData.data.transactions,
    userData.userId,
  ]);

  const deleteTransactions = useCallback(async () => {
    userData.data.transactions.forEach(async (transaction) => {
      await deleteUserData(userData.userId, { transactions: transaction.id });
    });

    changeUserData();
  }, [changeUserData, userData.data.transactions, userData.userId]);

  return (
    <div>
      <ListItem onClick={handleOpen} className={styles.deleteButton}>
        <ListItemIcon>
          <span
            className='material-icons'
            style={{
              color: userData.settings.theme === 'Light' ? ThemeColor.Dark : ThemeColor.Light,
            }}
          >
            delete
          </span>
        </ListItemIcon>
        <ListItemText primary={t('Delete data')} className={styles.title} />
      </ListItem>
      <Modal open={open} onClose={handleClose}>
        <div className={styles.paper}>
          <h2 className={styles.modalTitle}>{t('Delete data')}</h2>
          <p className={styles.modalContent}>
            {t(
              'If you want to delete all your data (accounts, categories, transactions), select Delete All Data.',
            )}
          </p>
          <p className={styles.modalContent}>
            {t('If you want to delete only operations, select Delete All Operations')}
          </p>
          <div className={styles.buttons}>
            <Button color='error' onClick={deleteAllData}>
              {t('Delete All Data')}
            </Button>
            <Button color='primary' onClick={deleteTransactions}>
              {t('Delete All Operations')}
            </Button>
            <Button onClick={handleClose}>{t('Cancel')}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
