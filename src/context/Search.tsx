import { createContext, memo, PropsWithChildren, useCallback, useState } from 'react';

interface ISearchContext {
  searchValue: string;
  setNewValue(value: string): void;
}

export const SearchContext = createContext<ISearchContext>({
  searchValue: '',
  setNewValue: () => {},
});

export const SearchProvider = memo(({ children }: PropsWithChildren) => {
  const [searchValue, setSearchValue] = useState('');

  const setNewValue = useCallback((value: string) => setSearchValue(value), []);

  return (
    <SearchContext.Provider value={{ searchValue, setNewValue }}>{children}</SearchContext.Provider>
  );
});
