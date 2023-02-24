import { createContext, memo, PropsWithChildren, useState } from 'react';
import { TransactionType } from '../enums';

interface ISearchContext {
  categoryLocation: TransactionType;
  setNewValue(value: TransactionType): void;
}

export const CategoryLocationContext = createContext<ISearchContext>({
  categoryLocation: TransactionType.Expenses,
  setNewValue: () => {},
});

export const CategoryLocationProvider = memo(({ children }: PropsWithChildren) => {
  const [categoryLocation, setCategoryLocation] = useState(TransactionType.Expenses);
  const setNewValue = (value: TransactionType) => {
    setCategoryLocation(value);
  };

  return (
    <CategoryLocationContext.Provider value={{ categoryLocation, setNewValue }}>
      {children}
    </CategoryLocationContext.Provider>
  );
});
