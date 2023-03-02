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
import { CategoryLocationProvider } from '../../context/CategoryLocation';

export const App = () => {
  return (
    <CategoryLocationProvider>
      <OverlayProvider>
        <DrawerProvider>
          <AuthProvider>
            <SearchProvider>
              <Header />
              <main className='main'>
                <Routes>
                  <Route path='/' element={<CategoryPage />} />
                  <Route path='/accounts' element={<AccountPage />} />
                  <Route path='/transactions' element={<TransactionPage />} />
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </SearchProvider>
          </AuthProvider>
        </DrawerProvider>
      </OverlayProvider>
    </CategoryLocationProvider>
  );
};
