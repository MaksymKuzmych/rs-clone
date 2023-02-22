import { TransactionType } from '../enums';
import { ITransaction } from '../interfaces';
export const storeTr: ITransaction[] = [
  {
    id: '1',
    date: Date.now(),
    type: TransactionType.Expenses,
    account: 'defaultAccount1',
    accountTo: null,
    category: 'defaultCategory2',
    amount: -500,
    description: null,
  },
  {
    id: '2',
    date: Date.now(),
    type: TransactionType.Expenses,
    account: 'defaultAccount1',
    accountTo: null,
    category: 'defaultCategory1',
    amount: -50,
    description: 'none',
  },
  {
    id: '3',
    date: Date.now(),
    type: TransactionType.Expenses,
    account: 'defaultAccount1',
    accountTo: null,
    category: 'defaultCategory7',
    amount: -520,
    description: null,
  },
  {
    id: '4',
    date: Date.now() - 86400000,
    type: TransactionType.Expenses,
    account: 'defaultAccount1',
    accountTo: null,
    category: 'defaultCategory2',
    amount: -80,
    description: 'something',
  },
  {
    id: '5',
    date: Date.now() - 86400000,
    type: TransactionType.Expenses,
    account: 'defaultAccount1',
    accountTo: null,
    category: 'defaultCategory3',
    amount: -80,
    description: 'my notes',
  },
  {
    id: '6',
    date: Date.now() - 86400000,
    type: TransactionType.Expenses,
    account: 'defaultAccount1',
    accountTo: null,
    category: 'defaultCategory6',
    amount: -80,
    description: null,
  },
  {
    id: '7',
    date: Date.now() - 2 * 86400000,
    type: TransactionType.Expenses,
    account: 'defaultAccount2',
    accountTo: null,
    category: 'defaultCategory2',
    amount: -38,
    description: null,
  },
  {
    id: '8',
    date: Date.now() - 2 * 86400000,
    type: TransactionType.Expenses,
    account: 'defaultAccount2',
    accountTo: null,
    category: 'defaultCategory4',
    amount: -80,
    description: 'some text',
  },
  {
    id: '9',
    date: Date.now() - 2 * 86400000,
    type: TransactionType.Expenses,
    account: 'defaultAccount2',
    accountTo: null,
    category: 'defaultCategory1',
    amount: -40,
    description: 'other text',
  },
  {
    id: '10',
    date: new Date(2023, 1, 1).getTime(),
    type: TransactionType.Income,
    account: 'defaultAccount2',
    accountTo: null,
    category: 'defaultCategory9',
    amount: 4050,
    description: null,
  },
  {
    id: '11',
    date: new Date(2023, 1, 15).getTime(),
    type: TransactionType.Income,
    account: 'defaultAccount2',
    accountTo: null,
    category: 'defaultCategory9',
    amount: 550,
    description: null,
  },
  {
    id: '12',
    date: Date.now(),
    type: TransactionType.Income,
    account: 'defaultAccount2',
    accountTo: null,
    category: 'defaultCategory9',
    amount: 35,
    description: 'some text',
  },
  {
    id: '13',
    date: Date.now() - 2 * 86400000,
    type: TransactionType.Income,
    account: 'defaultAccount2',
    accountTo: null,
    category: 'defaultCategory9',
    amount: 12,
    description: 'other text',
  },
  {
    id: '14',
    date: Date.now() - 86400000,
    type: TransactionType.Transfer,
    account: 'defaultAccount2',
    accountTo: 'defaultAccount1',
    category: null,
    amount: 200,
    description: 'other text',
  },
  {
    id: '15',
    date: Date.now() - 86400000,
    type: TransactionType.Transfer,
    account: 'defaultAccount1',
    accountTo: 'defaultAccount2',
    category: null,
    amount: -200,
    description: 'other text',
  },
];
