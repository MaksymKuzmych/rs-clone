import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Currency } from '../../../enums';

import styles from './AccountHeader.module.scss';

interface AccountHeaderProps {
  currency: Currency;
  amount: number;
}

export const AccountHeader = memo(({ currency, amount }: AccountHeaderProps) => {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <h2 className={styles.title}>{t('Accounts')}</h2>
      <p className={styles.amount}>
        {amount} {currency}
      </p>
    </header>
  );
});
