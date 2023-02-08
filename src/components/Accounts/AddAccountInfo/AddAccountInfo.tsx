import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Anchor } from '../../../types';

import styles from './AddAccountInfo.module.scss';

interface AddAccountInfoProps {
  drawerHandler: (type: string, anchor: Anchor) => void;
}

export const AddAccountInfo = memo(({ drawerHandler }: AddAccountInfoProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.addAccount} onClick={() => drawerHandler('addAccount', 'bottom')}>
      <div className={styles.iconWrapper}>
        <span className='material-icons'>add</span>
      </div>
      <p className={styles.addPlaceholder}>{t('Add account')}</p>
    </div>
  );
});
