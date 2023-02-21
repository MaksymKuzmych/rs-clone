import { deleteDoc, doc } from 'firebase/firestore';
import { Sort } from '../enums';
import { IAccount, ICategory, IData, ITransaction } from '../interfaces';
import { db, FirebaseError } from './firebase-config';
import { getFilteredUserData } from './get-filtered-user-data';

export const deleteAllUserData = async (userId: string) => {
  const firebase: Partial<IData> = { accounts: [], categories: [], transactions: [] };
  try {
    firebase.accounts = (await getFilteredUserData(
      userId,
      { accounts: null },
      Sort.ASC,
    )) as IAccount[];
    firebase.categories = (await getFilteredUserData(
      userId,
      {
        categories: null,
      },
      Sort.ASC,
    )) as ICategory[];
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
