import { memo, PropsWithChildren, useContext } from 'react';

import { AuthContext } from '../../../Auth/Auth';
import { Period } from '../../../enums';
import { getPeriod } from '../../../utils/get-period';

import styles from './TransactionDay.module.scss';

interface IDay {
  date: number;
  sum: number;
}

export const TransactionDay = memo(({ children, date, sum }: PropsWithChildren<IDay>) => {
  const { setCurrency } = useContext(AuthContext);

  const day = new Date(date).getDate();
  const year = new Date(date).getFullYear();
  const month = new Date(date)
    .toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    .toUpperCase()
    .split(' ')
    .find((month) => month.length > 2);

  const dayOfWeek = () => {
    const MILISECONDS_IN_DAY = 86400000;
    const today = getPeriod(Period.Day, Date.now()).start;

    if (date === today) {
      return 'TODAY';
    }
    if (date + MILISECONDS_IN_DAY === today) {
      return 'YESTERDAY';
    }
    return new Date(date).toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  };
  const today = dayOfWeek() === 'TODAY';

  return (
    <>
      <div className={styles.day} style={{ color: `${today ? '#4da8ef' : '#a8adb3'}` }}>
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
        <p className={styles.amount} style={{ color: `${sum > 0 ? 'green' : 'red'}` }}>
          {setCurrency(sum, 'always')}
        </p>
      </div>
      {children}
    </>
  );
});
