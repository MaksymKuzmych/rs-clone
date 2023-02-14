import { useCallback, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ChartComponent } from '../../components/CategoryComponents/Chart/Chart';
import { CategoriesLine } from '../../components/CategoryComponents/CategoriesLine/CategoriesLine';
import { AuthContext } from '../../Auth/Auth';
import { useDrawer } from '../../hooks/drawer';
import { TemporaryDrawer } from '../../components/UI/Drawer/Drawer';
import { ICategory, IChart, ITransaction } from '../../interfaces';
import { colors } from '../../data/colors';
import { Anchor } from '../../types';
import { TransactionType, CurrencySymbol } from '../../enums';

import styles from './CategoryPage.module.scss';
import { CategoryForm } from '../../components/CategoryComponents/CategoryForm/CategoryForm';

export const CategoryPage = () => {
  const { userData } = useContext(AuthContext);

  const { t } = useTranslation();

  const [categoryType, setCategoryType] = useState(TransactionType.Expenses);

  function changeCategoryType(type: TransactionType) {
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

  const currencySymbol = CurrencySymbol[userData.settings.currency];
  const categories = userData.data.categories as ICategory[];
  const transactions = userData.data.transactions as ITransaction[];

  const categoriesFiltered = categories.filter((category) => category.type === categoryType);

  if (categoriesFiltered.length < 12) {
    categoriesFiltered.push({
      id: '0',
      name: '',
      date: Date.now(),
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

  const { state, toggleDrawer } = useDrawer();
  const [typeDrawer, setTypeDrawer] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(true);

  const [categoryClicked, setcategoryClicked] = useState<ICategory | null>(null);

  function setNewCategory(category: ICategory | null) {
    setcategoryClicked(category);
  }

  function transferCategory(category: ICategory) {
    category ? setNewCategory(category) : setNewCategory(null);
  }

  const drawerHandler = useCallback(
    (type: string, anchor: Anchor) => {
      setTypeDrawer(type);
      setIsOpenDrawer(!isOpenDrawer);
      toggleDrawer(anchor, isOpenDrawer);
    },
    [isOpenDrawer, toggleDrawer],
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.categoryArea}>
        <CategoriesLine
          dataCategories={categoriesFiltered}
          start={0}
          end={4}
          currencySymbol={currencySymbol}
          classLine={'lineTop'}
          callbackOpenModal={drawerHandler}
          callbackTransferCategory={transferCategory}
        />
        <CategoriesLine
          dataCategories={categoriesFiltered}
          start={4}
          end={6}
          currencySymbol={currencySymbol}
          classLine={'lineLeft'}
          callbackOpenModal={drawerHandler}
          callbackTransferCategory={transferCategory}
        />
        <CategoriesLine
          dataCategories={categoriesFiltered}
          start={6}
          end={8}
          currencySymbol={currencySymbol}
          classLine={'lineRight'}
          callbackOpenModal={drawerHandler}
          callbackTransferCategory={transferCategory}
        />
        <CategoriesLine
          dataCategories={categoriesFiltered}
          start={8}
          end={12}
          currencySymbol={currencySymbol}
          classLine={'lineBottom'}
          callbackOpenModal={drawerHandler}
          callbackTransferCategory={transferCategory}
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
      <TemporaryDrawer
        state={state}
        anchor='bottom'
        type={typeDrawer}
        drawerHandler={drawerHandler}
      >
        <CategoryForm
          category={categoryClicked}
          type={categoryType}
          drawerHandler={drawerHandler}
        />
      </TemporaryDrawer>
    </div>
  );
};
