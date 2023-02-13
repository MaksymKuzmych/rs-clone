import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ChartComponent } from '../../components/CategoryComponents/Chart/Chart';
import { CategoriesLine } from '../../components/CategoryComponents/CategoriesLine/CategoriesLine';
import { useCategories } from '../../hooks/categories';

import { IChart } from '../../interfaces';
import { colors } from '../../data/colors';
import { storeTr } from '../../mockData/transactions';
import { userData } from '../../firebase/user-data';

import { TransactionType, CurrencySymbol, Period, Currency, Lang } from '../../enums';

import styles from './CategoryPage.module.scss';
import { updateUserSettings } from '../../firebase/update-user-settings';
import { getPeriod } from '../../utils/get-period';
import { CircularProgress } from '@mui/material';

export const CategoryPage = () => {
  const { categories, transactions, currency, loading } = useCategories();

  const { t } = useTranslation();

  const [categoryType, setCategoryType] = useState('Expenses');
  function changeCategoryType(type: string) {
    setCategoryType(type);
  }

  const dataForChart: IChart = {
    labels: [],
    datasets: [
      {
        label: categoryType,
        data: [],
        backgroundColor: [],
      },
    ],
  };

  const currencySymbol = currency;

  const categoriesFiltered = categories.filter(
    (category) => category.type === TransactionType[categoryType as keyof typeof TransactionType],
  );

  if (categoriesFiltered.length < 12) {
    categoriesFiltered.push({
      id: '0',
      date: Date.now(),
      name: '',
      type: TransactionType.Income,
      iconID: 1,
      colorID: 21,
      description: '',
    });
  }

  categoriesFiltered.forEach((item) => {
    const name = t(item.name);
    dataForChart.labels.push(name);
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

  const expenses = storeTr.data.transactions
    .filter((item) => item.type === TransactionType.Expenses)
    .reduce((sum, current) => sum + current.amount, 0);

  return (
    <div className={styles.wrapper}>
      {loading && <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />}
      <div className={styles.categoryArea}>
        <CategoriesLine
          dataCategories={categoriesFiltered}
          start={0}
          end={4}
          currencySymbol={currencySymbol}
          classLine={'lineTop'}
        />
        <CategoriesLine
          dataCategories={categoriesFiltered}
          start={4}
          end={6}
          currencySymbol={currencySymbol}
          classLine={'lineLeft'}
        />
        <CategoriesLine
          dataCategories={categoriesFiltered}
          start={6}
          end={8}
          currencySymbol={currencySymbol}
          classLine={'lineRight'}
        />
        <CategoriesLine
          dataCategories={categoriesFiltered}
          start={8}
          end={12}
          currencySymbol={currencySymbol}
          classLine={'lineBottom'}
        />
        <ChartComponent
          type={categoryType}
          dataChart={dataForChart}
          income={income}
          expenses={expenses}
          currencySymbol={currencySymbol}
          callback={changeCategoryType}
        />
      </div>
    </div>
  );
};

const data = {
  lang: Lang.RU,
  currency: Currency.UAH,
  selectedAccount: null,
  periodType: Period.Month,
  period: getPeriod(Period.Month, Date.now()),
};

const id = userData.userId;
console.log('1', userData);
console.log('22', id, data);

//if (id) updateUserSettings(id, data);
