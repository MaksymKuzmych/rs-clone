import { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  createTheme,
  ThemeProvider,
  Drawer,
  AppBar,
  Toolbar,
  OutlinedInputProps,
  TextField,
} from '@mui/material';

import { NavBar } from '../NavBar/NavBar';
import { FilterBlock } from './Filter/FilterBlock';
import { RangePeriod } from './Range/RangePeriod';
import { SearchContext } from '../../context/Search';
import { theme } from '../../styles/theme';
import { AuthContext } from '../../Auth/Auth';
import { Theme, ThemeColor } from '../../enums';
import { OverlayContext } from '../../context/Overlay';

import styles from './Header.module.scss';

export const themePaper = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});

export const Header = () => {
  const { t } = useTranslation();

  const { setNewValue } = useContext(SearchContext);
  const { userData } = useContext(AuthContext);
  const { overlay } = useContext(OverlayContext);

  const location = useLocation();

  const [activePage, setActivePage] = useState(location.pathname);
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  const handleDrawerOpen = useCallback(() => setOpen(true), []);
  const handleDrawerClose = useCallback(() => setOpen(false), []);

  const closeSearch = useCallback(() => {
    if (openSearch) {
      setInputValue('');
    }
    setOpenSearch(!openSearch);
  }, [openSearch]);

  const changeInputValue = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setNewValue(event.currentTarget.value);
      setInputValue(event.currentTarget.value);
    },
    [setNewValue],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (openSearch) {
        if (e.code === 'Escape') {
          closeSearch();
          setNewValue('');
        }
        if (e.code === 'Enter') {
          closeSearch();
        }
      }
    },
    [closeSearch, openSearch, setNewValue],
  );

  return (
    <div>
      <ThemeProvider theme={themePaper}>
        <AppBar
          position='static'
          sx={{
            backgroundColor: '#5c6ac2',
            minHeight: '100px',
          }}
          onKeyDown={(e) => onKeyDown(e)}
        >
          <div className={styles.filterWrapper}>
            <Toolbar sx={{ minHeight: '60px' }}>
              <span className={`material-icons ${styles.iconButton}`} onClick={handleDrawerOpen}>
                menu
              </span>
              <div className={styles.filter}>
                <FilterBlock openSearch={openSearch} />
                <div className={openSearch ? styles.inputVisible : styles.input}>
                  <TextField
                    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
                    id='standard-basic'
                    label={t('Search')}
                    value={inputValue}
                    variant='standard'
                    onChange={(event) => {
                      changeInputValue(event);
                    }}
                    autoComplete='off'
                    sx={{
                      backgroundColor:
                        userData.settings.theme === Theme.Light
                          ? ThemeColor.Light
                          : ThemeColor.Dark,
                      color: 'white',
                      width: '100%',
                      padding: '0 5px 5px 10px',
                      input: {
                        fontSize: '22px',
                        color:
                          userData.settings.theme === Theme.Light
                            ? ThemeColor.Dark
                            : ThemeColor.Light,
                      },
                      '& label': {
                        color:
                          userData.settings.theme === Theme.Light
                            ? ThemeColor.Dark
                            : ThemeColor.Light,
                        paddingLeft: '20px',
                        fontSize: '18px',
                      },
                      '& label.Mui-focused': {
                        color: 'gray',
                      },
                    }}
                  />
                </div>
              </div>
              {activePage === '/transactions' ? (
                <div className={styles.search}>
                  <button onClick={() => closeSearch()}>
                    <span className={`material-icons ${styles.iconButtonSearch}`}>search</span>
                  </button>
                </div>
              ) : (
                <span className={`material-icons ${styles.iconButton}`}></span>
              )}
            </Toolbar>
          </div>
          {activePage === '/accounts' ? (
            <div className={styles.headerBottom}>{t('Accounts')}</div>
          ) : (
            <ThemeProvider theme={theme(userData.settings.theme)}>
              <RangePeriod />
            </ThemeProvider>
          )}
        </AppBar>
        <Drawer
          className={styles.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          sx={{
            flexShrink: 0,
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '300px' },
            '& .MuiDrawer-paper::-webkit-scrollbar-track': {
              padding: '2px 0',
              borderRadius: '3px',
              backgroundColor:
                userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
            },
            '& .MuiDrawer-paper::-webkit-scrollbar': {
              borderRadius: '3px',
              width: '5px',
            },
            '& .MuiDrawer-paper::-webkit-scrollbar-thumb': {
              borderRadius: '3px',
              backgroundColor: '#7f7f7f',
            },
          }}
        >
          <NavBar />
        </Drawer>
        <div
          className={
            overlay
              ? `${styles.overlayOpenPending} ${styles.overlay}`
              : !open
              ? styles.overlay
              : `${styles.overlay} ${styles.overlayOpen}`
          }
          onClick={handleDrawerClose}
        ></div>
        <div
          className={
            !openSearch ? styles.overlay : `${styles.overlay} ${styles.overlayOpenTransparent}`
          }
          onClick={closeSearch}
        ></div>
      </ThemeProvider>
    </div>
  );
};
