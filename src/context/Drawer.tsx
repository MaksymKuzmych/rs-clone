import { createContext, memo, PropsWithChildren, useCallback, useState } from 'react';

import { IDrawerSide } from '../interfaces';
import { Anchor } from '../types';

interface IDrawerContext {
  state: IDrawerSide;
  typeDrawer: string;
  drawerHandler: (type: string, anchor: Anchor, open: boolean) => void;
}

export const DrawerContext = createContext<IDrawerContext>({
  state: {
    top: false,
    left: false,
    bottom: false,
    right: false,
  },
  typeDrawer: '',
  drawerHandler: () => {},
});

export const DrawerProvider = memo(({ children }: PropsWithChildren) => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [typeDrawer, setTypeDrawer] = useState('');

  const drawerHandler = useCallback(
    (type: string, anchor: Anchor, open: boolean) => {
      setTypeDrawer(type);
      setState({ ...state, [anchor]: open });
    },
    [state],
  );

  return (
    <DrawerContext.Provider value={{ state, typeDrawer, drawerHandler }}>
      {children}
    </DrawerContext.Provider>
  );
});
