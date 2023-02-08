import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';

import { Header } from '../Header/Header';

import styles from './App.module.scss';

export const App = () => {
  const { t, i18n } = useTranslation();

  i18n.changeLanguage('ru');

  return (
    <div className={styles.wrapper}>
      <Header />
      <Routes>
        <Route path='/' element={<h1>{t('Start Page')}</h1>} />
        <Route path='*' element={<h1>{t('Page Not Found')}</h1>} />
      </Routes>
    </div>
  );
};
