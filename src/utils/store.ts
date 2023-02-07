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
      defaultAccount1: {
        id: 'defaultAccount1',
        name: 'Card',
        currency: Currency.USD,
        iconID: 1,
        colorID: 1,
        balance: 0,
        description: '',
      },
      defaultAccount2: {
        id: 'defaultAccount2',
        name: 'Cash',
        currency: Currency.USD,
        iconID: 2,
        colorID: 2,
        balance: 0,
        description: '',
      },
    },
    categories: {
      defaultCategory1: {
        id: 'defaultCategory1',
        name: 'Groceries',
        iconID: 1,
        colorID: 1,
        description: '',
      },
      defaultCategory2: {
        id: 'defaultCategory2',
        name: 'Restaurant',
        iconID: 2,
        colorID: 2,
        description: '',
      },
      defaultCategory3: {
        id: 'defaultCategory3',
        name: 'Leisure',
        iconID: 3,
        colorID: 3,
        description: '',
      },
      defaultCategory4: {
        id: 'defaultCategory4',
        name: 'Transport',
        iconID: 4,
        colorID: 4,
        description: '',
      },
      defaultCategory5: {
        id: 'defaultCategory5',
        name: 'Health',
        iconID: 5,
        colorID: 5,
        description: '',
      },
      defaultCategory6: {
        id: 'defaultCategory6',
        name: 'Gifts',
        iconID: 6,
        colorID: 6,
        description: '',
      },
      defaultCategory7: {
        id: 'defaultCategory7',
        name: 'Family',
        iconID: 7,
        colorID: 7,
        description: '',
      },
      defaultCategory8: {
        id: 'defaultCategory8',
        name: 'Shopping',
        iconID: 8,
        colorID: 8,
        description: '',
      },
    },
    transactions: {},
  },
};
