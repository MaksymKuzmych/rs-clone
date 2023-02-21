import { useCallback, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { NavBar } from '../NavBar/NavBar';
import FilterBlock from './Filter/FilterBlock';
import RangePeriod from './Range/RangePeriod';

import styles from './Header.module.scss';
import { OutlinedInputProps, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

export function Header() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const handleDrawerOpen = useCallback(() => setOpen(true), []);
  const handleDrawerClose = useCallback(() => setOpen(false), []);

  const location = window.location.pathname;

  const [openSearch, setOpenSearch] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const changeInputValue = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  return (
    <div>
      <AppBar
        position='static'
        sx={{
          backgroundColor: '#5c6ac2',
        }}
      >
        <Toolbar>
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
              <button>
                <span className={`material-icons ${styles.iconButtonCheck}`}>check</span>
              </button>
            </div>
          </div>
          {location === '/transactions' ? (
            <div className={styles.search}>
              <button onClick={() => setOpenSearch(!openSearch)}>
                <span className={`material-icons ${styles.iconButtonSearch}`}>search</span>
              </button>
            </div>
          ) : (
            <span className={`material-icons ${styles.iconButton}`}></span>
          )}
        </Toolbar>
        {location === '/accounts' ? (
          <div className={styles.headerBottom}>Accounts</div>
        ) : (
          <RangePeriod />
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
    </div>
  );
}
