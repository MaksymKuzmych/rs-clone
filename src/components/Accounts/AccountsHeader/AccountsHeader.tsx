import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './AccountsHeader.module.scss';

interface AccountsHeaderProps {
  currency: string;
  amount: number;
}

export const AccountsHeader = memo(({ currency, amount }: AccountsHeaderProps) => {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <h2 className={styles.headerTitle}>{t('Accounts')}</h2>
      <p className={styles.accountAmount}>
        {amount} {currency}
      </p>
    </header>
  );
});
