import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

//import { makeStyles } from '@material-ui/core/styles';

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

  const body = (
    <div className={styles.paper}>
      <h2 id='simple-modal-title' className={styles.modalTitle}>
        {t('Delete data')}
      </h2>
      <p id='simple-modal-description' className={styles.modalContent}>
        {t('Message content 1')}
      </p>
      <p id='simple-modal-description'>{t('Message content 2')}</p>
      <div className={styles.buttons}>
        <Button color='error'>{t('Delete All Data')}</Button>
        <Button color='primary'>{t('Delete All Operations')}</Button>
        <Button onClick={handleClose}>{t('Cancel')}</Button>
      </div>
    </div>
  );

  return (
    <div>
      <ListItem onClick={handleOpen} className={styles.deleteButton}>
        <ListItemIcon>
          <span className='material-icons'>delete</span>
        </ListItemIcon>
        <ListItemText primary={t('Delete data')} className={styles.title} />
      </ListItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
    </div>
  );
};
