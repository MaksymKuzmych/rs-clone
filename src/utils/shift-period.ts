import { Period } from '../enums';

export const increasePeriod = (type: Period, date: Date, dateEnd?: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  switch (type) {
    case Period.Year:
      return { date: new Date(year + 1, 0), dateEnd: null };
    case Period.Month:
      return { date: new Date(year, month + 1), dateEnd: null };
    case Period.Week:
      return { date: new Date(year, month, day + 7), dateEnd: null };
    case Period.Day:
    case Period.Today:
      return { date: new Date(year, month, day + 1), dateEnd: null };
    case Period.Range:
      if (dateEnd) {
        const yearEnd = dateEnd.getFullYear();
        const monthEnd = dateEnd.getMonth();
        const dayEnd = dateEnd.getDate();
        const newDateEnd = new Date(yearEnd, monthEnd, dayEnd + 1, 0, 0, 0, -1);

        return {
          date: new Date(yearEnd, monthEnd, dayEnd + 1),
          dateEnd: new Date(newDateEnd.getTime() + newDateEnd.getTime() - date.getTime()),
        };
      } else {
        return { date: null, dateEnd: null };
      }
    default:
      return { date: null, dateEnd: null };
  }
};

export const decreasePeriod = (type: Period, date: Date, dateEnd?: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  switch (type) {
    case Period.Year:
      return { date: new Date(year - 1, 0), dateEnd: null };
    case Period.Month:
      return { date: new Date(year, month - 1), dateEnd: null };
    case Period.Week:
      return { date: new Date(year, month, day - 7), dateEnd: null };
    case Period.Day:
    case Period.Today:
      return { date: new Date(year, month, day - 1), dateEnd: null };
    case Period.Range:
      if (dateEnd) {
        const yearEnd = dateEnd.getFullYear();
        const monthEnd = dateEnd.getMonth();
        const dayEnd = dateEnd.getDate();
        const newDateEnd = new Date(yearEnd, monthEnd, dayEnd + 1, 0, 0, 0, -1);

        return {
          date: new Date(date.getTime() - newDateEnd.getTime() + date.getTime()),
          dateEnd: new Date(year, month, day, 0, 0, 0, -1),
        };
      } else {
        return { date: null, dateEnd: null };
      }
    default:
      return { date: null, dateEnd: null };
  }
};
