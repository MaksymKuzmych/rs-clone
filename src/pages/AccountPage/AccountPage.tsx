import { ErrorMessage } from '../../components/UI/ErrorMessage/ErrorMessage';
import { AccountsHeader } from '../../components/AccountsHeader/AccountsHeader';
import { Loader } from '../../components/UI/Loader/Loader';
import { useAccounts } from '../../hooks/accounts';
import { AccountBtn } from '../../components/AccountBtn/AccountBtn';

import styles from './AccountPage.module.scss';
import { AddAccountBtn } from '../../components/AddAccountBtn/AddAccountBtn';

export const AccountPage = () => {
  const { accounts, loading, error } = useAccounts();

  return (
    <div className={styles.accountPage}>
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      <AccountsHeader />
      {accounts.length &&
        accounts.map((account) => <AccountBtn account={account} key={account.id} />)}
      <AddAccountBtn />
    </div>
  );
};
