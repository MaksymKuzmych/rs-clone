import { useCallback, useState } from 'react';

import { Anchor } from '../types';

export const useDrawer = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = useCallback(
    (anchor: Anchor, open: boolean) => {
      setState({ ...state, [anchor]: open });
    },
    [state],
  );

  return { state, toggleDrawer };
};
