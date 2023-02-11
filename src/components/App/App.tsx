import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';

import { CategoryPage } from '../../pages/CategoryPage/CategoryPage';
import { AccountPage } from '../../pages/AccountPage/AccountPage';

export const App = () => {
  const { t, i18n } = useTranslation();

  i18n.changeLanguage('ru');

  return (
    <Routes>
      <Route path='/' element={<CategoryPage />} />
      <Route path='/account' element={<AccountPage />} />
      <Route path='*' element={<h1>{t('Page Not Found')}</h1>} />
    </Routes>
  );
};
