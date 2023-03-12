import { monoMCC } from '../data/mono-mcc';
import { TransactionType } from '../enums';
import { IAccount, ICategory, ITransaction } from '../interfaces';

export const findAccount = (array: IAccount[], id: string) =>
  array.find((account) => account.id === id);

export const findCategory = (array: ICategory[], name: string, type: TransactionType) => {
  const newCategory = array.filter((category) => category.name === name);
  if (newCategory.length) {
    switch (type) {
      case newCategory[0]?.type:
        return newCategory[0];
      case newCategory[1]?.type:
        return newCategory[1];
    }
  }
};

export const findTransaction = (array: ITransaction[], id: string) =>
  array.find((account) => account.id === id);

export const increaseID = (array: ITransaction[], name: string, id: string) => {
  for (let i = 0; i < 10; i++) {
    const newTransaction = findTransaction(array, name + (+id.replace(name, '') + i));
    if (!newTransaction) {
      return name + (+id.replace(name, '') + i);
    }
  }
};

export const findMCC = (mcc: string) => {
  const found = monoMCC.filter((category) => category.id.includes(+mcc));
  if (found.length) {
    return found[0].name;
  } else {
    return mcc;
  }
};
