import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

export const Footer = () => {
  const { t } = useTranslation();

  const [page, setPage] = useState(window.location.pathname);

  const changePage = (pageName: string) => {
    setPage(pageName);
  };

  return (
    <nav className={styles.bar}>
      <Link
        className={styles.item}
        to='/accounts'
        onClick={() => changePage('/accounts')}
        style={{ color: page === '/accounts' ? 'white' : 'gray' }}
      >
        <span className='material-icons'>credit_card</span>
        {page === '/accounts' && <p className={styles.text}>{t('Accounts')}</p>}
      </Link>
      <Link
        className={styles.item}
        to='/'
        onClick={() => changePage('/')}
        style={{ color: page === '/' ? 'white' : 'gray' }}
      >
        <span className='material-icons'>data_usage</span>
        {page === '/' && <p className={styles.text}>{t('Categories')}</p>}
      </Link>
      <Link
        className={styles.item}
        to='/transactions'
        onClick={() => changePage('/transactions')}
        style={{ color: page === '/transactions' ? 'white' : 'gray' }}
      >
        <span className='material-icons'>receipt</span>
        {page === '/transactions' && <p className={styles.text}>{t('Transactions')}</p>}
      </Link>
    </nav>
  );
};
