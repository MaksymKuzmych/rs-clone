import { useTranslation } from 'react-i18next';

import styles from './AddAccountInfo.module.scss';

export const AddAccountInfo = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.addAccount}>
      <div className={styles.iconWrapper}>
        <span className='material-icons'>add</span>
      </div>
      <p className={styles.addPlaceholder}>{t('Add account')}</p>
    </div>
  );
};
