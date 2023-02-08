import { Currency, Lang, Period } from '../enums';
import { ISettings } from '../interfaces';
import { getPeriod } from '../utils/get-period';

export const settings: ISettings = {
  lang: Lang.EN,
  currency: Currency.USD,
  selectedAccount: null,
  periodType: Period.Month,
  period: getPeriod(Period.Month, Date.now()),
};
