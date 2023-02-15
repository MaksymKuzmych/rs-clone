import { memo, useContext, useMemo } from 'react';

import { AuthContext } from '../../../Auth/Auth';
import { Category } from '../Category/Category';
import { ICategory } from '../../../interfaces';
import { Anchor } from '../../../types';

import styles from '../../../pages/CategoryPage/CategoryPage.module.scss';

interface CategoriesLineProps {
  dataCategories: ICategory[];
  start: number;
  end: number;
  currencySymbol: string;
  classLine: string;
  callbackOpenModal(type: string, anchor: Anchor): void;
  callbackTransferCategory(category: ICategory): void;
}

export const CategoriesLine = memo(
  ({
    dataCategories,
    start,
    end,
    currencySymbol,
    classLine,
    callbackOpenModal,
    callbackTransferCategory,
  }: CategoriesLineProps) => {
    const { userData } = useContext(AuthContext);
    const transactions = userData.data.transactions;

    const memoList = useMemo(
      () =>
        dataCategories
          .filter((item, index) => index >= start && index < end)
          .map((category) => {
            return (
              <Category
                dataCategory={category}
                key={category.id}
                sum={Object.values(transactions)
                  .filter((item) => item.category === category.id)
                  .reduce((sum, current) => sum + current.amount, 0)}
                currencySymbol={currencySymbol}
                callbackOpenModal={callbackOpenModal}
                callbackTransferCategory={callbackTransferCategory}
              />
            );
          }),
      [
        dataCategories,
        start,
        end,
        currencySymbol,
        callbackOpenModal,
        callbackTransferCategory,
        transactions,
      ],
    );

    return <div className={styles[`${classLine}`]}>{memoList}</div>;
  },
);
