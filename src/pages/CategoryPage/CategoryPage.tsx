import { ChartComponent } from '../../components/CategoryComponents/Chart/Chart';
import { CategoriesLine } from '../../components/CategoryComponents/CategoriesLine/CategoriesLine';

import { IChart } from '../../interfaces';
import { colors } from '../../data/colors';
import { store } from '../../utils/store';
import { storeTr } from '../../mockData/transactions';
import { TransactionType, CurrencySymbol } from '../../enums';

import styles from './CategoryPage.module.scss';

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

  const currencySymbol = CurrencySymbol[store.settings.currency];

  const categories = Object.values(store.data.categories);
  if (categories.length < 12) {
    categories.push({
      id: '0',
      name: '',
      iconID: 1,
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
      <div className={styles.categoryArea}>
        <CategoriesLine
          dataCategories={categories}
          start={0}
          end={4}
          currencySymbol={currencySymbol}
          classLine={'lineTop'}
        />
        <CategoriesLine
          dataCategories={categories}
          start={4}
          end={6}
          currencySymbol={currencySymbol}
          classLine={'lineLeft'}
        />
        <CategoriesLine
          dataCategories={categories}
          start={6}
          end={8}
          currencySymbol={currencySymbol}
          classLine={'lineRight'}
        />
        <CategoriesLine
          dataCategories={categories}
          start={8}
          end={12}
          currencySymbol={currencySymbol}
          classLine={'lineBottom'}
        />
        <ChartComponent dataChart={dataForChart} income={income} currencySymbol={currencySymbol} />
      </div>
    </div>
  );
};
