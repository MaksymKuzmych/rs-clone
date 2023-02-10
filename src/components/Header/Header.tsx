import { useState } from 'react';
import SwipeableDrawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { NavBar } from '../NavBar/NavBar';

import styles from './Header.module.scss';

export function Header() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={styles.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={handleDrawerOpen}
          >
            <span className='material-icons'>menu</span>
          </IconButton>
          <Typography
            variant='h6'
            className={styles.title}
            sx={{
              flexGrow: 1,
            }}
          >
            News
          </Typography>
          <Button
            sx={{
              color: 'white',
            }}
          >
            <span className={`material-icons ${styles.edit}`}>edit</span>
          </Button>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        className={styles.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        sx={{
          width: 240,
          flexShrink: 0,
        }}
      >
        <NavBar />
      </SwipeableDrawer>
      {open ? <div className={styles.overlay} onClick={handleDrawerClose}></div> : null}
    </div>
  );
}
