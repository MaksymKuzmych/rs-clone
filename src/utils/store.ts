import { Currency, Lang, Period } from '../enums';
import { IStore } from '../interfaces';
import { getPeriod } from './get-period';

export const store: IStore = {
  login: false,
  settings: {
    lang: Lang.EN,
    currency: Currency.USD,
    selectedAccount: null,
    periodType: Period.Month,
    period: getPeriod(Period.Month, Date.now()),
  },
  data: {
    accounts: {
      1: {
        id: 1,
        name: 'Card',
        currency: Currency.USD,
        iconID: 1,
        colorID: 1,
        balance: 0,
        description: '',
      },
      2: {
        id: 2,
        name: 'Cash',
        currency: Currency.USD,
        iconID: 2,
        colorID: 2,
        balance: 0,
        description: '',
      },
    },
    categories: {
      1: {
        id: 1,
        name: 'Groceries',
        iconID: 1,
        colorID: 1,
        description: '',
      },
      2: {
        id: 2,
        name: 'Restaurant',
        iconID: 2,
        colorID: 2,
        description: '',
      },
      3: {
        id: 3,
        name: 'Leisure',
        iconID: 3,
        colorID: 3,
        description: '',
      },
      4: {
        id: 4,
        name: 'Transport',
        iconID: 4,
        colorID: 4,
        description: '',
      },
      5: {
        id: 5,
        name: 'Health',
        iconID: 5,
        colorID: 5,
        description: '',
      },
      6: {
        id: 6,
        name: 'Gifts',
        iconID: 6,
        colorID: 6,
        description: '',
      },
      7: {
        id: 7,
        name: 'Family',
        iconID: 7,
        colorID: 7,
        description: '',
      },
      8: {
        id: 8,
        name: 'Shopping',
        iconID: 8,
        colorID: 8,
        description: '',
      },
    },
    transactions: {},
  },
};
