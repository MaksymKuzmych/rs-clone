import { memo, PropsWithChildren, useContext } from 'react';
import { AuthContext } from '../../../Auth/Auth';
import { Period } from '../../../enums';
import { getPeriod } from '../../../utils/get-period';

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

  return (
    <div>
      <h1>
        {day} {dayOfWeek()} {month} {year} {setCurrency(sum, 'always')}
      </h1>
      {children}
    </div>
  );
});
