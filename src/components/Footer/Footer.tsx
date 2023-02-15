import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import styles from './Footer.module.scss';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <nav className={styles.bar}>
      <NavLink
        className={({ isActive }) => {
          return isActive ? styles.activeItem : styles.item;
        }}
        to='/accounts'
      >
        <span className='material-icons'>credit_card</span>
        <p className={styles.text}>{t('Accounts')}</p>
      </NavLink>
      <NavLink
        className={({ isActive }) => {
          return isActive ? styles.activeItem : styles.item;
        }}
        to='/'
      >
        <span className='material-icons'>data_usage</span>
        <p className={styles.text}>{t('Categories')}</p>
      </NavLink>
      <NavLink
        className={({ isActive }) => {
          return isActive ? styles.activeItem : styles.item;
        }}
        to='/transactions'
      >
        <span className='material-icons'>receipt</span>
        <p className={styles.text}>{t('Transactions')}</p>
      </NavLink>
    </nav>
  );
};
