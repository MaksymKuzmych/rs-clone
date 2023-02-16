import { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../../Auth/Auth';
import { IAccount } from '../../../../interfaces';

import styles from './SettingsHeader.module.scss';

interface SettingsHeaderProps {
  currentAccount: IAccount;
}

export const SettingsHeader = memo(({ currentAccount }: SettingsHeaderProps) => {
  const { t } = useTranslation();

  const { name, icon, color, description, balance } = currentAccount;

  const { setCurrency } = useContext(AuthContext);

  return (
    <header className={styles.header} style={{ backgroundColor: `${color}` }}>
      <div className={styles.info}>
        <span className='material-icons'>{icon}</span>
        <div className={styles.text}>
          <p className={styles.name}>{name}</p>
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </div>
      <div className={styles.balanceWrapper}>
        <p>{t('Account balance')}</p>
        <p className={styles.balance}>{setCurrency(balance)}</p>
      </div>
    </header>
  );
});
