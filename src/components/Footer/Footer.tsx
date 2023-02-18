import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../Auth/Auth';
import { Theme, ThemeColor } from '../../enums';

import styles from './Footer.module.scss';

export const Footer = () => {
  const { userData } = useContext(AuthContext);

  const { t } = useTranslation();

  return (
    <nav
      className={styles.bar}
      style={{
        backgroundColor:
          userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
      }}
    >
      <NavLink
        className={({ isActive }) => {
          return isActive ? styles.activeItem : styles.item;
        }}
        style={({ isActive }) => ({
          color:
            isActive && userData.settings.theme === Theme.Light
              ? ThemeColor.Dark
              : isActive && userData.settings.theme === 'Dark'
              ? ThemeColor.Light
              : '#7f7f7f',
        })}
        to='/accounts'
      >
        <span className='material-icons'>credit_card</span>
        <p className={styles.text}>{t('Accounts')}</p>
      </NavLink>
      <NavLink
        className={({ isActive }) => {
          return isActive ? styles.activeItem : styles.item;
        }}
        style={({ isActive }) => ({
          color:
            isActive && userData.settings.theme === Theme.Light
              ? ThemeColor.Dark
              : isActive && userData.settings.theme === 'Dark'
              ? ThemeColor.Light
              : '#7f7f7f',
        })}
        to='/'
      >
        <span className='material-icons'>data_usage</span>
        <p className={styles.text}>{t('Categories')}</p>
      </NavLink>
      <NavLink
        className={({ isActive }) => {
          return isActive ? styles.activeItem : styles.item;
        }}
        style={({ isActive }) => ({
          color:
            isActive && userData.settings.theme === Theme.Light
              ? ThemeColor.Dark
              : isActive && userData.settings.theme === 'Dark'
              ? ThemeColor.Light
              : '#7f7f7f',
        })}
        to='/transactions'
      >
        <span className='material-icons'>receipt</span>
        <p className={styles.text}>{t('Transactions')}</p>
      </NavLink>
    </nav>
  );
};
