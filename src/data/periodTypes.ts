import { Period } from '../enums';
import { IPeriodItem } from '../interfaces';

export const periodTypes: IPeriodItem[] = [
  {
    name: 'Select range',
    type: Period.Range,
    icon: 'edit_calendar',
  },
  {
    name: 'All time',
    type: Period.All,
    icon: 'all_inclusive',
  },
  {
    name: 'Select day',
    type: Period.Day,
    icon: 'event',
  },
  {
    name: 'Week',
    type: Period.Week,
    icon: 'date_range',
  },
  {
    name: 'Today',
    type: Period.Today,
    icon: 'looks_one',
  },
  {
    name: 'Year',
    type: Period.Year,
    icon: 'event_available',
  },
  {
    name: 'Month',
    type: Period.Month,
    icon: 'calendar_month',
  },
];
