import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { createTheme, ThemeProvider } from '@mui/material';

export type Anchor = 'top' | 'left' | 'bottom' | 'right';

export interface IState {
  top: boolean;
  left: boolean;
  bottom: boolean;
  right: boolean;
}

interface TemporaryDrawerProps {
  state: IState;
  // eslint-disable-next-line @typescript-eslint/ban-types
  toggleDrawer: Function;
  anchor: Anchor;
  onClick: () => void;
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

export const TemporaryDrawer = ({
  state,
  anchor,
  children,
  onClick,
}: React.PropsWithChildren<TemporaryDrawerProps>) => {
  return (
    <ThemeProvider theme={theme}>
      <Drawer anchor={anchor} open={state[anchor]} onClose={onClick}>
        {children}
      </Drawer>
    </ThemeProvider>
  );
};
