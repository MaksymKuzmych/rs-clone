import { Period, Position } from '../enums';

const getDate = (date: Date, type: Period, position: Position) => {
  switch (type) {
    case Period.All:
      return null;
    case Period.Year:
      if (position === Position.Start) {
        return new Date(date.getFullYear(), 0);
      } else {
        return new Date(date.getFullYear() + 1, 0, 1, 0, 0, 0, -1);
      }
    case Period.Month:
      if (position === Position.Start) {
        return new Date(date.getFullYear(), date.getMonth());
      } else {
        return new Date(date.getFullYear(), date.getMonth() + 1, 1, 0, 0, 0, -1);
      }
    case Period.Week:
      if (position === Position.Start) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1);
      } else {
        return new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() - date.getDay() + 8,
          0,
          0,
          0,
          -1,
        );
      }
    default:
      if (position === Position.Start) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
      } else {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, 0, -1);
      }
  }
};

export default getDate;
