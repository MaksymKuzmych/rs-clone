import { Currency, Lang, Mode, Period, TransactionType } from '../enums';
import { IStore } from '../interfaces';
import { getPeriod } from '../utils/get-period';

export const defaultUserData: IStore = {
  userId: 'default',
  settings: {
    lang: Lang.EN,
    currency: Currency.USD,
    theme: Mode.Dark,
    selectedAccount: null,
    periodType: Period.Month,
    period: getPeriod(Period.Month, Date.now()),
  },
  data: {
    accounts: [
      {
        id: 'defaultAccount1',
        date: Date.now() + 1,
        name: 'Card',
        icon: 'credit_card',
        color: '#cd4863',
        balance: 0,
        description: '',
      },
      {
        id: 'defaultAccount2',
        date: Date.now() + 2,
        name: 'Cash',
        icon: 'account_balance_wallet',
        color: '#6ebaa0',
        balance: 0,
        description: '',
      },
    ],
    categories: [
      {
        id: 'defaultCategory1',
        date: Date.now() + 1,
        name: 'Gloceries',
        type: TransactionType.Expenses,
        iconID: 1,
        colorID: 1,
      },
      {
        id: 'defaultCategory2',
        date: Date.now() + 2,
        name: 'Restaurant',
        type: TransactionType.Expenses,
        iconID: 2,
        colorID: 2,
      },
      {
        id: 'defaultCategory3',
        date: Date.now() + 3,
        name: 'Leisure',
        type: TransactionType.Expenses,
        iconID: 3,
        colorID: 3,
      },
      {
        id: 'defaultCategory4',
        date: Date.now() + 4,
        name: 'Transport',
        type: TransactionType.Expenses,
        iconID: 4,
        colorID: 4,
      },
      {
        id: 'defaultCategory5',
        date: Date.now() + 5,
        name: 'Health',
        type: TransactionType.Expenses,
        iconID: 5,
        colorID: 5,
      },
      {
        id: 'defaultCategory6',
        date: Date.now() + 6,
        name: 'Gifts',
        type: TransactionType.Expenses,
        iconID: 6,
        colorID: 6,
      },
      {
        id: 'defaultCategory7',
        date: Date.now() + 7,
        name: 'Family',
        type: TransactionType.Expenses,
        iconID: 7,
        colorID: 7,
      },
      {
        id: 'defaultCategory8',
        date: Date.now() + 8,
        name: 'Shopping',
        type: TransactionType.Expenses,
        iconID: 8,
        colorID: 8,
      },
      {
        id: 'defaultCategory9',
        date: Date.now() + 9,
        name: 'Salary',
        type: TransactionType.Income,
        iconID: 9,
        colorID: 9,
      },
    ],
    transactions: [],
  },
};

export const emptyUserData: IStore = {
  userId: '',
  settings: {
    lang: Lang.EN,
    currency: Currency.USD,
    theme: Mode.Dark,
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
