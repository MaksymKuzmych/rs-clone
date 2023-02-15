import { useState } from 'react';
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <p className={styles.modalContent}>{t('Message content 1')}</p>
          <p className={styles.modalContent}>{t('Message content 2')}</p>
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
