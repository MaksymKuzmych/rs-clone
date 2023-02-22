import { collection, query, getDocs, orderBy } from 'firebase/firestore';

import { Sort } from '../enums';
import { IDataFBFiltered } from '../interfaces';
import { db, FirebaseError } from './firebase-config';

export const getUserData = async (userId: string, data: IDataFBFiltered, sort: Sort) => {
  try {
    const accounts = Object.entries(data);
    const dataRef = collection(db, `users/${userId}/${accounts[0][0]}`);
    const order = orderBy('date', sort);
    const queryRequest = query(dataRef, order);
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
