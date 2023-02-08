import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  QueryFieldFilterConstraint,
} from 'firebase/firestore';
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

import { IData, IDataFB, IDataFBFiltered, IDataFBGet, ISettings, IStore } from '../interfaces';
import { DataAllFB } from '../types';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

class FirebaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Firebase Error';
  }
}

export const createUser = async (userId: string, store: IStore) => {
  try {
    await setDoc(doc(db, 'users/', userId), {
      settings: store.settings,
    });
    store.data.accounts.forEach(async (account) => {
      await setDoc(doc(db, 'users/' + userId + '/accounts', account.id), account);
    });
    store.data.categories.forEach(async (category) => {
      await setDoc(doc(db, 'users/' + userId + '/categories', category.id), category);
    });
  } catch (error) {
    throw new FirebaseError(`Create User: ${error}`);
  }
};

export const getUserSettings = async (userId: string) => {
  const docRef = doc(db, 'users', userId);
  let message = '';
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().settings;
    } else {
      message = 'getUserSettings: User not found!';
      throw new Error();
    }
  } catch (error) {
    throw message
      ? new FirebaseError(message)
      : new FirebaseError(`getUserSettings: Read failed... ${error}`);
  }
};

export const updateUserSettings = async (userId: string, settings: Partial<ISettings>) => {
  const docRef = doc(db, 'users', userId);
  try {
    Object.entries(settings).forEach(async (setting) => {
      const updates = { [`settings.${setting[0]}`]: setting[1] };
      await updateDoc(docRef, updates);
    });
  } catch (error) {
    throw new FirebaseError(`updateUserSettings: Write failed... ${error}`);
  }
};

export const getUserData = async (userId: string, data: IDataFBGet) => {
  let message = '';
  try {
    const accounts = Object.entries(data);
    const docRef = doc(db, `users/${userId}/${accounts[0][0]}`, accounts[0][1]);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      message = 'Firebase getUserData: Data not found!';
      throw new Error();
    }
  } catch (error) {
    throw message
      ? new FirebaseError(message)
      : new FirebaseError(`getUserData: Read failed... ${error}`);
  }
};

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
      throw new Error();
    }
  } catch (error) {
    throw message
      ? new FirebaseError(message)
      : new FirebaseError(`getFilteredUserData: Read failed... ${error}`);
  }
};

export const updateUserData = async (userId: string, data: IDataFB) => {
  try {
    Object.entries(data).forEach(async (accounts) => {
      Object.entries(accounts[1]).forEach(async (id) => {
        Object.entries(id[1] as DataAllFB).forEach(async (color) => {
          const docRef = doc(db, `users/${userId}/${accounts[0]}`, id[0]);
          const updates = { [color[0]]: color[1] };
          await updateDoc(docRef, updates);
        });
      });
    });
  } catch (error) {
    throw new FirebaseError(`updateUserData: Write failed... ${error}`);
  }
};

export const pushUserData = async (userId: string, data: Partial<IData>) => {
  try {
    Object.entries(data).forEach(async (accounts) => {
      accounts[1].forEach(async (id) => {
        const docRef = doc(collection(db, `users/${userId}/${accounts[0]}`));
        const docRefId = doc(db, `users/${userId}/${accounts[0]}`, docRef.id);
        await setDoc(docRef, id);
        await updateDoc(docRefId, { id: docRef.id });
      });
    });
  } catch (error) {
    throw new FirebaseError(`pushUserData: Write failed... ${error}`);
  }
};

export const deleteUserData = async (userId: string, data: IDataFBGet) => {
  let message = '';
  try {
    const accounts = Object.entries(data);
    const docRef = doc(db, `users/${userId}/${accounts[0][0]}`, accounts[0][1]);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      message = 'deleteUserData: Data not found!';
      throw new Error();
    } else {
      await deleteDoc(docRef);
    }
  } catch (error) {
    throw message
      ? new FirebaseError(message)
      : new FirebaseError(`deleteUserData: Delete failed... ${error}`);
  }
};

export const registerUser = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    // console.log(error);
  }
};

export const signInUser = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    // console.log(error);
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    // console.log(error);
  }
};

export const userAuth = () => auth.currentUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
