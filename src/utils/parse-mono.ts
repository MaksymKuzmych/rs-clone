import { TransactionType } from '../enums';
import { IMono, ITransaction } from '../interfaces';

export const parseMono = (data: IMono[]) => {
  const transactions: ITransaction[] = [];
  const accounts: string[] = [];
  const categories: string[] = [];
  let cardNumber = '';

  data.forEach((row, index) => {
    if (index === 9) {
      cardNumber = row[0].split(':')[1].replaceAll(' ', '');
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
      const category = row[2];
      const account = 'Монобанк ' + cardNumber;
      const description = row[1];
      const amount = row[3];
      const newAccount = accounts.includes(account);
      const newCategory = categories.includes(category);
      transactions.push({
        id: '',
        date,
        type: amount > 0 ? TransactionType.Income : TransactionType.Expenses,
        account,
        category,
        amount,
        description,
      });
      if (!newAccount) {
        accounts.push(account);
      }
      if (!newCategory) {
        categories.push(category);
      }
    }
  });
  return { accounts, categories, transactions };
};
