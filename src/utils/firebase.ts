// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, child, get } from 'firebase/database';

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
const database = getDatabase(app);
const db = getDatabase();

export const writeData = (userId: number, name: string[], age: number) => {
  set(ref(db, 'users/' + userId), {
    username: name,
    age: age,
  });
};

export const readData = () => {
  const getName = ref(db, 'users/1');
  onValue(getName, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
};

export const readDataOnce = () => {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/1`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
