import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import { NavBar } from '../NavBar/NavBar';

import styles from './Header.module.scss';
import FilterBlock from './Filter/FilterBlock';
import { AuthContext, AuthProvider } from '../../Auth/Auth';

export function Header() {
  const [open, setOpen] = useState(false);

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
          <IconButton edge='start' color='inherit' aria-label='menu' onClick={handleDrawerOpen}>
            <span className='material-icons'>menu</span>
          </IconButton>
          <div className={styles.filter}>
            <AuthProvider>
              <FilterBlock />
            </AuthProvider>
          </div>
          <Button
            sx={{
              color: 'white',
            }}
          >
            <span className='material-icons'>search</span>
          </Button>
        </Toolbar>
        <div className={styles.headerBottom}>Accounts</div>
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
