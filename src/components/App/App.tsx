import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';

import { CategoryPage } from '../../pages/CategoryPage/CategoryPage';
import { AccountPage } from '../../pages/AccountPage/AccountPage';
import { getUserId } from '../../firebase/get-user-id';
import { Header } from '../Header/Header';

import styles from './App.module.scss';

export const App = () => {
  const { t, i18n } = useTranslation();

  i18n.changeLanguage('ru');

  getUserId();

  return (
    <div className={styles.wrapper}>
      <Header />
      <Routes>
        <Route path='/' element={<h1>{t('Start Page')}</h1>} />
        <Route path='/category' element={<CategoryPage />} />
        <Route path='*' element={<h1>{t('Page Not Found')}</h1>} />
      </Routes>
    </div>
  );
};
