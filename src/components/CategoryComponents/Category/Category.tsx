import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ICategory } from '../../../interfaces';
import { colors } from '../../../data/colors';
import { iconsCategory, iconsProject } from '../../../data/icons';

import styles from './Category.module.scss';
import { callback } from 'chart.js/dist/helpers/helpers.core';

interface CategoryProps {
  dataCategory: ICategory;
  sum: number;
  currencySymbol: string;
  callbackOpenModal(): void;
}

export const Category = memo(
  ({ dataCategory, sum, currencySymbol, callbackOpenModal }: CategoryProps) => {
    const { id, name, iconID, colorID } = dataCategory;

    const { t } = useTranslation();

    const colorItem = colors.find((color) => color.id === colorID)?.color;
    let buttonAdd = false;
    if (id === '0') {
      buttonAdd = true;
    }
    const iconItem = !buttonAdd
      ? iconsCategory.find((icon) => icon.id === iconID)?.name
      : iconsProject.find((icon) => icon.id === iconID)?.name;

    return (
      <div className={styles.wrapper} onClick={() => callbackOpenModal()}>
        <div className={sum === 0 ? `${styles.category} ${styles.categoryEmpty}` : styles.category}>
          {!buttonAdd ? <h3 className={styles.title}>{t(`${name}`)}</h3> : null}
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
  },
);
