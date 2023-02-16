import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import styles from './DeleteButton.module.scss';

export const DeleteButton = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <div>
      <ListItem onClick={handleOpen} className={styles.deleteButton}>
        <ListItemIcon>
          <span className='material-icons'>delete</span>
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
            <Button color='error'>{t('Delete All Data')}</Button>
            <Button color='primary'>{t('Delete All Operations')}</Button>
            <Button onClick={handleClose}>{t('Cancel')}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
