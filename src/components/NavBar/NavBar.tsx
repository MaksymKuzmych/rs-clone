import { useCallback, useContext, useState } from 'react';
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
import { BasicModal } from '../UI/Modal/Modal';
import { SignIn } from './SignIn/SignIn';
import { SignUp } from './SignUp/SignUp';

import styles from './NavBar.module.scss';
import { auth } from '../../firebase/firebase-config';
import { signOutUser } from '../../firebase/sign-out-user';

export const NavBar = () => {
  const { userData } = useContext(AuthContext);

  const [openModal, setOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState('');

  const handleOpen = useCallback(() => setOpenModal(true), []);
  const handleClose = useCallback(() => setOpenModal(false), []);

  const handleTypeModal = (type: string) => {
    setTypeModal(type);
  };

  const { t } = useTranslation();

  const modalContent = useCallback(() => {
    switch (typeModal) {
      case 'signIn':
        return <SignIn handleTypeModal={handleTypeModal} />;
      case 'signUp':
        return <SignUp handleTypeModal={handleTypeModal} />;
    }
  }, [typeModal]);

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
              onClick={() => {
                if (auth.currentUser?.isAnonymous) {
                  setTypeModal('signIn');
                  handleOpen();
                } else {
                  signOutUser();
                }
              }}
            >
              {auth.currentUser?.isAnonymous ? t('Log In') : t('Log Out')}
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
      <BasicModal openModal={openModal} handleClose={handleClose}>
        {modalContent()}
      </BasicModal>
    </ThemeProvider>
  );
};
