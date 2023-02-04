import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './components/App';
import { Period } from './enums';
import './i18n';

import './index.scss';
import { setUserSettings } from './utils/firebase';
import { getPeriod } from './utils/get-period';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </BrowserRouter>,
);
setUserSettings(1, {
  periodType: Period.Range,
  period: getPeriod(Period.Range, new Date(2023, 1, 1).getTime(), Date.now()),
});
