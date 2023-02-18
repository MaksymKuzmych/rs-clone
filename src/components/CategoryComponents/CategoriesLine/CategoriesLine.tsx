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
  callbackTransferCategory(category: ICategory): void;
}

export const CategoriesLine = memo(
  ({ dataCategories, start, end, classLine, callbackTransferCategory }: CategoriesLineProps) => {
    const { userData } = useContext(AuthContext);

    const transactions = userData.transactions;

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
              callbackTransferCategory={callbackTransferCategory}
            />
          )),
      [dataCategories, start, end, callbackTransferCategory, transactions],
    );

    return <div className={styles[`${classLine}`]}>{memoList}</div>;
  },
);
