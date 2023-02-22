import { useCallback, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@mui/material';

import { ChartComponent } from '../../components/CategoryComponents/Chart/Chart';
import { CategoriesLine } from '../../components/CategoryComponents/CategoriesLine/CategoriesLine';
import { AuthContext } from '../../Auth/Auth';
import { TemporaryDrawer } from '../../components/UI/Drawer/Drawer';
import { ICategory, IChart } from '../../interfaces';
import { TransactionType, CurrencySymbol, ThemeColor, Theme } from '../../enums';
import { CategoryForm } from '../../components/Forms/CategoryForm';
import { defaultNames } from '../../data/defaultNames';
import { DrawerContext } from '../../context/Drawer';
import { theme } from '../../styles/theme';

import styles from './CategoryPage.module.scss';

export const CategoryPage = () => {
  const { userData } = useContext(AuthContext);
  const { state, typeDrawer, drawerHandler } = useContext(DrawerContext);

  const [categoryClicked, setCategoryClicked] = useState<ICategory | null>(null);
  const [categoryType, setCategoryType] = useState(TransactionType.Expense);

  const { t } = useTranslation();

  const changeCategoryType = useCallback((type: TransactionType) => {
    setCategoryType(type);
  }, []);

  const setNewCategory = useCallback((category: ICategory | null) => {
    setCategoryClicked(category);
  }, []);

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

  const currencySymbol = CurrencySymbol[userData.settings.currency];
  const categories = userData.data.categories;
  const transactions = userData.data.transactions;

  const categoriesThisType =
    categories.length !== 0 ? categories.filter((category) => category.type === categoryType) : [];

  const transactionsFiltered = transactions.filter(
    (transaction) => transaction.type === categoryType,
  );

  const buttonAdd = {
    id: '0',
    name: '',
    date: Date.now(),
    type: categoryType,
    icon: 'add',
    color: `${userData.settings.theme === Theme.Light ? '#f8f8f8' : '#2a3139'}`,
  };

  const categoriesFiltered =
    categories.length !== 0 && categoriesThisType.length !== 0
      ? categories.filter((category) => category.type === categoryType)
      : [buttonAdd];

  if (categoriesFiltered.length < 12 && categoriesFiltered[0].id !== '0') {
    categoriesFiltered.push(buttonAdd);
  }

  categoriesFiltered.forEach((item) => {
    const name = defaultNames.includes(item.name) ? t(item.name) : item.name;

    dataForChart.labels.push(name);

    dataForChart.datasets[0].backgroundColor.push(item.color);

    const categorySum = transactions
      .filter((action) => action.category === item.id)
      .reduce((sum, current) => sum + current.amount, 0);

    dataForChart.datasets[0].data.push(categorySum);
  });

  const income = transactions
    .filter((item) => item.type === TransactionType.Income)
    .reduce((sum, current) => sum + current.amount, 0);

  const expenses = transactions
    .filter((item) => item.type === TransactionType.Expense)
    .reduce((sum, current) => sum + current.amount, 0);

  const transferCategory = useCallback(
    (category: ICategory) => {
      category ? setNewCategory(category) : setNewCategory(null);
    },
    [setNewCategory],
  );

  const dataForChartEmpty: IChart = {
    labels: [''],
    datasets: [
      {
        label: categoryType,
        data: [100],
        backgroundColor: ['#a8adb3'],
      },
    ],
  };

  return (
    <ThemeProvider theme={theme(userData.settings.theme)}>
      <div
        className={styles.wrapper}
        style={{
          color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
          backgroundColor:
            userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
        }}
      >
        <div className={styles.categoryArea}>
          <CategoriesLine
            dataCategories={categoriesFiltered}
            start={0}
            end={4}
            classLine={'lineTop'}
            callbackTransferCategory={transferCategory}
          />
          <CategoriesLine
            dataCategories={categoriesFiltered}
            start={4}
            end={6}
            classLine={'lineLeft'}
            callbackTransferCategory={transferCategory}
          />
          <CategoriesLine
            dataCategories={categoriesFiltered}
            start={6}
            end={8}
            classLine={'lineRight'}
            callbackTransferCategory={transferCategory}
          />
          <CategoriesLine
            dataCategories={categoriesFiltered}
            start={8}
            end={12}
            classLine={'lineBottom'}
            callbackTransferCategory={transferCategory}
          />
          <ChartComponent
            type={categoryType}
            dataChart={transactionsFiltered.length ? dataForChart : dataForChartEmpty}
            income={income}
            expenses={expenses}
            currencySymbol={currencySymbol}
            callback={changeCategoryType}
          />
        </div>
        <TemporaryDrawer
          state={state}
          anchor='bottom'
          type={typeDrawer}
          drawerHandler={drawerHandler}
        >
          <CategoryForm category={categoryClicked} type={categoryType} />
        </TemporaryDrawer>
      </div>
    </ThemeProvider>
  );
};
