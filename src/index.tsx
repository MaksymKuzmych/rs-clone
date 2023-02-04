import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './components/App';
import './i18n';

import './index.scss';
import { readDataOnce, writeData } from './utils/firebase';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </BrowserRouter>,
);
writeData(1, ['Anna', 'Marina', 'Katya'], 23);
readDataOnce();
