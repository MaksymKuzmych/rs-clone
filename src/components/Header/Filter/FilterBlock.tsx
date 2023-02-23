import { useState, useContext, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../Auth/Auth';
import { BasicModal } from '../../UI/Modal/Modal';
import { FilterAccountsModal } from './FilterAccountsModal/FilterAccountsModal';

import styles from './FilterBlock.module.scss';

interface FilterBlockProps {
  openSearch: boolean;
}

export const FilterBlock = memo(({ openSearch }: FilterBlockProps) => {
  const { userData, setCurrency } = useContext(AuthContext);

  const { t } = useTranslation();

  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const allAccountsAmount = userData.data.accounts.reduce(
    (sum, current) => sum + current.balance,
    0,
  );

  const selectedAccountAmount = userData.data.accounts.find(
    (account) => account.id === userData.settings.selectedAccount,
  )?.balance;

  const selectedAccountName = userData.data.accounts.find(
    (account) => account.id === userData.settings.selectedAccount,
  )?.name;

  return (
    <div className={openSearch ? styles.filterWrapper : styles.filterWrapperVisible}>
      <div className={styles.account} onClick={handleOpen}>
        <div className={styles.accountName}>
          <div className={styles.accoutTitle}>
            {userData.settings.selectedAccount
              ? `${t('Filter')} - ${selectedAccountName}`
              : `${t('All accounts')}`}
          </div>
          <span className={`material-icons ${styles.arrow}`}>arrow_drop_down</span>
        </div>
        <div className={styles.accountAmount}>
          {userData.settings.selectedAccount
            ? setCurrency(selectedAccountAmount ? selectedAccountAmount : 0, 'never')
            : setCurrency(allAccountsAmount, 'never')}
        </div>
      </div>
      <BasicModal openModal={openModal} handleClose={handleClose}>
        <FilterAccountsModal handleClose={handleClose} />
      </BasicModal>
    </div>
  );
});
