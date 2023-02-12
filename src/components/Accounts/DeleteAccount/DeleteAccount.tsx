import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from './DeleteAccount.module.scss';

export const DeleteAccount = () => {
  return (
    <div className={styles.wrapper}>
      <p>Удалить аккаунт безвозвратно?</p>
      <button>Delete</button>
    </div>
  );
};
