import { ICategory } from '../CategoryPage/CategoryPage';
import styles from './Category.module.scss';

export const Category = (props: ICategory) => {
  const colorItem = colorsVariables.find((color) => color.id === props.colorID)?.color;
  const iconItem = iconsVariables.find((icon) => icon.id === props.colorID)?.name;
  return (
    <div className={styles.category}>
      <h3 className={styles.categoryTitle}>{props.name}</h3>
      <div className={styles.categoryImg} style={{ backgroundColor: colorItem }}>
        <span className='material-icons'>{iconItem}</span>
      </div>
      <div className={styles.Sum}></div>
    </div>
  );
};

export const iconsVariables = [
  {
    name: 'shopping_basket',
    id: 1,
  },
  {
    name: 'restaurant',
    id: 2,
  },
  {
    name: 'theaters',
    id: 3,
  },
  {
    name: 'directions_bus',
    id: 4,
  },
  {
    name: 'spa',
    id: 5,
  },
  {
    name: 'redeem',
    id: 6,
  },
  {
    name: 'face',
    id: 7,
  },
  {
    name: 'local_mall',
    id: 8,
  },
  {
    name: 'credit_card',
    id: 9,
  },
  {
    name: 'account_balance-wallet',
    id: 10,
  },
  {
    name: 'data_usage',
    id: 11,
  },
  {
    name: 'receipt',
    id: 12,
  },
  {
    name: 'edit',
    id: 13,
  },
  {
    name: 'language',
    id: 14,
  },
  {
    name: 'dark_mode',
    id: 15,
  },
  {
    name: 'light_mode',
    id: 16,
  },
  {
    name: 'currency_exchange',
    id: 17,
  },
  {
    name: 'search',
    id: 18,
  },
  {
    name: 'event',
    id: 19,
  },
  {
    name: 'calendar_month',
    id: 20,
  },
  {
    name: 'date_range',
    id: 21,
  },
  {
    name: 'all_inclusive',
    id: 22,
  },
  {
    name: 'shevron_right',
    id: 23,
  },
  {
    name: 'shevron_left',
    id: 24,
  },
  {
    name: 'arrow_drop_down',
    id: 25,
  },
  {
    name: 'star',
    id: 26,
  },
  {
    name: 'train',
    id: 27,
  },
  {
    name: 'direction_car',
    id: 28,
  },
  {
    name: 'deceased',
    id: 29,
  },
  {
    name: 'nutrition',
    id: 30,
  },
  {
    name: 'breakfast_dining',
    id: 31,
  },
  {
    name: 'set_meal',
    id: 32,
  },
  {
    name: 'pill',
    id: 33,
  },
  {
    name: 'syringle',
    id: 34,
  },
  {
    name: 'microbiology',
    id: 35,
  },
  {
    name: 'watch',
    id: 36,
  },
  {
    name: 'checkroom',
    id: 37,
  },
  {
    name: 'cloudy',
    id: 38,
  },
  {
    name: 'cansel',
    id: 39,
  },
  {
    name: 'shedule',
    id: 40,
  },
];

export const colorsVariables = [
  {
    name: 'blue',
    color: '#4154b0',
    id: 1,
  },
  {
    name: 'blue-light',
    color: '#4da8ef',
    id: 2,
  },
  {
    name: 'pink',
    color: '#fa4c87',
    id: 3,
  },
  {
    name: 'orange',
    color: '#eda948',
    id: 4,
  },
  {
    name: 'green',
    color: '#5aae59',
    id: 5,
  },
  {
    name: 'red-light',
    color: '#f95c57',
    id: 6,
  },
  {
    name: 'violet',
    color: '#8256ff',
    id: 7,
  },
  {
    name: 'red',
    color: '#f34334',
    id: 8,
  },
  {
    name: 'orchid',
    color: '#9d29b2',
    id: 9,
  },
  {
    name: 'purpul',
    color: '#673bb6',
    id: 10,
  },
  {
    name: 'cyan',
    color: '#029688',
    id: 11,
  },
  {
    name: 'green-light',
    color: '#4cb050',
    id: 12,
  },
  {
    name: 'pear',
    color: '#cbdc38',
    id: 13,
  },
  {
    name: 'orange-light',
    color: '#fec107',
    id: 14,
  },
  {
    name: 'gray-dark',
    color: '#607d8b',
    id: 15,
  },
  {
    name: 'gray-light',
    color: '#9d9d9d',
    id: 16,
  },
  {
    name: 'brown',
    color: '#875e58',
    id: 17,
  },
];
