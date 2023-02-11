import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';

import { Header } from '../Header/Header';
import { AccountPage } from '../../pages/AccountPage/AccountPage';
import { CategoryPage } from '../../pages/CategoryPage/CategoryPage';
import { getUserId } from '../../firebase/get-user-id';

import styles from './App.module.scss';

export const App = () => {
  const { t, i18n } = useTranslation();

  i18n.changeLanguage('ru');

  getUserId();

  getUserId();

  return (
    <div className={styles.wrapper}>
      <Header />
      <Routes>
        <Route path='/account' element={<AccountPage />} />
        <Route path='/' element={<CategoryPage />} />
        <Route path='*' element={<h1>{t('Page Not Found')}</h1>} />
      </Routes>
    </div>
  );
};
