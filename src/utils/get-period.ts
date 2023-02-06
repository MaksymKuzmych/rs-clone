import { Period } from '../enums';

export const getPeriod = (type: Period, date: number | null, dateEnd?: number | null) => {
  if (date) {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const day = new Date(date).getDate();
    const dayOfWeek = new Date(date).getDay();

    switch (type) {
      case Period.All:
        return { start: null, end: null };
      case Period.Year:
        return {
          start: new Date(year, 0).getTime(),
          end: new Date(year + 1, 0, 1, 0, 0, 0, -1).getTime(),
        };
      case Period.Month:
        return {
          start: new Date(year, month).getTime(),
          end: new Date(year, month + 1, 1, 0, 0, 0, -1).getTime(),
        };
      case Period.Week:
        return {
          start: new Date(year, month, day - dayOfWeek + 1).getTime(),
          end: new Date(year, month, day - dayOfWeek + 8, 0, 0, 0, -1).getTime(),
        };
      case Period.Range:
        if (dateEnd) {
          const yearEnd = new Date(dateEnd).getFullYear();
          const monthEnd = new Date(dateEnd).getMonth();
          const dayEnd = new Date(dateEnd).getDate();

          return {
            start: new Date(year, month, day).getTime(),
            end: new Date(yearEnd, monthEnd, dayEnd + 1, 0, 0, 0, -1).getTime(),
          };
        } else {
          return { start: null, end: null };
        }
      default:
        return {
          start: new Date(year, month, day).getTime(),
          end: new Date(year, month, day + 1, 0, 0, 0, -1).getTime(),
        };
    }
  } else {
    return { start: null, end: null };
  }
};
