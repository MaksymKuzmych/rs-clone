import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase, ref, set, child, get, update, remove } from 'firebase/database';
import { DataAllFB, IData, IDataFB, IDataFBDelete, ISettings, IStore } from '../interfaces';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class FirebaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Firebase Error';
  }
}

export const createUser = async (userId: number, store: IStore) => {
  const db = getDatabase();
  try {
    await set(ref(db, 'users/' + userId), {
      settings: store.settings,
      data: store.data,
    });
  } catch (error) {
    throw new Error('Firebase createUser: Create failed...');
  }
};

export const getUser = async (userId: number) => {
  const dbRef = ref(getDatabase());
  let message = '';
  try {
    const snapshot = await get(child(dbRef, `users/` + userId));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      message = 'Firebase getUser: User not found!';
      throw new Error();
    }
  } catch (error) {
    throw message ? new Error(message) : new Error('Firebase getUser: Read failed...');
  }
};

export const deleteUser = async (userId: number) => {
  const db = getDatabase();
  let message = '';
  try {
    const snapshot = await get(child(ref(db), 'users/' + userId));
    if (!snapshot.exists()) {
      message = 'Firebase deleteUser: User not found!';
      throw new Error();
    } else {
      await remove(ref(db, 'users/' + userId));
    }
  } catch (error) {
    throw message ? new Error(message) : new Error('Firebase deleteUser: Delete failed...');
  }
};

export const getUserSettings = async (userId: number) => {
  const db = getDatabase();
  let message = '';
  try {
    const snapshot = await get(child(ref(db), `users/${userId}/settings`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      message = 'Firebase getUserSettings: Settings not found!';
      throw new Error();
    }
  } catch (error) {
    throw message ? new Error(message) : new Error('Firebase getUserSettings: Read failed...');
  }
};

export const updateUserSettings = async (userId: number, settings: Partial<ISettings>) => {
  const db = getDatabase();

  try {
    Object.entries(settings).forEach(async (setting) => {
      const updates = { [`users/${userId}/settings/${setting[0]}`]: setting[1] };
      await update(ref(db), updates);
    });
  } catch (error) {
    new Error('Firebase updateUserSettings: Write failed...');
  }
};

export const getUserData = async (userId: number, data: IDataFBDelete) => {
  const db = getDatabase();
  let message = '';
  try {
    const accounts = Object.entries(data);
    const snapshot = await get(
      child(ref(db), `users/${userId}/data/${accounts[0][0]}/${accounts[0][1]}`),
    );
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      message = 'Firebase getUserData: Data not found!';
      throw new Error();
    }
  } catch (error) {
    throw message ? new Error(message) : new Error('Firebase getUserData: Read failed...');
  }
};

export const updateUserData = async (userId: number, data: IDataFB) => {
  const db = getDatabase();

  try {
    Object.entries(data).forEach(async (accounts) => {
      Object.entries(accounts[1]).forEach(async (id) => {
        Object.entries(id[1] as DataAllFB).forEach(async (color) => {
          const updates = {
            [`users/${userId}/data/${accounts[0]}/${id[0]}/${color[0]}`]: color[1],
          };
          await update(ref(db), updates);
        });
      });
    });
  } catch (error) {
    new Error('Firebase updateUserData: Write failed...');
  }
};

export const pushUserData = async (userId: number, data: Partial<IData>) => {
  const db = getDatabase();

  try {
    Object.entries(data).forEach(async (accounts) => {
      Object.entries(accounts[1]).forEach(async (id) => {
        const updates = {
          [`users/${userId}/data/${accounts[0]}/${id[0]}`]: id[1],
        };
        await update(ref(db), updates);
      });
    });
  } catch (error) {
    new Error('Firebase pushUserData: Write failed...');
  }
};

export const deleteUserData = async (userId: number, data: IDataFBDelete) => {
  const db = getDatabase();
  let message = '';
  try {
    Object.entries(data).forEach(async (accounts) => {
      const snapshot = await get(
        child(ref(db), `users/${userId}/data/${accounts[0]}/${accounts[1]}`),
      );
      if (!snapshot.exists()) {
        message = 'Firebase deleteUserData: Data not found!';
        throw new Error();
      } else {
        await remove(ref(db, `users/${userId}/data/${accounts[0]}/${accounts[1]}`));
      }
    });
  } catch (error) {
    throw message ? new Error(message) : new Error('Firebase deleteUserData: Delete failed...');
  }
};
