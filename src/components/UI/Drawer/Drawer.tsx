import Drawer from '@mui/material/Drawer';
import { memo, PropsWithChildren, useContext } from 'react';
import { OverlayContext } from '../../../context/Overlay';

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
    const { overlay } = useContext(OverlayContext);

    return (
      <div className={overlay ? `overlayOpenPending overlay` : `overlay`}>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={() => drawerHandler(type, anchor, false)}
        >
          {children}
        </Drawer>
      </div>
    );
  },
);
