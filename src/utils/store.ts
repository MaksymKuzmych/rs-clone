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
    accounts: [
      {
        id: 'defaultAccount1',
        name: 'Card',
        currency: Currency.USD,
        iconID: 1,
        colorID: 1,
        balance: 0,
        description: '',
      },
      {
        id: 'defaultAccount2',
        name: 'Cash',
        currency: Currency.USD,
        iconID: 2,
        colorID: 2,
        balance: 0,
        description: '',
      },
    ],
    categories: [
      {
        id: 'defaultCategory1',
        name: 'Groceries',
        iconID: 1,
        colorID: 1,
        description: '',
      },
      {
        id: 'defaultCategory2',
        name: 'Restaurant',
        iconID: 2,
        colorID: 2,
        description: '',
      },
      {
        id: 'defaultCategory3',
        name: 'Leisure',
        iconID: 3,
        colorID: 3,
        description: '',
      },
      {
        id: 'defaultCategory4',
        name: 'Transport',
        iconID: 4,
        colorID: 4,
        description: '',
      },
      {
        id: 'defaultCategory5',
        name: 'Health',
        iconID: 5,
        colorID: 5,
        description: '',
      },
      {
        id: 'defaultCategory6',
        name: 'Gifts',
        iconID: 6,
        colorID: 6,
        description: '',
      },
      {
        id: 'defaultCategory7',
        name: 'Family',
        iconID: 7,
        colorID: 7,
        description: '',
      },
      {
        id: 'defaultCategory8',
        name: 'Shopping',
        iconID: 8,
        colorID: 8,
        description: '',
      },
    ],
    transactions: [],
  },
};
