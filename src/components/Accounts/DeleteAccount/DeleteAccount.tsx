import { useTranslation } from 'react-i18next';

import { Anchor } from '../../../types';

import styles from './DeleteAccount.module.scss';

interface DeleteAccountProps {
  handleClose: () => void;
  deleteUser: () => void;
  drawerHandler: (type: string, anchor: Anchor, open: boolean) => void;
}

export const DeleteAccount = ({ handleClose, deleteUser, drawerHandler }: DeleteAccountProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <p>{t('Delete account permanently')}</p>
      <button
        className={styles.btn}
        onClick={async () => {
          await deleteUser();
          handleClose();
          drawerHandler('info', 'bottom', false);
        }}
      >
        <span className='material-icons'>delete</span>
        Delete
      </button>
    </div>
  );
};
