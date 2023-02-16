import { useCallback, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../../Auth/Auth';
import { BasicModal } from '../../UI/Modal/Modal';
import FilterAccountsModal from './FilterAccountsModal/FilterAccountsModal';

import styles from './FilterBlock.module.scss';

export default function FilterBlock() {
  const { userData } = useContext(AuthContext);

  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  console.log(userData.settings.selectedAccount);

  return (
    <div className={styles.filterWrapper}>
      <div className={styles.account} onClick={handleOpen}>
        <div className={styles.accoutTitle}>
          {userData.settings.selectedAccount
            ? `${t('Filter')} - ${userData.settings.selectedAccount}`
            : t('All accounts')}
        </div>
        <span className='material-icons'>arrow_drop_down</span>
      </div>
      <BasicModal openModal={openModal} handleClose={handleClose}>
        <FilterAccountsModal handleClose={handleClose} />
      </BasicModal>
    </div>
  );
}
