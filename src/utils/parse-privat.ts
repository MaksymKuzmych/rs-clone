import { TransactionType } from '../enums';
import { IPrivat, ITransaction } from '../interfaces';

export const parsePrivat = (data: IPrivat[]) => {
  const transactions: ITransaction[] = [];
  const accounts: string[] = [];
  const categories: string[] = [];

  data.forEach((row, index) => {
    if (index > 1 && index < data.length - 1) {
      const day = row[0].split('.').map((month, index) => {
        if (index === 1) {
          return +month - 1;
        }
        return +month;
      });
      const time = row[1].split(':').map((hours) => +hours);
      const date = new Date(day[2], day[1], day[0], time[0], time[1]).getTime();
      const category = row[2];
      const account = 'Приват ' + row[3].split('(')[1].replace(')', '');
      const description = row[4];
      const amount = row[5];
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
