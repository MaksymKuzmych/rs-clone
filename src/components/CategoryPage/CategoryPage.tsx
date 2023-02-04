import { Category } from '../Category/Category';
import { Chart } from '../Chart/Chart';
import styles from './CategoryPage.module.scss';
import { IChart, IChartItem } from '../Chart/Chart';

export const CategoryPage = () => {
  const data: IChart = [];
  store.data.transactions.forEach((item) => {
    const obj: IChartItem = {
      value: item.amount,
      label: String(item.category),
    };
    data.push(obj);
  });
  return (
    <div className={styles.wrapper}>
      <div className={styles.categoryPage}>
        <div className={styles.categoryArea}>
          <div className={styles.lineTop}>
            {store.data.categories
              .filter((item, index) => index < 4)
              .map((category) => (
                <Category
                  id={category.id}
                  name={category.name}
                  iconID={category.iconID}
                  colorID={category.colorID}
                  description={category.description}
                  key={category.id}
                />
              ))}
          </div>
          <div className={styles.lineLeft}>
            {store.data.categories
              .filter((item, index) => index >= 4 && index < 6)
              .map((category) => (
                <Category
                  id={category.id}
                  name={category.name}
                  iconID={category.iconID}
                  colorID={category.colorID}
                  description={category.description}
                  key={category.id}
                />
              ))}
          </div>
          <div className={styles.lineRight}>
            {store.data.categories
              .filter((item, index) => index >= 6 && index < 8)
              .map((category) => (
                <Category
                  id={category.id}
                  name={category.name}
                  iconID={category.iconID}
                  colorID={category.colorID}
                  description={category.description}
                  key={category.id}
                />
              ))}
          </div>
          <div className={styles.lineBottom}>
            {store.data.categories
              .filter((item, index) => index >= 8 && index < 12)
              .map((category) => (
                <Category
                  id={category.id}
                  name={category.name}
                  iconID={category.iconID}
                  colorID={category.colorID}
                  description={category.description}
                  key={category.id}
                />
              ))}
          </div>
          <Chart dataChart={data} />
        </div>
        <button className={styles.buttonPlus}>
          <span className='material-icons'>add</span>
        </button>
      </div>
    </div>
  );
};

export interface ICategory {
  id: number;
  name: string;
  iconID: number;
  colorID: number;
  description: string;
}

const store = {
  data: {
    accounts: [
      {
        id: 1,
        name: 'Card',
        iconID: 1,
        colorID: 1,
        balance: 0,
        description: '',
      },
      {
        id: 2,
        name: 'Cash',
        iconID: 2,
        colorID: 2,
        balance: 0,
        description: '',
      },
    ],
    categories: [
      {
        id: 1,
        name: 'Groceries',
        iconID: 1,
        colorID: 1,
        description: '',
      },
      {
        id: 2,
        name: 'Restaurant',
        iconID: 2,
        colorID: 2,
        description: '',
      },
      {
        id: 3,
        name: 'Leisure',
        iconID: 3,
        colorID: 3,
        description: '',
      },
      {
        id: 4,
        name: 'Transport',
        iconID: 4,
        colorID: 4,
        description: '',
      },
      {
        id: 5,
        name: 'Health',
        iconID: 5,
        colorID: 5,
        description: '',
      },
      {
        id: 6,
        name: 'Gifts',
        iconID: 6,
        colorID: 6,
        description: '',
      },
      {
        id: 7,
        name: 'Family',
        iconID: 7,
        colorID: 7,
        description: '',
      },
      {
        id: 8,
        name: 'Shopping',
        iconID: 8,
        colorID: 8,
        description: '',
      },
    ],
    transactions: [
      {
        id: 1,
        date: Date,
        type: 'income',
        account: 689,
        category: 2,
        amount: 500,
        description: 'string',
      },
      {
        id: 4,
        date: Date,
        type: 'income',
        account: 689,
        category: 1,
        amount: 50,
        description: 'string',
      },
      {
        id: 3,
        date: Date,
        type: 'income',
        account: 689,
        category: 7,
        amount: 520,
        description: 'string',
      },
      {
        id: 4,
        date: Date,
        type: 'income',
        account: 689,
        category: 2,
        amount: 80,
        description: 'string',
      },
    ],
  },
};
