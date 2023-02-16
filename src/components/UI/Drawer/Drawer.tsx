import Drawer from '@mui/material/Drawer';
import { memo, PropsWithChildren } from 'react';

import { IDrawerSide } from '../../../interfaces';
import { Anchor } from '../../../types';

interface TemporaryDrawerProps {
  state: IDrawerSide;
  anchor: Anchor;
  type: string;
  drawerHandler: (type: string, anchor: Anchor, open: boolean) => void;
}

export const TemporaryDrawer = memo(
  ({ state, anchor, children, type, drawerHandler }: PropsWithChildren<TemporaryDrawerProps>) => {
    return (
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={() => drawerHandler(type, anchor, false)}
      >
        {children}
      </Drawer>
    );
  },
);
