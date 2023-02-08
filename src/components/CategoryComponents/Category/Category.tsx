import { memo } from 'react';

import { ICategory } from '../../../interfaces';
import { colors } from '../../../data/colors';
import { iconsCategory, iconsProject } from '../../../data/icons';

import styles from './Category.module.scss';

interface CategoryProps {
  dataCategory: ICategory;
  sum: number;
  currencySymbol: string;
}

export const Category = memo(({ dataCategory, sum, currencySymbol }: CategoryProps) => {
  const { id, name, iconID, colorID } = dataCategory;

  const colorItem = colors.find((color) => color.id === colorID)?.color;
  const buttonAdd = !id;
  const iconItem = !buttonAdd
    ? iconsCategory.find((icon) => icon.id === iconID)?.name
    : iconsProject.find((icon) => icon.id === iconID)?.name;

  return (
    <div className={styles.wrapper}>
      <div className={sum === 0 ? `${styles.category} ${styles.categoryEmpty}` : styles.category}>
        {!buttonAdd ? <h3 className={styles.title}>{name}</h3> : null}
        <div
          className={!buttonAdd ? styles.img : styles.buttonAdd}
          style={{ backgroundColor: colorItem }}
        >
          <span className={!buttonAdd ? `material-icons` : `material-icons ${styles.add}`}>
            {iconItem}
          </span>
        </div>
        {!buttonAdd ? <div className={styles.sum}>{`${sum} ${currencySymbol}`}</div> : null}
      </div>
    </div>
  );
});
