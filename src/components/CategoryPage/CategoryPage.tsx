import { Category } from '../Category/Category';
import { ChartComponent } from '../Chart/Chart';
import styles from './CategoryPage.module.scss';
import { IChart } from '../Chart/Chart';
import { colors } from '../../data';
import { store } from '../../utils/store';
import { TransactionType, CurrencySymbol } from '../../enums';
import { ICategory } from '../../interfaces';

export const CategoryPage = () => {
  const dataForChart: IChart = {
    labels: [],
    datasets: [
      {
        label: 'Expenses',
        data: [],
        backgroundColor: [],
      },
    ],
  };

  const currencySuymbol = CurrencySymbol[store.settings.currency];

  const categories = Object.values(store.data.categories);
  if (categories.length < 12) {
    categories.push({
      id: 0,
      name: '',
      iconID: 41,
      colorID: 21,
      description: '',
    });
  }

  categories.forEach((item) => {
    dataForChart.labels.push(item.name);
    const color = colors.find((color) => color.id === item.colorID)?.color;
    if (color) {
      dataForChart.datasets[0].backgroundColor.push(color);
    }
    const categorySum = storeTr.data.transactions
      .filter((action) => action.category === item.id)
      .reduce((sum, current) => sum + current.amount, 0);
    dataForChart.datasets[0].data.push(categorySum);
  });

  const income = storeTr.data.transactions
    .filter((item) => item.type === TransactionType.Income)
    .reduce((sum, current) => sum + current.amount, 0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.categoryPage}>
        <div className={styles.categoryArea}>
          <CategoriesLine
            dataCategories={categories}
            start={0}
            end={4}
            currencySymbol={currencySuymbol}
            class={'lineTop'}
          />
          <CategoriesLine
            dataCategories={categories}
            start={4}
            end={6}
            currencySymbol={currencySuymbol}
            class={'lineLeft'}
          />
          <CategoriesLine
            dataCategories={categories}
            start={6}
            end={8}
            currencySymbol={currencySuymbol}
            class={'lineRight'}
          />
          <CategoriesLine
            dataCategories={categories}
            start={8}
            end={12}
            currencySymbol={currencySuymbol}
            class={'lineBottom'}
          />
          <ChartComponent
            dataChart={dataForChart}
            income={income}
            currencySymbol={currencySuymbol}
          />
        </div>
      </div>
    </div>
  );
};

const CategoriesLine = (props: props) => {
  const name = props.class;
  return (
    <div className={styles[`${name}`]}>
      {props.dataCategories
        .filter((item, index) => index >= props.start && index < props.end)
        .map((category) => (
          <Category
            dataCategory={category}
            key={category.id}
            sum={storeTr.data.transactions
              .filter((item) => item.category === category.id)
              .reduce((sum, current) => sum + current.amount, 0)}
            currencySymbol={props.currencySymbol}
          />
        ))}
    </div>
  );
};

interface props {
  dataCategories: ICategory[];
  start: number;
  end: number;
  currencySymbol: string;
  class: string;
}

const storeTr = {
  data: {
    transactions: [
      {
        id: 1,
        date: Date,
        type: 'expenses',
        account: 689,
        category: 2,
        amount: 500,
        description: 'string',
      },
      {
        id: 4,
        date: Date,
        type: 'expenses',
        account: 689,
        category: 1,
        amount: 50,
        description: 'string',
      },
      {
        id: 3,
        date: Date,
        type: 'expenses',
        account: 689,
        category: 7,
        amount: 520,
        description: 'string',
      },
      {
        id: 4,
        date: Date,
        type: 'expenses',
        account: 689,
        category: 2,
        amount: 80,
        description: 'string',
      },
      {
        id: 4,
        date: Date,
        type: 'expenses',
        account: 689,
        category: 3,
        amount: 80,
        description: 'string',
      },
      {
        id: 4,
        date: Date,
        type: 'expenses',
        account: 689,
        category: 6,
        amount: 80,
        description: 'string',
      },
      {
        id: 4,
        date: Date,
        type: 'expenses',
        account: 689,
        category: 2,
        amount: 38,
        description: 'string',
      },
      {
        id: 4,
        date: Date,
        type: 'expenses',
        account: 689,
        category: 4,
        amount: 80,
        description: 'string',
      },
      {
        id: 4,
        date: Date,
        type: 'expenses',
        account: 689,
        category: 1,
        amount: 40,
        description: 'string',
      },
      {
        id: 4,
        date: Date,
        type: 'income',
        account: 689,
        category: null,
        amount: 4050,
        description: 'string',
      },
      {
        id: 4,
        date: Date,
        type: 'income',
        account: 689,
        category: null,
        amount: 50,
        description: 'string',
      },
    ],
  },
};
