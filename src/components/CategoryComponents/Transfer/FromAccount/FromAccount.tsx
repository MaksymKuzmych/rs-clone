import { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../../Auth/Auth';
import { Theme, ThemeColor } from '../../../../enums';
import { IAccount } from '../../../../interfaces';
import { Account } from '../../../Accounts/Account/Account';

import styles from './FromAccount.module.scss';

interface FromAccountProps {
  changeAccount: (account: IAccount) => void;
  activeAccount: string;
}

export const FromAccount = memo(({ changeAccount, activeAccount }: FromAccountProps) => {
  const { userData, setCurrency } = useContext(AuthContext);

  const { t } = useTranslation();

  const allAccountsAmount = userData.data.accounts.reduce(
    (sum, current) => sum + current.balance,
    0,
  );

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalTitle}>{t('From account')}</div>
      <div className={styles.amountBlock}>
        <div className={styles.modalSubtitle}>{t('Accounts')}</div>
        <div className={styles.modalSubtitle}>{setCurrency(allAccountsAmount, 'auto')}</div>
      </div>
      <div
        className={styles.wrapper}
        style={{
          color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
        }}
      >
        {userData.data.accounts.length !== 0 &&
          userData.data.accounts.map((account) => (
            <Account
              account={account}
              key={account.id}
              onClick={() => {
                changeAccount(account);
              }}
              active={activeAccount === account.id ? true : false}
            />
          ))}
      </div>
    </div>
  );
});
