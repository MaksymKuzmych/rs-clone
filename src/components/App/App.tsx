import { Route, Routes } from 'react-router-dom';

import { Header } from '../Header/Header';
import { AccountPage } from '../../pages/AccountPage/AccountPage';
import { Footer } from '../Footer/Footer';
import { NotFound } from '../NotFound/NotFound';
import { AuthProvider } from '../../Auth/Auth';
import { DrawerProvider } from '../../context/Drawer';
import { CategoryPage } from '../../pages/CategoryPage/CategoryPage';
import { TransactionPage } from '../../pages/TransactionPage/TransactionPage';
import { SearchProvider } from '../../context/Search';
import { OverlayProvider } from '../../context/Overlay';

export const App = () => {
  return (
    <OverlayProvider>
      <DrawerProvider>
        <AuthProvider>
          <SearchProvider>
            <Header />
            <div className='main'>
              <Routes>
                <Route path='/' element={<CategoryPage />} />
                <Route path='/accounts' element={<AccountPage />} />
                <Route path='/transactions' element={<TransactionPage />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </SearchProvider>
        </AuthProvider>
      </DrawerProvider>
    </OverlayProvider>
  );
};
