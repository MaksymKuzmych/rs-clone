import { useCallback, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { NavBar } from '../NavBar/NavBar';
import FilterBlock from './Filter/FilterBlock';
import RangePeriod from './Range/RangePeriod';

import styles from './Header.module.scss';

export function Header() {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = useCallback(() => setOpen(true), []);
  const handleDrawerClose = useCallback(() => setOpen(false), []);

  const location = window.location.pathname;

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
            <FilterBlock />
          </div>
          {location === '/transactions' ? (
            <div className={styles.search}>
              <span className={`material-icons ${styles.iconButton}`}>search</span>
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
