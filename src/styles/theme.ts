import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
  },
  components: {
    MuiInput: {
      styleOverrides: {
        underline: {
          color: '#fff',
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
