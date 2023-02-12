import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';

import { Header } from '../Header/Header';
import { AccountPage } from '../../pages/AccountPage/AccountPage';
import { CategoryPage } from '../../pages/CategoryPage/CategoryPage';
import { Footer } from '../Footer/Footer';
import { NotFound } from '../NotFound/NotFound';
import { useContext } from 'react';
import { AuthContext } from '../../Auth/Auth';

export const App = () => {
  const { i18n } = useTranslation();

  const data = useContext(AuthContext);
  console.log(data);

  i18n.changeLanguage('ru');

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<CategoryPage />} />
        <Route path='/accounts' element={<AccountPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};
