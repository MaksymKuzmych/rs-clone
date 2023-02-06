import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import { settings } from '../../../data/settings';
import { accounts } from '../../../data/accounts';

import styles from './AccountsHeader.module.scss';

export const AccountsHeader = () => {
  const { t } = useTranslation();
  const [currency, setCurrency] = useState('');
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const allCardsAmount = accounts.reduce((acc, account) => acc + account.balance, 0);
    setAmount(allCardsAmount);
  }, []);

  useEffect(() => {
    setCurrency(settings.currency);
  }, [currency]);

  return (
    <header className={styles.header}>
      <h2 className={styles.headerTitle}>{t('Accounts')}</h2>
      <p className={styles.accountAmount}>
        {amount} {currency}
      </p>
    </header>
  );
};
