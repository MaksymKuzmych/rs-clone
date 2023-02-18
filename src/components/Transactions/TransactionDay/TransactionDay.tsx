import { memo, PropsWithChildren, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../Auth/Auth';
import { Lang, Period, Theme, ThemeColor } from '../../../enums';
import { getPeriod } from '../../../utils/get-period';

import styles from './TransactionDay.module.scss';

interface IDay {
  date: number;
  sum: number;
}

export const TransactionDay = memo(({ children, date, sum }: PropsWithChildren<IDay>) => {
  const { userData } = useContext(AuthContext);
  const { setCurrency } = useContext(AuthContext);

  const { t } = useTranslation();
  const { lang } = userData.settings;
  const locale = lang === Lang.EN ? 'en-US' : 'ru-RU';
  const day = new Date(date).getDate();
  const today = getPeriod(Period.Day, Date.now()).start;
  const year = new Date(date).getFullYear();
  const month = new Date(date)
    .toLocaleDateString(locale, { month: 'long', day: 'numeric' })
    .toUpperCase()
    .split(' ')
    .find((month) => month.length > 2);

  const dayOfWeek = () => {
    const MILISECONDS_IN_DAY = 86400000;

    if (date === today) {
      return t('TODAY');
    }
    if (date + MILISECONDS_IN_DAY === today) {
      return t('YESTERDAY');
    }
    return new Date(date).toLocaleDateString(locale, { weekday: 'long' }).toUpperCase();
  };

  return (
    <div className={styles.dayContainer}>
      <div
        className={today === date ? styles.today : styles.day}
        style={{
          backgroundColor: userData.settings.theme === Theme.Light ? '#e9ecef' : ThemeColor.Dark,
        }}
      >
        <div className={styles.infoWrapper}>
          <p className={styles.date}>{day}</p>
          <div>
            <p className={styles.dayOfWeek}>{dayOfWeek()}</p>
            <p className={styles.month}>
              {' '}
              {month} {year}
            </p>
          </div>
        </div>
        <p className={sum > 0 ? styles.amountPositive : styles.amountNegative}>
          {setCurrency(sum, 'always')}
        </p>
      </div>
      {children}
    </div>
  );
});
