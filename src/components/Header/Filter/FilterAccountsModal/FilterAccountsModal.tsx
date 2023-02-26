import { memo, useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../../Auth/Auth';
import { Theme, ThemeColor } from '../../../../enums';
import { updateUserSettings } from '../../../../firebase/update-user-settings';
import { IAccount } from '../../../../interfaces';
import { Account } from '../../../Accounts/Account/Account';

import styles from './FilterAccountsModal.module.scss';

interface FilterAccountsModalProps {
  handleClose: () => void;
}

export const FilterAccountsModal = memo(({ handleClose }: FilterAccountsModalProps) => {
  const { userData, changeUserSettings, changeUserData } = useContext(AuthContext);

  const { t } = useTranslation();

  const accountDrawerHandler = useCallback(
    async (account: IAccount) => {
      const newSelectedAccount = account.id === 'allAccounts' ? null : account.id;
      await updateUserSettings(userData.settings.userId, { selectedAccount: newSelectedAccount });
      await changeUserData();
      await changeUserSettings();
      handleClose();
    },
    [userData.settings.userId, changeUserData, changeUserSettings, handleClose],
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

  const selectedAccount = userData.settings.selectedAccount;

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
          active={selectedAccount === null ? true : false}
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
              active={selectedAccount === account.id ? true : false}
            />
          ))}
      </div>
    </div>
  );
});
