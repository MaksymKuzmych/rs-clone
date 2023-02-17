import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Anchor } from '../../../types';

import styles from './AddAccount.module.scss';

interface AddAccountProps {
  drawerHandler: (type: string, anchor: Anchor, open: boolean) => void;
}

export const AddAccount = memo(({ drawerHandler }: AddAccountProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.add} onClick={() => drawerHandler('addAccount', 'bottom', true)}>
      <div className={styles.iconWrapper}>
        <span className='material-icons'>add</span>
      </div>
      <p className={styles.placeholder}>{t('Add account')}</p>
    </div>
  );
});
