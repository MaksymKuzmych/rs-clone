import { Period } from '../enums';

export const getPeriod = (type: Period, date: Date | null, dateEnd?: Date | null) => {
  if (date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dayOfWeek = date.getDay();

    switch (type) {
      case Period.All:
        return { start: null, end: null };
      case Period.Year:
        return {
          start: new Date(year, 0),
          end: new Date(year + 1, 0, 1, 0, 0, 0, -1),
        };
      case Period.Month:
        return {
          start: new Date(year, month),
          end: new Date(year, month + 1, 1, 0, 0, 0, -1),
        };
      case Period.Week:
        return {
          start: new Date(year, month, day - dayOfWeek + 1),
          end: new Date(year, month, day - dayOfWeek + 8, 0, 0, 0, -1),
        };
      case Period.Range:
        if (dateEnd) {
          const yearEnd = dateEnd.getFullYear();
          const monthEnd = dateEnd.getMonth();
          const dayEnd = dateEnd.getDate();

          return {
            start: new Date(year, month, day),
            end: new Date(yearEnd, monthEnd, dayEnd + 1, 0, 0, 0, -1),
          };
        } else {
          return { start: null, end: null };
        }
      default:
        return {
          start: new Date(year, month, day),
          end: new Date(year, month, day + 1, 0, 0, 0, -1),
        };
    }
  } else {
    return { start: null, end: null };
  }
};
