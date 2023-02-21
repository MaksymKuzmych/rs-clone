import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../../../Auth/Auth';
import { Theme, ThemeColor } from '../../../../enums';
import { updateUserSettings } from '../../../../firebase/update-user-settings';
import { IAccount } from '../../../../interfaces';
import { Account } from '../../../Accounts/Account/Account';

import styles from './FilterAccountsModal.module.scss';

interface FilterAccountsModalProps {
  handleClose(): void;
}

export default function FilterAccountsModal({ handleClose }: FilterAccountsModalProps) {
  const { userData, changeUserData } = useContext(AuthContext);
  const { t } = useTranslation();

  const accountDrawerHandler = useCallback(
    async (account: IAccount) => {
      const newSelectedAccount = account.id === 'allAccounts' ? null : account.id;
      await updateUserSettings(userData.userId, { selectedAccount: newSelectedAccount });
      await changeUserData();
      handleClose();
    },
    [handleClose, changeUserData, userData.userId],
  );

  const allAccountsAmount = userData.data.accounts.reduce(
    (sum, current) => sum + current.balance,
    0,
  );

  const AllAccounts: IAccount = {
    id: 'allAccounts',
    date: Date.now(),
    name: 'All accounts',
    icon: 'credit_card',
    color: '#cd4863',
    balance: allAccountsAmount,
    description: '',
  };

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalTitle}>{t('Accounts filter')}</div>
      <div
        style={{
          color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
        }}
      >
        <Account
          account={AllAccounts}
          key={AllAccounts.id}
          onClick={() => {
            accountDrawerHandler(AllAccounts);
          }}
        />
      </div>
      <div
        className={styles.accountsWrapper}
        style={{
          color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
        }}
      >
        <div className={styles.modalSubtitle}>{t('Accounts')}</div>
        {userData.data.accounts.length !== 0 &&
          userData.data.accounts.map((account) => (
            <Account
              account={account}
              key={account.id}
              onClick={() => {
                accountDrawerHandler(account);
              }}
            />
          ))}
      </div>
    </div>
  );
}
