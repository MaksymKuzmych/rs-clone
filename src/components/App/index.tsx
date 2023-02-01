import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  const { t, i18n } = useTranslation();

  i18n.changeLanguage('ru');

  return (
    <Routes>
      <Route path='/' element={<h1>{t('Start Page')}</h1>} />
      <Route path='*' element={<h1>{t('Page Not Found')}</h1>} />
    </Routes>
  );
};
