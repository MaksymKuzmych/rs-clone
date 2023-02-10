import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Currency } from '../../../enums';

import styles from './Header.module.scss';

interface HeaderProps {
  currency: Currency;
  amount: number;
}

export const Header = memo(({ currency, amount }: HeaderProps) => {
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
