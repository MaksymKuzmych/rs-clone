// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, child, get } from 'firebase/database';
import { ISettingsFirebase, IStore } from '../interfaces';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCcUXS1Bdjo_i-oy5fpaJU-Ru3jf0rbNKU',
  authDomain: 'rs-clone-f66eb.firebaseapp.com',
  projectId: 'rs-clone-f66eb',
  storageBucket: 'rs-clone-f66eb.appspot.com',
  messagingSenderId: '489433569397',
  appId: '1:489433569397:web:93c58002c872e0af84c03c',
  databaseURL: 'https://rs-clone-f66eb-default-rtdb.europe-west1.firebasedatabase.app',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
const db = getDatabase();

export const exampleReadData = (userId: number) => {
  const getName = ref(db, 'users/' + userId);
  onValue(getName, (/*snapshot*/) => {
    // const data = snapshot.val();
    // console.log(data);
  });
};

// export const exampleReadDataOnce = (userId: number) => {
//   const dbRef = ref(getDatabase());
//   get(child(dbRef, `users/` + userId))
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         console.log(snapshot.val());
//       } else {
//         console.log('No data available');
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

export const createUser = async (userId: number, store: IStore) => {
  await set(ref(db, 'users/' + userId), {
    settings: store.settings,
    data: store.data,
  });
};

export const setUserSettings = async (userId: number, settings: ISettingsFirebase) => {
  const lang = settings.lang;
  const currency = settings.currency;
  const selectedAccount = settings.selectedAccount;
  const periodType = settings.periodType;
  const period = settings.period;

  if (lang) {
    await set(ref(db, `users/${userId}/settings/lang`), { lang });
  }
  if (currency) {
    await set(ref(db, `users/${userId}/settings/currency`), { currency });
  }
  if (selectedAccount) {
    await set(ref(db, `users/${userId}/settings/selectedAccount`), { selectedAccount });
  }
  if (periodType) {
    await set(ref(db, `users/${userId}/settings/periodType`), { periodType });
  }
  if (period) {
    await set(ref(db, `users/${userId}/settings/period`), { period });
  }
};

export const setUserData = async (userId: number) => {
  await set(ref(db, 'users/' + userId + '/data'), {
    time: Date.now(),
  });
};

export const getUser = (userId: number) => {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/` + userId))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
      } else {
        // console.log('No data available');
      }
    })
    .catch((error) => {
      // console.error(error);
    });
};

// import { getDatabase, ref, child, push, update } from "firebase/database";

// function writeNewPost(uid, username, picture, title, body) {
//   const db = getDatabase();

//   // A post entry.
//   const postData = {
//     author: username,
//     uid: uid,
//     body: body,
//     title: title,
//     starCount: 0,
//     authorPic: picture
//   };

//   // Get a key for a new Post.
//   const newPostKey = push(child(ref(db), 'posts')).key;

//   // Write the new post's data simultaneously in the posts list and the user's post list.
//   const updates = {};
//   updates['/posts/' + newPostKey] = postData;
//   updates['/user-posts/' + uid + '/' + newPostKey] = postData;

//   return update(ref(db), updates);
// }

// import { getDatabase, ref, set } from "firebase/database";

// const db = getDatabase();
// set(ref(db, 'users/' + userId), {
//   username: name,
//   email: email,
//   profile_picture : imageUrl
// })
// .then(() => {
//   // Data saved successfully!
// })
// .catch((error) => {
//   // The write failed...
// });
