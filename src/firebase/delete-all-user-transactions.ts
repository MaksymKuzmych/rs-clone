import { deleteDoc, doc } from 'firebase/firestore';
import { Sort } from '../enums';
import { IData, ITransaction } from '../interfaces';
import { db, FirebaseError } from './firebase-config';
import { getFilteredUserData } from './get-filtered-user-data';

export const deleteAllUserTransactions = async (userId: string) => {
  const firebase: Partial<IData> = { transactions: [] };
  try {
    firebase.transactions = (await getFilteredUserData(
      userId,
      {
        transactions: { account: null, period: { start: null, end: null } },
      },
      Sort.DESC,
    )) as ITransaction[];

    Object.entries(firebase).forEach(async (accounts) => {
      accounts[1].forEach(async (account) => {
        const docRef = doc(db, `users/${userId}/${accounts[0]}`, account.id);
        await deleteDoc(docRef);
      });
    });
  } catch (error) {
    throw new FirebaseError(`Delete User Data: ${error}`);
  }
};
