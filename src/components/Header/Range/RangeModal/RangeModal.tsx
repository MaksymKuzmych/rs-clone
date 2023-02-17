import { useCallback, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../../../Auth/Auth';
import { Period } from '../../../../enums';
import { updateUserSettings } from '../../../../firebase/update-user-settings';
import { IAccount, IPeriodItem } from '../../../../interfaces';
import RangeItem from '../RangeItem/RangeItem';

import styles from './RangeModal.module.scss';

interface RangeModalProps {
  handleClose(): void;
}

export default function RangeModal({ handleClose }: RangeModalProps) {
  const { userData, changeUserData } = useContext(AuthContext);
  const { t } = useTranslation();

  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const changeSelectedAccount = async (account: IAccount) => {
    setSelectedAccount(account.id);
    await updateUserSettings(userData.userId, { selectedAccount: selectedAccount });
    await changeUserData();
    handleClose();
  };

  const PeriodData: IPeriodItem[] = [
    {
      name: 'Select range',
      type: Period.Range,
      iconID: 6,
      description: '',
    },
    {
      name: 'All time',
      type: Period.All,
      iconID: 4,
      description: null,
    },
    {
      name: 'Select day',
      type: Period.Day,
      iconID: 1,
      description: null,
    },
    {
      name: 'Week',
      type: Period.Week,
      iconID: 3,
      description: '',
    },
    {
      name: 'Today',
      type: Period.Today,
      iconID: 5,
      description: '',
    },
    {
      name: 'Year',
      type: Period.Year,
      iconID: 7,
      description: '',
    },
    {
      name: 'Month',
      type: Period.Month,
      iconID: 2,
      description: '',
    },
  ];

  return (
    <div className={styles.modalWrapper}>
      {PeriodData.map((item) => (
        <RangeItem
          handleClose={handleClose}
          period={item}
          key={item.iconID}
          selectedPeriod={userData.settings.periodType}
        />
      ))}
    </div>
  );
}
