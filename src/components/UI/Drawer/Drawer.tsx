import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { createTheme, ThemeProvider } from '@mui/material';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface TemporaryDrawerProps {
  btn: React.ReactNode;
  anchor: Anchor;
  children: React.ReactNode;
}

const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});

export const TemporaryDrawer = ({ btn, anchor, children }: TemporaryDrawerProps) => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => () => {
    setState({ ...state, [anchor]: open });
  };

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment key={anchor}>
        <div onClick={toggleDrawer(anchor, true)}>{btn}</div>
        <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
          {children}
        </Drawer>
      </React.Fragment>
    </ThemeProvider>
  );
};
