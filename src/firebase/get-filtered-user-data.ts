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
    const order = orderBy('date');
    let queryRequest = query(dataRef, order);
    const queryArray: QueryFieldFilterConstraint[] = [];
    if (data.transactions?.periodStart && data.transactions?.periodEnd) {
      queryArray.push(where('date', '>=', data.transactions.periodStart));
      queryArray.push(where('date', '<=', data.transactions.periodEnd));
    }
    if (data.transactions?.account) {
      queryArray.push(where('account', '==', data.transactions.account));
    }
    if (data.transactions?.category) {
      queryArray.push(where('category', '==', data.transactions.category));
    }
    if (data.transactions?.type) {
      queryArray.push(where('type', '==', data.transactions.type));
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
