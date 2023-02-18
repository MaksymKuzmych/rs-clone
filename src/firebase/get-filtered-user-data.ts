import {
  collection,
  query,
  QueryFieldFilterConstraint,
  where,
  getDocs,
  orderBy,
} from 'firebase/firestore';
import { IDataFBFiltered } from '../interfaces';
import { db, FirebaseError } from './firebase-config';

export const getFilteredUserData = async (userId: string, data: IDataFBFiltered) => {
  try {
    const accounts = Object.entries(data);
    const dataRef = collection(db, `users/${userId}/${accounts[0][0]}`);
    const order = orderBy('date', 'desc');
    let queryRequest = query(dataRef, order);
    const queryArray: QueryFieldFilterConstraint[] = [];
    if (data.transactions?.period.start && data.transactions?.period.end) {
      queryArray.push(where('date', '>=', data.transactions.period.start));
      queryArray.push(where('date', '<=', data.transactions.period.end));
    }
    if (data.transactions?.account) {
      queryArray.push(where('account', '==', data.transactions.account));
    }
    if (queryArray.length) {
      queryRequest = query(dataRef, ...queryArray);
    }
    const querySnapshot = await getDocs(queryRequest);
    const dataArray = querySnapshot.docs.map((doc) => doc.data());
    if (dataArray.length) {
      return dataArray;
    } else {
      return [];
    }
  } catch (error) {
    throw new FirebaseError(`Get Filtered User Data: ${error}`);
  }
};
