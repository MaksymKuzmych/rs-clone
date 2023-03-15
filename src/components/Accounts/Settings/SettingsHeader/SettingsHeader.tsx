import { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../../Auth/Auth';
import { defaultNames } from '../../../../data/defaultNames';
import { IAccount } from '../../../../interfaces';

import styles from './SettingsHeader.module.scss';

interface SettingsHeaderProps {
  currentAccount: IAccount;
}

export const SettingsHeader = memo(({ currentAccount }: SettingsHeaderProps) => {
  const { name, icon, color, description, balance } = currentAccount;

  const { setCurrency } = useContext(AuthContext);

  const { t } = useTranslation();

  return (
    <header className={styles.header} style={{ backgroundColor: `${color}` }}>
      <div className={styles.info}>
        <span className='material-icons'>{icon}</span>
        <div className={styles.text}>
          <p className={styles.name}>{defaultNames.includes(name) ? t(name) : name}</p>
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </div>
      <div className={styles.balanceWrapper}>
        <p>{t('Account balance')}</p>
        <p className={styles.balance}>{setCurrency(balance, 'never')}</p>
      </div>
    </header>
  );
});
