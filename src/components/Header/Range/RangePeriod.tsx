import { useCallback, useState, useContext } from 'react';
import { AuthContext } from '../../../Auth/Auth';
import { BasicModal } from '../../UI/Modal/Modal';
import RangeModal from './RangeModal/RangeModal';
import { IPeriodItem } from '../../../interfaces';
import { updateUserSettings } from '../../../firebase/update-user-settings';
import { periodTypes } from '../../../data/periodTypes';
import { useTranslation } from 'react-i18next';
import { Period } from '../../../enums';
import { getPeriod } from '../../../utils/get-period';
import CalendarModal from './CalendarModal/CalendarModal';
import CalendarRangeModal from './CalendarRangeModal/CalendarRangeModal';
import { decreasePeriod, increasePeriod } from '../../../utils/shift-period';

import styles from './RangePeriod.module.scss';

export default function RangePeriod() {
  const { userData, changeUserData } = useContext(AuthContext);
  const { t } = useTranslation();

  const [openModal, setOpenModal] = useState(false);
  const toggleModal = useCallback(() => setOpenModal(!openModal), [openModal]);

  const [openModalCalendar, setOpenModalCalendar] = useState(false);
  const toggleModalCalendar = () => {
    if (openModal) {
      toggleModal();
    }
    setOpenModalCalendar(!openModalCalendar);
  };

  const [openModalRangeCalendar, setOpenModalRangeCalendar] = useState(false);
  const toggleModalRangeCalendar = () => {
    if (openModal) {
      toggleModal();
    }
    setOpenModalRangeCalendar(!openModalRangeCalendar);
  };

  const onClick = useCallback(
    async (range: IPeriodItem) => {
      await updateUserSettings(userData.userId, {
        periodType: range.type,
        period: getPeriod(range.type, Date.now()),
      });
      await changeUserData();
      toggleModal();
    },
    [changeUserData, toggleModal, userData.userId],
  );

  const language: string = userData.settings.lang;

  const getTitleOfSelectedPeriod = useCallback(() => {
    switch (userData.settings.periodType) {
      case Period.All:
        return 'All time';
      case Period.Day:
        return userData.settings.period.start
          ? new Date(userData.settings.period.start).toLocaleString(language, {
              weekday: 'short',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })
          : null;
      case Period.Month:
        return userData.settings.period.start
          ? new Date(userData.settings.period.start).toLocaleString(language, {
              month: 'long',
              year: 'numeric',
            })
          : null;
      case Period.Today:
        return userData.settings.period.start
          ? new Date(userData.settings.period.start).toLocaleString(language, {
              weekday: 'short',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })
          : null;
      case Period.Week:
      case Period.Range:
        const dateStart = userData.settings.period.start
          ? new Date(userData.settings.period.start).getDate()
          : null;
        const monthStart = userData.settings.period.start
          ? new Date(userData.settings.period.start).toLocaleString(language, {
              month: 'long',
              year: 'numeric',
            })
          : null;
        const dateEnd = userData.settings.period.end
          ? new Date(userData.settings.period.end).getDate()
          : null;
        const monthEnd = userData.settings.period.end
          ? new Date(userData.settings.period.end).toLocaleString(language, {
              month: 'long',
              year: 'numeric',
            })
          : null;
        return `${
          monthStart === monthEnd
            ? `${dateStart}-${dateEnd} ${monthEnd}`
            : `${dateStart} ${monthStart} - ${dateEnd} ${monthEnd}`
        }`;
      case Period.Year:
        return userData.settings.period.start
          ? `${new Date(userData.settings.period.start).toLocaleString(language, {
              year: 'numeric',
            })} ${t('year')}`
          : null;
    }
  }, [
    language,
    t,
    userData.settings.period.end,
    userData.settings.period.start,
    userData.settings.periodType,
  ]);

  const setPrevPeriod = async () => {
    const { date, dateEnd } =
      userData.settings.period.start && userData.settings.period.end
        ? decreasePeriod(
            userData.settings.periodType,
            userData.settings.period.start,
            userData.settings.periodType === Period.Range
              ? userData.settings.period.end
              : undefined,
          )
        : { date: Date.now(), dateEnd: undefined };

    await updateUserSettings(userData.userId, {
      period: getPeriod(
        userData.settings.periodType,
        date,
        userData.settings.periodType === Period.Range ? dateEnd : undefined,
      ),
    });
    changeUserData();
  };

  const setNextPeriod = async () => {
    const { date, dateEnd } =
      userData.settings.period.start && userData.settings.period.end
        ? increasePeriod(
            userData.settings.periodType,
            userData.settings.period.start,
            userData.settings.periodType === Period.Range
              ? userData.settings.period.end
              : undefined,
          )
        : { date: Date.now(), dateEnd: undefined };

    await updateUserSettings(userData.userId, {
      period: getPeriod(
        userData.settings.periodType,
        date,
        userData.settings.periodType === Period.Range ? dateEnd : undefined,
      ),
    });
    changeUserData();
  };

  return (
    <div className={styles.rangeWrapper}>
      <div className={styles.rangeArea}>
        <button onClick={setPrevPeriod} className={styles.button}>
          <span className={`material-icons ${styles.arrow}`}>navigate_before</span>
        </button>
        <div className={styles.rangeButton} onClick={toggleModal}>
          <span className='material-icons'>
            {periodTypes.find((item) => item.type === userData.settings.periodType)?.icon}
          </span>
          <div className={styles.selectedPeriod}>{getTitleOfSelectedPeriod()}</div>
        </div>
        <button onClick={setNextPeriod} className={styles.button}>
          <span className={`material-icons ${styles.arrow}`}>navigate_next</span>
        </button>
      </div>
      <BasicModal openModal={openModal} handleClose={toggleModal}>
        <RangeModal
          onClick={onClick}
          selectedPeriod={userData.settings.periodType}
          openCalendar={toggleModalCalendar}
          openCalendarRange={toggleModalRangeCalendar}
        />
      </BasicModal>
      <BasicModal openModal={openModalCalendar} handleClose={toggleModalCalendar}>
        <CalendarModal onClick={toggleModalCalendar} />
      </BasicModal>
      <BasicModal openModal={openModalRangeCalendar} handleClose={toggleModalRangeCalendar}>
        <CalendarRangeModal onClick={toggleModalRangeCalendar} />
      </BasicModal>
    </div>
  );
}
