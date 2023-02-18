import { useCallback, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ChartComponent } from '../../components/CategoryComponents/Chart/Chart';
import { CategoriesLine } from '../../components/CategoryComponents/CategoriesLine/CategoriesLine';
import { AuthContext } from '../../Auth/Auth';
import { TemporaryDrawer } from '../../components/UI/Drawer/Drawer';
import { ICategory, IChart } from '../../interfaces';
import { colors } from '../../data/colors';
import { TransactionType, CurrencySymbol } from '../../enums';
import { CategoryForm } from '../../components/Forms/CategoryForm';
import { defaultNames } from '../../data/defaultNames';
import { DrawerContext } from '../../context/Drawer';

import styles from './CategoryPage.module.scss';

export const CategoryPage = () => {
  const { userData } = useContext(AuthContext);
  const { state, typeDrawer, drawerHandler } = useContext(DrawerContext);

  const [categoryClicked, setCategoryClicked] = useState<ICategory | null>(null);
  const [categoryType, setCategoryType] = useState(TransactionType.Expenses);

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

  const categoriesFiltered =
    categories.length !== 0 && categoriesThisType.length !== 0
      ? categories.filter((category) => category.type === categoryType)
      : [
          {
            id: '0',
            name: '',
            date: Date.now(),
            type: categoryType,
            iconID: 1,
            colorID: 21,
          },
        ];

  if (categoriesFiltered.length < 12 && categoriesFiltered[0].id !== '0') {
    categoriesFiltered.push({
      id: '0',
      name: '',
      date: Date.now(),
      type: TransactionType.Income,
      iconID: 1,
      colorID: 21,
    });
  }

  categoriesFiltered.forEach((item) => {
    const name = defaultNames.includes(item.name) ? t(item.name) : item.name;
    const color = colors.find((color) => color.id === item.colorID)?.color;

    dataForChart.labels.push(name);

    if (color) {
      dataForChart.datasets[0].backgroundColor.push(color);
    }

    const categorySum = transactions
      .filter((action) => action.category === item.id)
      .reduce((sum, current) => sum + current.amount, 0);

    dataForChart.datasets[0].data.push(categorySum);
  });

  const income = transactions
    .filter((item) => item.type === TransactionType.Income)
    .reduce((sum, current) => sum + current.amount, 0);

  const expenses = transactions
    .filter((item) => item.type === TransactionType.Expenses)
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
    <div className={styles.wrapper}>
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
          dataChart={transactions.length ? dataForChart : dataForChartEmpty}
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
  );
};
