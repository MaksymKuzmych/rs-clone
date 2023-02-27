import { iconsCategory } from '../data/icons';
import { TransactionType } from '../enums';
import { IAccount, ICategory, IPrivat, ITransaction } from '../interfaces';
import { findAccount, findCategory, increaseID } from './find-data';
import { getRandomColor, getRandomIcon } from './get-random-data';

export const parsePrivat = (data: IPrivat[]) => {
  const transactions: ITransaction[] = [];
  const accounts: IAccount[] = [];
  const categories: ICategory[] = [];
  let balance = 0;

  data.forEach((row, index) => {
    if (index === 2) {
      balance = +row[9].toFixed(2);
    }
    if (index > 1 && index < data.length - 1) {
      const time = row[1].split(':').map((hours) => +hours);
      const day = row[0].split('.').map((month, index) => {
        if (index === 1) {
          return +month - 1;
        }
        return +month;
      });
      const date = new Date(day[2], day[1], day[0], time[0], time[1]).getTime();
      const amount = row[5];
      let accountId = `importedPrivat${row[3].split('(')[1].replace(')', '').slice(-4)}`;
      let categoryId = `importedPrivatCategory${categories.length + 1}`;
      const transactionId = `importedPrivat${date}`;
      const account: IAccount = {
        id: accountId,
        date: Date.now(),
        name: 'Приват',
        icon: 'credit_card',
        color: getRandomColor().color,
        balance,
        description: row[3].split('(')[1].replace(')', '').slice(-4),
      };
      const category: ICategory = {
        id: categoryId,
        date: Date.now(),
        name: row[2],
        type: amount > 0 ? TransactionType.Income : TransactionType.Expense,
        icon: getRandomIcon(iconsCategory).name,
        color: getRandomColor().color,
      };
      const description = row[4];
      const newAccount = findAccount(accounts, accountId);
      const newCategory = findCategory(categories, row[2], category.type);
      if (newAccount) {
        accountId = newAccount.id;
      } else {
        accounts.push(account);
      }
      if (newCategory) {
        categoryId = newCategory.id;
      } else {
        categories.push(category);
      }
      transactions.push({
        id: increaseID(transactions, 'importedPrivat', transactionId) || 'importedPrivat',
        date,
        type: category.type,
        account: accountId,
        accountTo: null,
        category: categoryId,
        amount,
        description,
      });
    }
  });
  return { accounts, categories, transactions };
};
