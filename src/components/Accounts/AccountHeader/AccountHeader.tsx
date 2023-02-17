import { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../Auth/Auth';

import styles from './AccountHeader.module.scss';

interface AccountHeaderProps {
  amount: number;
}

export const AccountHeader = memo(({ amount }: AccountHeaderProps) => {
  const { t } = useTranslation();

  const { setCurrency } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <h2 className={styles.title}>{t('Accounts')}</h2>
      <p
        className={styles.amount}
        style={{ color: !amount ? '#a8adb3' : amount > 0 ? '#18ab81' : '#cd4863' }}
      >
        {setCurrency(amount)}
      </p>
    </header>
  );
});
