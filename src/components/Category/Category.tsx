import { ICategory } from '../../interfaces';
import styles from './Category.module.scss';
import { icons, colors } from '../../data';

export const Category = (props: props) => {
  const colorItem = colors.find((color) => color.id === props.dataCategory.colorID)?.color;
  const iconItem = icons.find((icon) => icon.id === props.dataCategory.iconID)?.name;
  let buttonAdd = false;

  if (props.dataCategory.id === 0) {
    buttonAdd = true;
  }

  return (
    <div
      className={props.sum === 0 ? `${styles.category} ${styles.categoryEmpty}` : styles.category}
    >
      {!buttonAdd ? <h3 className={styles.title}>{props.dataCategory.name}</h3> : null}
      <div
        className={!buttonAdd ? styles.img : styles.buttonAdd}
        style={{ backgroundColor: colorItem }}
      >
        <span className={!buttonAdd ? `material-icons` : `material-icons ${styles.add}`}>
          {iconItem}
        </span>
      </div>
      {!buttonAdd ? (
        <div className={styles.sum}>
          {props.sum}&thinsp;
          {props.currencySymbol}
        </div>
      ) : null}
    </div>
  );
};

interface props {
  dataCategory: ICategory;
  sum: number;
  currencySymbol: string;
}
