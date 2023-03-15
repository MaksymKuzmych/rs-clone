import { deleteDoc, doc } from 'firebase/firestore';

import { Sort } from '../enums';
import { db, FirebaseError } from './firebase-config';
import { getFilteredUserData } from './get-filtered-user-data';
import { incrementBalance } from './increment-balance';

export const deleteAllUserTransactions = async (userId: string, transfer = false) => {
  try {
    const transactions = await getFilteredUserData(
      userId,
      {
        transactions: { account: null, period: { start: null, end: null } },
      },
      Sort.DESC,
    );

    transactions.forEach(async (transaction) => {
      const { account, accountTo, amount } = transaction;

      if (transfer) {
        await incrementBalance(userId, account, -amount);
        if (accountTo) {
          await incrementBalance(userId, accountTo, +amount);
        }
      }
      const docRef = doc(db, `users/${userId}/transactions`, transaction.id);
      await deleteDoc(docRef);
    });
  } catch (error) {
    throw new FirebaseError(`Delete User Data: ${error}`);
  }
};
