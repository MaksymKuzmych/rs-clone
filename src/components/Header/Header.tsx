import { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { NavBar } from '../NavBar/NavBar';

import styles from './Header.module.scss';
import FilterBlock from './Filter/FilterBlock';
import { AuthContext, AuthProvider } from '../../Auth/Auth';
import { LocalConvenienceStoreOutlined } from '@mui/icons-material';
import RangePeriod from './Range/RangePeriod';
import { iconsCalendar } from '../../data/icons';

export function Header() {
  const [open, setOpen] = useState(false);

  const [location, setLocation] = useState(window.location.pathname);

  // const changePage = (pageName: string) => {
  //   setLocation(pageName);
  // };

  // useEffect(() => {
  //   console.log('111');
  // }, [location]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
            <AuthProvider>
              <FilterBlock />
            </AuthProvider>
          </div>
          {location === '/transactions' ? (
            <span className={`material-icons ${styles.iconButton}`}>search</span>
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
