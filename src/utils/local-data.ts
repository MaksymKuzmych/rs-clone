import { store } from './store';

export const getLocalData = () => {
  const localLogin = localStorage.getItem('login');
  const localSettings = localStorage.getItem('settings');
  const localData = localStorage.getItem('data');

  if (localLogin) {
    store.login = JSON.parse(localLogin);
  }
  if (localSettings) {
    store.settings = JSON.parse(localSettings);
  }
  if (localData) {
    store.data = JSON.parse(localData);
  }
};

export const setLocalData = () => {
  localStorage.setItem('login', JSON.stringify(store.login));
  localStorage.setItem('settings', JSON.stringify(store.settings));
  localStorage.setItem('data', JSON.stringify(store.data));
};
