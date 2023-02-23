import { ITransaction, ITransactionAll } from '../interfaces';

export const findOppositeTransfer = (array: ITransaction[], transaction: ITransactionAll) => {
  const oppositeTransaction = array.find(
    (transactionItem) =>
      transactionItem.account === transaction.accountTo &&
      transactionItem.accountTo === transaction.account &&
      transactionItem.amount === -transaction.amount,
  );
  return oppositeTransaction?.id || '';
};
