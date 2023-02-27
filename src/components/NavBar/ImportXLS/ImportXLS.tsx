import { useSnackbar } from 'notistack';
import { ChangeEvent, useCallback, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../../Auth/Auth';
import { deleteAllUserData } from '../../../firebase/delete-all-user-data';
import { parseStatement } from '../../../utils/parse-statement';
import { pushImportedData } from '../../../utils/push-imported-data';
import { Sort, Theme, ThemeColor } from '../../../enums';
import { getFilteredUserData } from '../../../firebase/get-filtered-user-data';
import { ITransaction } from '../../../interfaces';

import styles from '../DeleteButton/DeleteButton.module.scss';

export const ImportXLS = () => {
  const { userData, changeUserSettings } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const findUnusedData = useCallback(async () => {
    const transactions = (await getFilteredUserData(
      userData.settings.userId,
      {
        transactions: { account: null, period: { start: null, end: null } },
      },
      Sort.DESC,
    )) as ITransaction[];

    const usedAccounts = Array.from(
      new Set([
        ...transactions.map((transaction) => transaction.account),
        ...transactions.map((transaction) => transaction.accountTo),
      ]),
    );
    const usedCategories = Array.from(
      new Set(transactions.map((transaction) => transaction.category)),
    );
    const unusedAccounts = userData.data.accounts.filter(
      (account) => !usedAccounts.includes(account.id),
    );
    const unusedCategories = userData.data.categories.filter(
      (category) => !usedCategories.includes(category.id),
    );
    return {
      accounts: unusedAccounts,
      categories: unusedCategories,
    };
  }, [userData.data.accounts, userData.data.categories, userData.settings.userId]);

  const onChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      try {
        await parseStatement(files);
        await deleteAllUserData(userData.settings.userId, await findUnusedData());
        await pushImportedData(userData.settings.userId, await parseStatement(files));
        await changeUserSettings();
        enqueueSnackbar('Import Successfull', { variant: 'success' });
      } catch (error) {
        enqueueSnackbar('Wrong Import Format', { variant: 'error' });
      }
    },
    [changeUserSettings, enqueueSnackbar, findUnusedData, userData.settings.userId],
  );

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
            note_add
          </span>
        </ListItemIcon>
        <ListItemText primary={t('Import data')} className={styles.title} />
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
          <h2 className={styles.modalTitle}>{t('Import data') + ' XLS'}</h2>
          <p className={styles.modalContent}>
            {t('Importing data will create new accounts, categories, and transactions.')}
          </p>
          <p className={styles.modalContent}>
            {t('Attention! All unused accounts and categories will be deleted!')}
          </p>
          <p className={styles.modalContent}>{t('This action cannot be undone')}.</p>
          <p className={styles.modalContent}>
            {t('Import file example') + ' '}
            <Link to='/assets/statements.xls' target='_blank' download>
              <Button color='primary'>{t('PrivatBank')}</Button>
            </Link>
            {' ' + t('and') + ' '}
            <Link to='/assets/monobank.xls' target='_blank' download>
              <Button color='primary'>{t('Monobank')}</Button>
            </Link>
          </p>
          <div className={styles.buttons}>
            <Button color='primary'>
              <label htmlFor='import'>
                <input type='file' id='import' onChange={onChange} style={{ display: 'none' }} />
                {t('Import XLS')}
              </label>
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
