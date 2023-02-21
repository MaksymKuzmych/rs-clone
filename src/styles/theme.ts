import { createTheme } from '@mui/material';
import { Theme } from '../enums';

export const theme = (theme: Theme) =>
  createTheme({
    palette: {
      primary: {
        main: theme === Theme.Light ? '#000' : '#fff',
      },
    },
    components: {
      MuiInput: {
        styleOverrides: {
          underline: {
            color: theme === Theme.Light ? '#000' : '#fff',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontSize: '22px',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            marginBottom: '5px',
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#a8adb3',
            fontSize: '23px',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: 'transparent',
          },
        },
      },
    },
  });
