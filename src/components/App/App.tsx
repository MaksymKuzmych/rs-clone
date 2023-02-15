import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import { Header } from '../Header/Header';
import { AccountPage } from '../../pages/AccountPage/AccountPage';
import { Footer } from '../Footer/Footer';
import { NotFound } from '../NotFound/NotFound';
import { AuthProvider } from '../../Auth/Auth';
import { DrawerProvider } from '../../context/Drawer';
import { CategoryPage } from '../../pages/CategoryPage/CategoryPage';
import { theme } from '../../styles/theme';

export const App = () => {
  return (
    <DrawerProvider>
      <Header />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<CategoryPage />} />
            <Route path='/accounts' element={<AccountPage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </AuthProvider>
        <Footer />
      </ThemeProvider>
    </DrawerProvider>
  );
};
