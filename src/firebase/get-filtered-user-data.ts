import { collection, query, QueryFieldFilterConstraint, where, getDocs } from 'firebase/firestore';
import { IDataFBFiltered } from '../interfaces';
import { db, FirebaseError } from './firebase-config';

export const getFilteredUserData = async (userId: string, data: IDataFBFiltered) => {
  let message = '';
  try {
    const accounts = Object.entries(data);
    const dataRef = collection(db, `users/${userId}/${accounts[0][0]}`);
    let queryRequest = query(dataRef);
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
      message = 'getFilteredUserData: Data not found!';
    }
  } catch (error) {
    throw message
      ? new FirebaseError(message)
      : new FirebaseError(`getFilteredUserData: Read failed... ${error}`);
  }
};
