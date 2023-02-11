import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';

import { Header } from '../Header/Header';
import { AccountPage } from '../../pages/AccountPage/AccountPage';
import { CategoryPage } from '../../pages/CategoryPage/CategoryPage';

import styles from './App.module.scss';
import Footer from '../Footer/Footer';

export const App = () => {
  const { t, i18n } = useTranslation();

  i18n.changeLanguage('ru');

  return (
    <div className={styles.wrapper}>
      <Header />
      <Routes>
        <Route path='/' element={<CategoryPage />} />
        <Route path='/accounts' element={<AccountPage />} />
        <Route path='*' element={<h1>{t('Page Not Found')}</h1>} />
      </Routes>
      <Footer />
    </div>
  );
};
