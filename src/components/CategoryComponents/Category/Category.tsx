import { memo, useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ICategory } from '../../../interfaces';
import { colors } from '../../../data/colors';
import { iconsCategory, iconsProject } from '../../../data/icons';
import { defaultNames } from '../../../data/defaultNames';
import { AuthContext } from '../../../Auth/Auth';
import { DrawerContext } from '../../../context/Drawer';

import styles from './Category.module.scss';

interface CategoryProps {
  dataCategory: ICategory;
  sum: number;
  callbackTransferCategory(category: ICategory | null): void;
}

export const Category = memo(({ dataCategory, sum, callbackTransferCategory }: CategoryProps) => {
  const { id, name, iconID, colorID } = dataCategory;

  const { drawerHandler } = useContext(DrawerContext);
  const { setCurrency } = useContext(AuthContext);

  const { t } = useTranslation();

  const colorItem = colors.find((color) => color.id === colorID)?.color;

  let buttonAdd = false;

  if (id === '0') {
    buttonAdd = true;
  }

  const iconItem = !buttonAdd
    ? iconsCategory.find((icon) => icon.id === iconID)?.name
    : iconsProject.find((icon) => icon.id === iconID)?.name;

  const onСlick = useCallback(() => {
    drawerHandler(buttonAdd ? 'new' : 'edit', 'bottom', true);
    callbackTransferCategory(buttonAdd ? null : dataCategory);
  }, [drawerHandler, buttonAdd, callbackTransferCategory, dataCategory]);

  return (
    <div className={styles.wrapper} onClick={onСlick}>
      <div className={sum === 0 ? `${styles.category} ${styles.categoryEmpty}` : styles.category}>
        {!buttonAdd ? (
          <h3 className={styles.title}>{defaultNames.includes(name) ? t(`${name}`) : name}</h3>
        ) : null}
        <div
          className={!buttonAdd ? styles.img : styles.buttonAdd}
          style={{ backgroundColor: colorItem }}
        >
          <span className={!buttonAdd ? `material-icons` : `material-icons ${styles.add}`}>
            {iconItem}
          </span>
        </div>
        {!buttonAdd ? <div className={styles.sum}>{setCurrency(sum)}</div> : null}
      </div>
    </div>
  );
});
