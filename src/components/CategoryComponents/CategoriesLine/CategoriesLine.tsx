import { memo, useContext, useMemo } from 'react';

import { AuthContext } from '../../../Auth/Auth';
import { Category } from '../Category/Category';
import { ICategory } from '../../../interfaces';

import styles from '../../../pages/CategoryPage/CategoryPage.module.scss';

interface CategoriesLineProps {
  dataCategories: ICategory[];
  start: number;
  end: number;
  classLine: string;
  callback(category: ICategory | null): void;
  addCategory?: () => void;
}

export const CategoriesLine = memo(
  ({ dataCategories, start, end, classLine, addCategory, callback }: CategoriesLineProps) => {
    const { userData } = useContext(AuthContext);

    const transactions = userData.data.transactions;

    const memoList = useMemo(
      () =>
        dataCategories
          .filter((item, index) => index >= start && index < end)
          .map((category) => (
            <Category
              dataCategory={category}
              key={category.id}
              sum={Object.values(transactions)
                .filter((item) => item.category === category.id)
                .reduce((sum, current) => sum + current.amount, 0)}
              callback={callback}
              addCategory={addCategory}
            />
          )),
      [dataCategories, start, end, transactions, addCategory, callback],
    );

    return <div className={styles[`${classLine}`]}>{memoList}</div>;
  },
);
