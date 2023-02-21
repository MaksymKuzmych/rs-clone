import { useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import { AuthContext } from '../../../Auth/Auth';
import { defaultUserData } from '../../../firebase/default-user-data';
import { pushUserData } from '../../../firebase/push-user-data';
import { Theme, ThemeColor } from '../../../enums';

import styles from './DeleteButton.module.scss';
import { deleteAllUserTransactions } from '../../../firebase/delete-all-user-transactions';
import { deleteAllUserData } from '../../../firebase/delete-all-user-data';

export const DeleteButton = () => {
  const { userData, changeUserData } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const deleteAllData = useCallback(async () => {
    await deleteAllUserData(userData.settings.userId);

    await pushUserData(userData.settings.userId, {
      accounts: defaultUserData.data.accounts,
      categories: defaultUserData.data.categories,
    });

    await changeUserData();
  }, [changeUserData, userData.settings.userId]);

  const deleteTransactions = useCallback(async () => {
    await deleteAllUserTransactions(userData.settings.userId);

    await changeUserData();
  }, [changeUserData, userData.settings.userId]);

  return (
    <div>
      <ListItem onClick={handleOpen} className={styles.deleteButton}>
        <ListItemIcon>
          <span
            className='material-icons'
            style={{
              color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
            }}
          >
            delete
          </span>
        </ListItemIcon>
        <ListItemText primary={t('Delete data')} className={styles.title} />
      </ListItem>
      <Modal open={open} onClose={handleClose}>
        <div
          className={styles.paper}
          style={{
            color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
            backgroundColor:
              userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
          }}
        >
          <h2 className={styles.modalTitle}>{t('Delete data')}</h2>
          <p className={styles.modalContent}>
            {t(
              'If you want to delete all your data (accounts, categories, transactions), select Delete All Data.',
            )}
          </p>
          <p className={styles.modalContent}>
            {t('If you want to delete only transactions, select Delete All Transactions')}
          </p>
          <div className={styles.buttons}>
            <Button color='error' onClick={deleteAllData}>
              {t('Delete All Data')}
            </Button>
            <Button color='primary' onClick={deleteTransactions}>
              {t('Delete All Transactions')}
            </Button>
            <Button onClick={handleClose} style={{ color: '#7f7f7f' }}>
              {t('Cancel')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
