import { createContext, memo, PropsWithChildren, useCallback, useState } from 'react';

interface IOverlay {
  overlay: boolean;
  setNewValue(value: boolean): void;
}

export const OverlayContext = createContext<IOverlay>({
  overlay: false,
  setNewValue: () => {},
});

export const OverlayProvider = memo(({ children }: PropsWithChildren) => {
  const [overlay, setOverlay] = useState(false);
  const setNewValue = useCallback((value: boolean) => {
    setOverlay(value);
  }, []);

  return (
    <OverlayContext.Provider value={{ overlay, setNewValue }}>{children}</OverlayContext.Provider>
  );
});
