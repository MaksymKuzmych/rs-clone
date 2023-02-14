// import { useEffect, useState } from 'react';
// import { CurrencySymbol } from '../enums';
// import { pullUserData } from '../firebase/pull-user-data';

// import { ICategory, ITransaction } from '../interfaces';

// export const useCategories = () => {
//   const [categories, setCategories] = useState<ICategory[]>(userData.data.categories);
//   const [transactions, setTransactions] = useState<ITransaction[]>(userData.data.transactions);
//   const [currency, setCurrency] = useState(CurrencySymbol[userData.settings.currency]);
//   const [loading, setLoading] = useState(true);
//   const user = userData;

//   async function getInfo() {
//     try {
//       await pullUserData();
//       setCategories(userData.data.categories);
//       setTransactions(userData.data.transactions);
//       setCurrency(CurrencySymbol[userData.settings.currency]);
//     } catch (e) {
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     getInfo();
//   }, []);

//   useEffect(() => {
//     setCategories(userData.data.categories);
//     setTransactions(userData.data.transactions);
//     setCurrency(CurrencySymbol[userData.settings.currency]);
//   }, [user.data.categories, user.data.transactions, user.settings.currency]);

//   return { categories, transactions, currency, loading };
// };
export const useCategories = () => {
  return 1;
};
