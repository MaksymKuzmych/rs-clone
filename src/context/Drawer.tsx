import { createContext, memo, PropsWithChildren, useCallback, useState } from 'react';

import { Anchor } from '../types';

export const DrawerContext = createContext({
  state: {
    top: false,
    left: false,
    bottom: false,
    right: false,
  },
  typeDrawer: '',
  drawerHandler: (type: string, anchor: Anchor, open: boolean) => {},
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
