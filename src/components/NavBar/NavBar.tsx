import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material';

import { Lang, Currency, Theme, ThemeColor } from '../../enums';
import { NavItem } from './NavItem/NavItem';
import { NavLinkItem } from './NavLinkItem/NavLinkItem';
import { DeleteButton } from './DeleteButton/DeleteButton';
import { AuthContext } from '../../Auth/Auth';

import styles from './NavBar.module.scss';

export const NavBar = () => {
  const { userData } = useContext(AuthContext);

  const { t } = useTranslation();

  const theme = createTheme({
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
            backgroundColor:
              userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
            borderRadius: '5px',
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color:
              userData.settings.theme === Theme.Light
                ? `${ThemeColor.Dark}`
                : `${ThemeColor.Light}`,
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <nav
        className={styles.wrapper}
        style={{
          backgroundColor:
            userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
          color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
        }}
      >
        <div className={styles.navHeader}>
          <div className={styles.userInfo}>
            <div className={styles.userAva}>
              <span className='material-icons' style={{ color: 'black' }}>
                face
              </span>
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
            <NavItem icon={'palette'} name={'Theme'} enumData={Object.keys(Theme)} />
            <Divider />
            <NavItem
              icon={'currency_exchange'}
              name={'Currency'}
              enumData={Object.keys(Currency)}
            />
            <Divider />
            <div className={styles.subtitle}>{t('Data')}</div>
            <DeleteButton />
            <Divider />
            <div className={styles.subtitle}>{t('About')}</div>
            <NavLinkItem path={'https://github.com/maksymkuzmych'} name={'Maksym Kuzmych'} />
            <NavLinkItem path={'https://github.com/vladyka-nazarii'} name={'Nazarii Vladyka'} />
            <NavLinkItem path={'https://github.com/Julia-yes'} name={'Julia Bolonikova'} />
            <div className={styles.linkWrapper}>
              <NavLink to='https://rs.school'>
                <ListItem
                  className={styles.logoWrapper}
                  sx={{
                    justifyContent: 'center',
                  }}
                >
                  {userData.settings.theme === Theme.Light ? (
                    <img
                      className={styles.RssLogo}
                      src='./assets/rsLogoLight.svg'
                      alt='RSSchool logo'
                    />
                  ) : (
                    <img
                      className={styles.RssLogo}
                      src='./assets/rsLogoDark.svg'
                      alt='RSSchool logo'
                    />
                  )}
                </ListItem>
              </NavLink>
            </div>
          </List>
        </div>
      </nav>
    </ThemeProvider>
  );
};
