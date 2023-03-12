import {
  collection,
  query,
  QueryFieldFilterConstraint,
  where,
  getDocs,
  orderBy,
} from 'firebase/firestore';

import { Sort } from '../enums';
import { IDataFBFiltered } from '../interfaces';
import { db, FirebaseError } from './firebase-config';

export const getFilteredUserData = async (userId: string, data: IDataFBFiltered, sort: Sort) => {
  try {
    const accounts = Object.entries(data);
    const dataRef = collection(db, `users/${userId}/${accounts[0][0]}`);
    const order = orderBy('date', sort);
    const start = data.transactions?.period.start;
    const end = data.transactions?.period.end;
    const account = data.transactions?.account;
    let queryRequest = query(dataRef, order);
    let queryArray: QueryFieldFilterConstraint[] = [];

    if (start && end) {
      queryArray.push(where('date', '>=', start));
      queryArray.push(where('date', '<=', end));
    }
    if (account) {
      queryArray.push(where('account', '==', account));
    }
    if (queryArray.length) {
      queryRequest = query(dataRef, order, ...queryArray);
    }
    let querySnapshot = await getDocs(queryRequest);
    let dataArray = querySnapshot.docs.map((doc) => doc.data());

    if (account) {
      queryArray = queryArray.filter(
        (query) => JSON.stringify(query) !== JSON.stringify(where('account', '==', account)),
      );
      queryArray.push(where('accountTo', '==', account));
      queryRequest = query(dataRef, order, ...queryArray);
      querySnapshot = await getDocs(queryRequest);
      dataArray = [...dataArray, ...querySnapshot.docs.map((doc) => doc.data())].sort(
        (firstTransaction, secondTransaction) => secondTransaction.date - firstTransaction.date,
      );
    }

    if (dataArray.length) {
      return dataArray;
    } else {
      return [];
    }
  } catch (error) {
    throw new FirebaseError(`Get Filtered User Data: ${error}`);
  }
};
