import { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../Auth/Auth';
import { AmountColor } from '../../../enums';

import styles from './AccountHeader.module.scss';

interface AccountHeaderProps {
  amount: number;
}

export const AccountHeader = memo(({ amount }: AccountHeaderProps) => {
  const { setCurrency } = useContext(AuthContext);

  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <h2 className={styles.title}>{t('Accounts')}</h2>
      <p
        className={styles.amount}
        style={{
          color: !amount
            ? AmountColor.Zero
            : amount > 0
            ? AmountColor.Income
            : AmountColor.Expenses,
        }}
      >
        {setCurrency(amount)}
      </p>
    </header>
  );
});
