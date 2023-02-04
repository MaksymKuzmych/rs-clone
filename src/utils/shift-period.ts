import { Period } from '../enums';

export const increasePeriod = (type: Period, date: number, dateEnd?: number) => {
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth();
  const day = new Date(date).getDate();

  switch (type) {
    case Period.Year:
      return { date: new Date(year + 1, 0).getTime(), dateEnd: null };
    case Period.Month:
      return { date: new Date(year, month + 1).getTime(), dateEnd: null };
    case Period.Week:
      return { date: new Date(year, month, day + 7).getTime(), dateEnd: null };
    case Period.Day:
    case Period.Today:
      return { date: new Date(year, month, day + 1).getTime(), dateEnd: null };
    case Period.Range:
      if (dateEnd) {
        const yearEnd = new Date(dateEnd).getFullYear();
        const monthEnd = new Date(dateEnd).getMonth();
        const dayEnd = new Date(dateEnd).getDate();
        const newDateEnd = new Date(yearEnd, monthEnd, dayEnd + 1, 0, 0, 0, -1).getTime();

        return {
          date: new Date(yearEnd, monthEnd, dayEnd + 1).getTime(),
          dateEnd: newDateEnd + newDateEnd - date,
        };
      } else {
        return { date: null, dateEnd: null };
      }
    default:
      return { date: null, dateEnd: null };
  }
};

export const decreasePeriod = (type: Period, date: number, dateEnd?: number) => {
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth();
  const day = new Date(date).getDate();

  switch (type) {
    case Period.Year:
      return { date: new Date(year - 1, 0).getTime(), dateEnd: null };
    case Period.Month:
      return { date: new Date(year, month - 1).getTime(), dateEnd: null };
    case Period.Week:
      return { date: new Date(year, month, day - 7).getTime(), dateEnd: null };
    case Period.Day:
    case Period.Today:
      return { date: new Date(year, month, day - 1).getTime(), dateEnd: null };
    case Period.Range:
      if (dateEnd) {
        const yearEnd = new Date(dateEnd).getFullYear();
        const monthEnd = new Date(dateEnd).getMonth();
        const dayEnd = new Date(dateEnd).getDate();
        const newDateEnd = new Date(yearEnd, monthEnd, dayEnd + 1, 0, 0, 0, -1).getTime();

        return {
          date: date + date - newDateEnd,
          dateEnd: new Date(year, month, day, 0, 0, 0, -1).getTime(),
        };
      } else {
        return { date: null, dateEnd: null };
      }
    default:
      return { date: null, dateEnd: null };
  }
};
