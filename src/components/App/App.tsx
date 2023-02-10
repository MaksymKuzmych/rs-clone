import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';

import { CategoryPage } from '../../pages/CategoryPage/CategoryPage';
import { AccountPage } from '../../pages/AccountPage/AccountPage';
import { getUserId } from '../../firebase/get-user-id';

export const App = () => {
  const { t, i18n } = useTranslation();

  i18n.changeLanguage('ru');

  getUserId();

  return (
    <Routes>
      <Route path='/' element={<h1>{t('Start Page')}</h1>} />
      <Route path='/account' element={<AccountPage />} />
      <Route path='/category' element={<CategoryPage />} />
      <Route path='*' element={<h1>{t('Page Not Found')}</h1>} />
    </Routes>
  );
};
