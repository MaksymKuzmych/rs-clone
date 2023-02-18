import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useCallback, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import 'dayjs/locale/ru';
import { Period } from '../../../../enums';
import { updateUserSettings } from '../../../../firebase/update-user-settings';
import { getPeriod } from '../../../../utils/get-period';
import { AuthContext } from '../../../../Auth/Auth';

import styles from '../CalendarModal/CalendarModal.module.scss';

interface CalendarRangeModalProps {
  onClick(): void;
}

export default function CalendarRangeModal({ onClick }: CalendarRangeModalProps) {
  const { userData, changeUserData } = useContext(AuthContext);
  const start =
    userData.settings.periodType === Period.Range && userData.settings.period.start
      ? new Date(userData.settings.period.start)
      : new Date();
  const end =
    userData.settings.periodType === Period.Range && userData.settings.period.end
      ? new Date(userData.settings.period.end)
      : new Date();

  const [valueStart, setValueStart] = useState<Dayjs | null>(dayjs(start));
  const [valueEnd, setValueEnd] = useState<Dayjs | null>(dayjs(end));
  const { t } = useTranslation();

  const setDate = useCallback(
    async (valueStart: Dayjs | null, valueEnd: Dayjs | null) => {
      await updateUserSettings(userData.userId, {
        periodType: Period.Range,
        period: getPeriod(Period.Range, Number(valueStart?.toDate()), Number(valueEnd?.toDate())),
      });
      changeUserData();
      onClick();
    },
    [changeUserData, onClick, userData.userId],
  );

  return (
    <div className={styles.calendarColumn}>
      <div className={styles.title}>{t('Select range')}</div>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={userData.settings.lang}
        sx={{ width: '500px' }}
      >
        <DatePicker
          label={t('From')}
          value={valueStart}
          onChange={(newValue) => {
            setValueStart(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label={t('To')}
          value={valueEnd}
          onChange={(newValue) => {
            setValueEnd(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <div className={styles.buttons}>
        <button
          onClick={() => {
            setDate(valueStart, valueEnd);
          }}
        >
          <span className={`material-icons ${styles.iconButton}`}>check</span>
        </button>
        <button onClick={onClick}>
          <span className={`material-icons ${styles.iconButtonClose}`}>close</span>
        </button>
      </div>
    </div>
  );
}
