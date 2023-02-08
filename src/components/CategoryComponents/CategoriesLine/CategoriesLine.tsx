import { memo } from 'react';

import { Category } from '../Category/Category';

import { ICategory } from '../../../interfaces';
import { storeTr } from '../../../mockData/transactions';

import styles from '../../pages/CategoryPage/CategoryPage.module.scss';

interface CategoriesLineProps {
  dataCategories: ICategory[];
  start: number;
  end: number;
  currencySymbol: string;
  classLine: string;
}

export const CategoriesLine = memo(
  ({ dataCategories, start, end, currencySymbol, classLine }: CategoriesLineProps) => {
    return (
      <div className={styles[`${classLine}`]}>
        {dataCategories
          .filter((item, index) => index >= start && index < end)
          .map((category) => (
            <Category
              dataCategory={category}
              key={category.id}
              sum={storeTr.data.transactions
                .filter((item) => item.category === category.id)
                .reduce((sum, current) => sum + current.amount, 0)}
              currencySymbol={currencySymbol}
            />
          ))}
      </div>
    );
  },
);
