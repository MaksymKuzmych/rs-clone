import { iconsCategory } from '../data/icons';
import { TransactionType } from '../enums';
import { IAccount, ICategory, IMono, ITransaction } from '../interfaces';
import { findAccount, findCategory, findMCC, increaseID } from './find-data';
import { getRandomColor, getRandomIcon } from './get-random-data';

export const parseMono = (data: IMono[]) => {
  const accounts: IAccount[] = [];
  const categories: ICategory[] = [];
  const transactions: ITransaction[] = [];
  let cardNumber = '';
  let balance = 0;

  data.forEach((row, index) => {
    if (index === 9) {
      cardNumber = row[0].split(':')[1].replaceAll(' ', '');
    }
    if (index === 17) {
      balance = parseFloat(row[0].split(': ')[1].replace(' ', ''));
    }
    if (index > 19 && index < data.length - 1) {
      const day = row[0]
        .replaceAll(/\.|:/g, ' ')
        .split(' ')
        .map((month, index) => {
          if (index === 1) {
            return +month - 1;
          }
          return +month;
        });
      const date = new Date(day[2], day[1], day[0], day[3], day[4], day[5]).getTime();
      const amount = row[3];
      let accountId = `importedMono${cardNumber.slice(-4)}`;
      let categoryId = `importedMonoCategory${categories.length + 1}`;
      const transactionId = `importedMono${date}`;
      const account: IAccount = {
        id: accountId,
        date: Date.now(),
        name: 'Монобанк',
        icon: 'credit_card',
        color: getRandomColor().color,
        balance,
        description: cardNumber,
      };
      const category: ICategory = {
        id: categoryId,
        date: Date.now(),
        name: findMCC(row[2]),
        type: amount > 0 ? TransactionType.Income : TransactionType.Expense,
        icon: getRandomIcon(iconsCategory).name,
        color: getRandomColor().color,
      };
      const description = row[1];
      const newAccount = findAccount(accounts, accountId);
      if (newAccount) {
        accountId = newAccount.id;
      } else {
        accounts.push(account);
      }
      const newCategory = findCategory(categories, category.name, category.type);
      if (newCategory) {
        categoryId = newCategory.id;
      } else {
        categories.push(category);
      }
      transactions.push({
        id: increaseID(transactions, 'importedMono', transactionId) || 'importedMono',
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
