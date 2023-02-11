import { Currency, Lang, Period } from '../enums';
import { IStore } from '../interfaces';
import { getPeriod } from '../utils/get-period';

export const userData: IStore = {
  userId: '',
  settings: {
    lang: Lang.EN,
    currency: Currency.USD,
    selectedAccount: null,
    periodType: Period.Month,
    period: getPeriod(Period.Month, Date.now()),
  },
  data: {
    accounts: [],
    categories: [],
    transactions: [],
  },
};
