import { memo, PropsWithChildren, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../Auth/Auth';
import { Theme, ThemeColor } from '../../../enums';
import { dayOfWeek, today } from '../../../utils/day-of-week';

import styles from './TransactionDay.module.scss';

interface TransactionDayProps {
  date: number;
  sum: number;
}

export const TransactionDay = memo(
  ({ children, date, sum }: PropsWithChildren<TransactionDayProps>) => {
    const { userData, setCurrency } = useContext(AuthContext);

    const { t } = useTranslation();

    const { lang } = userData.settings;

    const day = new Date(date).getDate();
    const year = new Date(date).getFullYear();
    const month = new Date(date)
      .toLocaleDateString(lang, { month: 'long', day: 'numeric' })
      .toUpperCase()
      .split(' ')
      .find((month) => month.length > 2);

    return (
      <div className={styles.dayContainer}>
        <div
          className={date === today() ? styles.today : styles.day}
          style={{
            backgroundColor: userData.settings.theme === Theme.Light ? '#e9ecef' : ThemeColor.Dark,
          }}
        >
          <div className={styles.infoWrapper}>
            <p className={styles.date}>{day}</p>
            <div>
              <p className={styles.dayOfWeek}>{dayOfWeek(date, lang, t).toUpperCase()}</p>
              <p className={styles.month}>
                {' '}
                {month} {year}
              </p>
            </div>
          </div>
          <p className={sum >= 0 ? styles.amountPositive : styles.amountNegative}>
            {setCurrency(sum, 'always')}
          </p>
        </div>
        {children}
      </div>
    );
  },
);
