import { Currency, Lang, Theme, Period, TransactionType } from '../enums';
import { IStore } from '../interfaces';
import { getPeriod } from '../utils/get-period';

export const defaultUserData: IStore = {
  settings: {
    userId: 'default',
    lang: Lang.EN,
    currency: Currency.USD,
    theme: Theme.Dark,
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
        type: TransactionType.Expense,
        icon: 'shopping_basket',
        color: '#5c6ac2',
      },
      {
        id: 'defaultCategory2',
        date: Date.now() + 2,
        name: 'Restaurant',
        type: TransactionType.Expense,
        icon: 'restaurant',
        color: '#6ebaa0',
      },
      {
        id: 'defaultCategory3',
        date: Date.now() + 3,
        name: 'Leisure',
        type: TransactionType.Expense,
        icon: 'theaters',
        color: '#cd4863',
      },
      {
        id: 'defaultCategory4',
        date: Date.now() + 4,
        name: 'Transport',
        type: TransactionType.Expense,
        icon: 'directions_bus',
        color: '#7f7f7f',
      },
      {
        id: 'defaultCategory5',
        date: Date.now() + 5,
        name: 'Health',
        type: TransactionType.Expense,
        icon: 'spa',
        color: '#4154b0',
      },
      {
        id: 'defaultCategory6',
        date: Date.now() + 6,
        name: 'Gifts',
        type: TransactionType.Expense,
        icon: 'redeem',
        color: '#4da8ef',
      },
      {
        id: 'defaultCategory7',
        date: Date.now() + 7,
        name: 'Family',
        type: TransactionType.Expense,
        icon: 'face',
        color: '#fa4c87',
      },
      {
        id: 'defaultCategory8',
        date: Date.now() + 8,
        name: 'Shopping',
        type: TransactionType.Expense,
        icon: 'local_mall',
        color: '#eda948',
      },
      {
        id: 'defaultCategory9',
        date: Date.now() + 9,
        name: 'Salary',
        type: TransactionType.Income,
        icon: 'payments',
        color: '#5aae59',
      },
    ],
    transactions: [],
  },
};

export const emptyUserData: IStore = {
  settings: {
    userId: '',
    lang: Lang.EN,
    currency: Currency.USD,
    theme: Theme.Dark,
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
