import Drawer from '@mui/material/Drawer';
import { createTheme, ThemeProvider } from '@mui/material';
import { memo, PropsWithChildren } from 'react';

export type Anchor = 'top' | 'left' | 'bottom' | 'right';

export interface IState {
  top: boolean;
  left: boolean;
  bottom: boolean;
  right: boolean;
}

interface TemporaryDrawerProps {
  state: IState;
  anchor: Anchor;
  type: string;
  drawerHandler: (type: string, anchor: Anchor) => void;
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

export const TemporaryDrawer = memo(
  ({ state, anchor, children, type, drawerHandler }: PropsWithChildren<TemporaryDrawerProps>) => {
    return (
      <ThemeProvider theme={theme}>
        <Drawer anchor={anchor} open={state[anchor]} onClose={() => drawerHandler(type, anchor)}>
          {children}
        </Drawer>
      </ThemeProvider>
    );
  },
);
