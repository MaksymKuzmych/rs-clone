import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import '@fontsource/roboto';

import { App } from './components/App/App';
import './i18n';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <SnackbarProvider maxSnack={4}>
      <App />
    </SnackbarProvider>
  </BrowserRouter>,
);
