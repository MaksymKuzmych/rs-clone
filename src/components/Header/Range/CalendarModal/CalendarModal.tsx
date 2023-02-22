import { useCallback, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';
import { Period } from '../../../../enums';
import { updateUserSettings } from '../../../../firebase/update-user-settings';
import { getPeriod } from '../../../../utils/get-period';
import { AuthContext } from '../../../../Auth/Auth';

import styles from './CalendarModal.module.scss';

interface CalendarModalProps {
  onClick(): void;
}

export const CalendarModal = ({ onClick }: CalendarModalProps) => {
  const { userData, changeUserData } = useContext(AuthContext);
  const start =
    userData.settings.periodType === Period.Day && userData.settings.period.start
      ? new Date(userData.settings.period.start)
      : new Date();
  const [value, setValue] = useState<Dayjs | null>(dayjs(start));
  const { t } = useTranslation();

  const setDate = useCallback(
    async (value: Dayjs | null) => {
      await updateUserSettings(userData.settings.userId, {
        periodType: Period.Day,
        period: getPeriod(Period.Day, Number(value?.toDate())),
      });
      changeUserData();
      onClick();
    },
    [changeUserData, onClick, userData.settings.userId],
  );

  return (
    <div className={styles.calendar}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={userData.settings.lang.toLocaleLowerCase()}
      >
        <DatePicker
          label={t('Select day')}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <button
        onClick={() => {
          setDate(value);
        }}
      >
        <span className={`material-icons ${styles.iconButton}`}>check</span>
      </button>
    </div>
  );
};
