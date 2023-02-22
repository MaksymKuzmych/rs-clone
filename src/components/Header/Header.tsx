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

import styles from './Header.module.scss';

export const theme = createTheme({
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

export const themeRange = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
      },
    },
  },
});

export const Header = () => {
  const { t } = useTranslation();

  const { setNewValue } = useContext(SearchContext);

  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname);

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  const [open, setOpen] = useState(false);
  const handleDrawerOpen = useCallback(() => setOpen(true), []);
  const handleDrawerClose = useCallback(() => setOpen(false), []);

  const [openSearch, setOpenSearch] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const closeSearch = () => {
    if (openSearch) {
      setInputValue('');
    }
    setOpenSearch(!openSearch);
  };

  const changeInputValue = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setNewValue(event.currentTarget.value);
    setInputValue(event.currentTarget.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (openSearch) {
      if (e.code === 'Escape') {
        closeSearch();
        setNewValue('');
      }
      if (e.code === 'Enter') {
        closeSearch();
      }
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
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
                      backgroundColor: 'white',
                      width: '100%',
                      padding: '0 20px',
                      paddingBottom: '10px',
                      paddingLeft: '10px',
                      '& label': {
                        color: 'gray',
                        paddingLeft: '20px',
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
            <div className={styles.headerBottom}>Accounts</div>
          ) : (
            <ThemeProvider theme={themeRange}>
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
          }}
        >
          <NavBar />
        </Drawer>
        <div
          className={!open ? styles.overlay : `${styles.overlay} ${styles.overlayOpen}`}
          onClick={handleDrawerClose}
        ></div>
        <div
          className={
            !openSearch ? styles.overlay : `${styles.overlay} ${styles.overlayOpenTransparent}`
          }
          onClick={closeSearch}
        ></div>
      </ThemeProvider>
    </>
  );
};
