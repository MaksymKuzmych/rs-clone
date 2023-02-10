import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import { Lang, Currency, Mode } from '../../enums';

import { NavItem } from './NavItem/NavItem';
import { NavLinkItem } from './NavLinkItem/NavLinkItem';
import { DeleteButton } from './DeleteButton/DeleteButton';

import RSS from '../../assets/rsLogo.svg';

import styles from './NavBar.module.scss';

export const NavBar = () => {
  const { t } = useTranslation();

  return (
    <nav className={styles.navWrapper}>
      <div className={styles.navHeader}>
        <div className={styles.userInfo}>
          <div className={styles.userAva}>
            <span className='material-icons'>face</span>
          </div>
          <div className={styles.userName}>{t('User Name')}</div>
        </div>
        <div className={styles.buttons}>
          <Button
            className={styles.button}
            startIcon={<span className='material-icons'>login</span>}
          >
            {t('Log In')}
          </Button>
        </div>
      </div>
      <div className={styles.menu}>
        <List component='nav' aria-label='burgerMenu'>
          <div className={styles.subtitle}>{t('Settings')}</div>
          <NavItem icon={'language'} name={'Language'} enumData={Object.keys(Lang)} />
          <Divider />
          <NavItem icon={'palette'} name={'Mode'} enumData={Object.keys(Mode)} />
          <Divider />
          <NavItem icon={'currency_exchange'} name={'Currency'} enumData={Object.keys(Currency)} />
          <Divider />
          <div className={styles.subtitle}>{t('Data')}</div>
          <DeleteButton />
          <Divider />
          <div className={styles.subtitle}>{t('About')}</div>
          <NavLinkItem path={'https://github.com/maksymkuzmych'} name={'Maksym Kuzmych'} />
          <NavLinkItem path={'https://github.com/vladyka-nazarii'} name={'Nazarii Vladyka'} />
          <NavLinkItem path={'https://github.com/Julia-yes'} name={'Julia Bolonikova'} />
          <NavLink to='https://rs.school'>
            <ListItem
              className={styles.linkWrapper}
              sx={{
                justifyContent: 'center',
              }}
            >
              <img className={styles.RssLogo} src={RSS} alt='RSSchool logo' />
            </ListItem>
          </NavLink>
        </List>
      </div>
    </nav>
  );
};
