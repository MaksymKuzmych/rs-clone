import { useTranslation } from 'react-i18next';

import styles from './AddAccountInfo.module.scss';

interface AddAccountInfoProps {
  onClick: () => void;
}

export const AddAccountInfo = ({ onClick }: AddAccountInfoProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.addAccount} onClick={onClick}>
      <div className={styles.iconWrapper}>
        <span className='material-icons'>add</span>
      </div>
      <p className={styles.addPlaceholder}>{t('Add account')}</p>
    </div>
  );
};
