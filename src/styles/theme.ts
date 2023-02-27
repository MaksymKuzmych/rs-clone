import { createTheme } from '@mui/material';

import { Theme, ThemeColor } from '../enums';

export const theme = (theme: Theme) =>
  createTheme({
    palette: {
      primary: {
        main: theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
      },
    },
    components: {
      MuiIconButton: {
        styleOverrides: {
          sizeMedium: {
            color: theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          underline: {
            color: theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontSize: '22px',
            color: theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
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
      MuiPaper: {
        styleOverrides: {
          root: {
            '& .MuiCalendarPicker-root': {
              backgroundColor: theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
              color: theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            '&.MuiDayPicker-weekDayLabel': {
              color: theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
            },
          },
        },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            '&.MuiPickersCalendarHeader-switchViewButton': {
              color: theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
            },
            '&.MuiPickersCalendarHeader-switchViewButton:hover': {
              backgroundColor: 'transparent',
            },
            '&.MuiPickersArrowSwitcher-button': {
              color: theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
            },
            '&.MuiPickersArrowSwitcher-button:hover': {
              backgroundColor:
                theme === Theme.Light ? `${ThemeColor.Dark}10` : `${ThemeColor.Light}10`,
            },
            '&.MuiPickersDay-root': {
              color: theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
              backgroundColor: theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
            },
            '&.MuiPickersDay-root:hover': {
              backgroundColor:
                theme === Theme.Light ? `${ThemeColor.Dark}10` : `${ThemeColor.Light}10`,
            },
            '&.MuiPickersDay-root:selected': {
              backgroundColor: theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
            },
          },
        },
      },
    },
  });
