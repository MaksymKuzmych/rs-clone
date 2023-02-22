import { memo, useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ICategory } from '../../../interfaces';
import { defaultNames } from '../../../data/defaultNames';
import { AuthContext } from '../../../Auth/Auth';
import { DrawerContext } from '../../../context/Drawer';
import { Theme, ThemeColor } from '../../../enums';

import styles from './Category.module.scss';

interface CategoryProps {
  dataCategory: ICategory;
  sum: number;
  callbackTransferCategory(category: ICategory | null): void;
}

export const Category = memo(({ dataCategory, sum, callbackTransferCategory }: CategoryProps) => {
  const { id, name, icon, color } = dataCategory;

  const { drawerHandler } = useContext(DrawerContext);
  const { userData, setCurrency } = useContext(AuthContext);
  const { t } = useTranslation();

  const buttonAdd = id === '0';

  const onСlick = useCallback(() => {
    drawerHandler(buttonAdd ? 'new' : 'edit', 'bottom', true);
    callbackTransferCategory(buttonAdd ? null : dataCategory);
  }, [drawerHandler, buttonAdd, callbackTransferCategory, dataCategory]);

  return (
    <div className={styles.wrapper} onClick={onСlick}>
      <div className={sum === 0 ? `${styles.category} ${styles.categoryEmpty}` : styles.category}>
        {!buttonAdd ? (
          <h3
            className={styles.title}
            style={{
              color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
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
        {!buttonAdd ? <div className={styles.sum}>{setCurrency(sum, 'never')}</div> : null}
      </div>
    </div>
  );
});
