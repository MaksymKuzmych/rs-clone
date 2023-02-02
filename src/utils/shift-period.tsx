import { Period, Shift } from '../enums';

const shiftPeriod = (date: Date, type: Period, shift: Shift) => {
  switch (type) {
    case Period.Year:
      if (shift === Shift.Increase) {
        return new Date(date.getFullYear() + 1, 0);
      } else {
        return new Date(date.getFullYear() - 1, 0);
      }
    case Period.Month:
      if (shift === Shift.Increase) {
        return new Date(date.getFullYear(), date.getMonth() + 1);
      } else {
        return new Date(date.getFullYear(), date.getMonth() - 1);
      }
    case Period.Week:
      if (shift === Shift.Increase) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
      } else {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
      }
    case Period.Day:
    case Period.Today:
      if (shift === Shift.Increase) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
      } else {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
      }
    default:
      return null;
  }
};

export default shiftPeriod;
