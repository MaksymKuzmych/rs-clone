import { useCallback, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../../../Auth/Auth';
import { CurrencySymbol } from '../../../../enums';
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

  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const changeSelectedAccount = async (account: IAccount) => {
    setSelectedAccount(account.id);
    await updateUserSettings(userData.userId, { selectedAccount: selectedAccount });
    await changeUserData();
    handleClose();
  };

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
      <Account
        account={AllAccounts}
        currency={CurrencySymbol[userData.settings.currency]}
        key={AllAccounts.id}
        accountDrawerHandler={changeSelectedAccount}
      />
      <div className={styles.accountsWrapper}>
        <div className={styles.modalSubtitle}>{t('Accounts')}</div>
        {userData.data.accounts.length !== 0 &&
          userData.data.accounts.map((account) => (
            <Account
              account={account}
              currency={CurrencySymbol[userData.settings.currency]}
              key={account.id}
              accountDrawerHandler={changeSelectedAccount}
            />
          ))}
      </div>
    </div>
  );
}
