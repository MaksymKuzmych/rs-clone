import { useCallback, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material';

import { NavBar } from '../NavBar/NavBar';

import styles from './Header.module.scss';

const theme = createTheme({
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

export function Header() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = useCallback(() => setOpen(true), []);
  const handleDrawerClose = useCallback(() => setOpen(false), []);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu' onClick={handleDrawerOpen}>
            <span className='material-icons'>menu</span>
          </IconButton>
          <Typography
            variant='h6'
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
            <span className='material-icons'>edit</span>
          </Button>
        </Toolbar>
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
    </ThemeProvider>
  );
}
