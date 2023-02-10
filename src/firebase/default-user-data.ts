import { Currency, Lang, Period, TransactionType } from '../enums';
import { IStore } from '../interfaces';
import { getPeriod } from '../utils/get-period';

export const defaultUserData: IStore = {
  userId: null,
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
        icon: 'credit_card',
        color: '#cd4863',
        balance: 0,
        description: '',
      },
      {
        id: 'defaultAccount2',
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
        name: 'Groceries',
        type: TransactionType.Expenses,
        iconID: 1,
        colorID: 1,
        description: '',
      },
      {
        id: 'defaultCategory2',
        name: 'Restaurant',
        type: TransactionType.Expenses,
        iconID: 2,
        colorID: 2,
        description: '',
      },
      {
        id: 'defaultCategory3',
        name: 'Leisure',
        type: TransactionType.Expenses,
        iconID: 3,
        colorID: 3,
        description: '',
      },
      {
        id: 'defaultCategory4',
        name: 'Transport',
        type: TransactionType.Expenses,
        iconID: 4,
        colorID: 4,
        description: '',
      },
      {
        id: 'defaultCategory5',
        name: 'Health',
        type: TransactionType.Expenses,
        iconID: 5,
        colorID: 5,
        description: '',
      },
      {
        id: 'defaultCategory6',
        name: 'Gifts',
        type: TransactionType.Expenses,
        iconID: 6,
        colorID: 6,
        description: '',
      },
      {
        id: 'defaultCategory7',
        name: 'Family',
        type: TransactionType.Expenses,
        iconID: 7,
        colorID: 7,
        description: '',
      },
      {
        id: 'defaultCategory8',
        name: 'Shopping',
        type: TransactionType.Expenses,
        iconID: 8,
        colorID: 8,
        description: '',
      },
      {
        id: 'defaultCategory9',
        name: 'Salary',
        type: TransactionType.Income,
        iconID: 9,
        colorID: 9,
        description: '',
      },
    ],
    transactions: [],
  },
};
