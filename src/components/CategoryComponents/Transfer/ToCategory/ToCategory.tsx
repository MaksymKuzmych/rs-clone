import { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../../Auth/Auth';
import { Theme, ThemeColor } from '../../../../enums';
import { ICategory } from '../../../../interfaces';
import { Category } from '../../Category/Category';

import styles from './ToCategory.module.scss';

interface ToCategoryProps {
  changeCategory: (category: ICategory | null) => void;
  activeCategory: string;
}

export const ToCategory = memo(({ changeCategory, activeCategory }: ToCategoryProps) => {
  const { userData } = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalTitle}>{t('Expense')}</div>
      <div
        className={styles.wrapper}
        style={{
          color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
        }}
      >
        {userData.data.categories.length !== 0 &&
          userData.data.categories.map((category) => (
            <Category
              dataCategory={category}
              key={category.id}
              sum={Object.values(userData.data.transactions)
                .filter((item) => item.category === category.id)
                .reduce((sum, current) => sum + current.amount, 0)}
              callback={changeCategory}
              activeCategory={activeCategory}
            />
          ))}
      </div>
    </div>
  );
});
