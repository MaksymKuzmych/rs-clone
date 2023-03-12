import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { memo, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../../Auth/Auth';
import { Theme, ThemeColor } from '../../../../enums';

import styles from './DateSelect.module.scss';

interface DateSelectProps {
  day: Dayjs | null;
  changeDayHandler: (value: Dayjs | null) => void;
  handleClose: () => void;
}

export const DateSelect = memo(({ day, changeDayHandler, handleClose }: DateSelectProps) => {
  const { userData } = useContext(AuthContext);

  const MS_IN_DAY = useMemo(() => 86400000, []);

  const { t } = useTranslation();

  return (
    <>
      <div
        className={styles.chooseWrapper}
        style={{
          backgroundColor:
            userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
          color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
        }}
      >
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale={userData.settings.lang.toLocaleLowerCase()}
        >
          <DatePicker
            label={t('Select day')}
            value={day}
            onChange={(newValue) => {
              changeDayHandler(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div
        className={styles.selectWrapper}
        style={{
          backgroundColor:
            userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
          color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
        }}
      >
        <button
          className={styles.selectDay}
          style={{
            color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
          }}
          onClick={() => {
            changeDayHandler(dayjs(Date.now() - MS_IN_DAY));
            handleClose();
          }}
        >
          <span className='material-icons'>nightlight_round</span>
          <p>{t('Yesterday')}</p>
          <p>
            {new Date(Date.now() - MS_IN_DAY).toLocaleDateString(userData.settings.lang, {
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </button>
        <button
          className={styles.selectDay}
          style={{
            color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
          }}
          onClick={() => {
            changeDayHandler(dayjs(Date.now()));
            handleClose();
          }}
        >
          <span className='material-icons'>brightness_5</span>
          <p>{t('Today')}</p>
          <p>
            {new Date(Date.now()).toLocaleDateString(userData.settings.lang, {
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </button>
      </div>
    </>
  );
});
