import { Route, Routes } from 'react-router-dom';

import { Header } from '../Header/Header';
import { AccountPage } from '../../pages/AccountPage/AccountPage';
import { Footer } from '../Footer/Footer';
import { NotFound } from '../NotFound/NotFound';
import { AuthProvider } from '../../Auth/Auth';
import { CategoryPage } from '../../pages/CategoryPage/CategoryPage';
import { TransactionPage } from '../../pages/TransactionPage/TransactionPage';

export const App = () => {
  return (
    <>
      <Header />
      <AuthProvider>
        <Routes>
          <Route path='/' element={<CategoryPage />} />
          <Route path='/accounts' element={<AccountPage />} />
          <Route path='/transactions' element={<TransactionPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
      <Footer />
    </>
  );
};
