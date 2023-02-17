import { useCallback, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../../Auth/Auth';
import { BasicModal } from '../../UI/Modal/Modal';

import styles from './RangePeriod.module.scss';
import RangeModal from './RangeModal/RangeModal';

export default function RangePeriod() {
  const { userData } = useContext(AuthContext);

  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  return (
    <div className={styles.rangeWrapper}>
      <div className={styles.rangeArea}>
        <span className={`material-icons ${styles.arrow}`}>navigate_before</span>
        <div className={styles.rangeButton} onClick={handleOpen}>
          <span className='material-icons'>calendar_month</span>
          <div className={styles.selectedPeriod}>{userData.settings.periodType}</div>
        </div>
        <span className={`material-icons ${styles.arrow}`}>navigate_next</span>
      </div>
      <BasicModal openModal={openModal} handleClose={handleClose}>
        <RangeModal handleClose={handleClose} />
      </BasicModal>
    </div>
  );
}
