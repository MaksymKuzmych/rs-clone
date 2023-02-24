import { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ICategory } from '../../../interfaces';
import { defaultNames } from '../../../data/defaultNames';
import { AuthContext } from '../../../Auth/Auth';
import { Theme, ThemeColor } from '../../../enums';

import styles from './Category.module.scss';

interface CategoryProps {
  dataCategory: ICategory;
  sum: number;
  callback: (category: ICategory | null) => void;
  addCategory?: () => void;
  activeCategory?: string;
}

export const Category = memo(
  ({ dataCategory, sum, callback, addCategory, activeCategory }: CategoryProps) => {
    const { id, name, icon, color } = dataCategory;
    const { userData, setCurrency } = useContext(AuthContext);
    const { t } = useTranslation();

    const buttonAdd = id === '0';

    return (
      <div
        className={
          activeCategory === id ? `${styles.wrapper} ${styles.wrapperActive}` : styles.wrapper
        }
        onClick={() => (buttonAdd && addCategory ? addCategory() : callback(dataCategory))}
      >
        <div className={sum === 0 ? `${styles.category} ${styles.categoryEmpty}` : styles.category}>
          {!buttonAdd ? (
            <h3
              className={styles.title}
              style={{
                color:
                  activeCategory === id
                    ? '#5c6ac2 '
                    : userData.settings.theme === Theme.Light
                    ? ThemeColor.Dark
                    : ThemeColor.Light,
              }}
            >
              {defaultNames.includes(name) ? t(name) : name}
            </h3>
          ) : null}
          <div
            className={!buttonAdd ? styles.img : styles.buttonAdd}
            style={{ backgroundColor: color }}
          >
            <span className={!buttonAdd ? `material-icons` : `material-icons ${styles.add}`}>
              {icon}
            </span>
          </div>
          {!buttonAdd ? (
            <div className={styles.sum} style={{ color: sum > 0 ? color : '#7f7f7f' }}>
              {setCurrency(sum, 'never')}
            </div>
          ) : null}
        </div>
      </div>
    );
  },
);
