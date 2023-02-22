import { TFunction } from 'i18next';
import { Lang, Period } from '../enums';
import { getPeriod } from './get-period';

export const MILISECONDS_IN_DAY = 86400000;

export const today = () => {
  const day = getPeriod(Period.Day, Date.now()).start;
  if (day) {
    return day;
  } else {
    return 0;
  }
};

export const yesterday = () => {
  const day = getPeriod(Period.Day, Date.now()).start;
  if (day) {
    return day - MILISECONDS_IN_DAY;
  } else {
    return 0;
  }
};

export const dayOfWeek = (
  date: number,
  lang: Lang,
  translate: TFunction<'translation', undefined, 'translation'>,
) => {
  const day = getPeriod(Period.Day, date).start;
  if (day === today()) {
    return translate('TODAY');
  }
  if (day === yesterday()) {
    return translate('YESTERDAY');
  }
  return new Date(date).toLocaleDateString(lang, { weekday: 'long' }).toUpperCase();
};
