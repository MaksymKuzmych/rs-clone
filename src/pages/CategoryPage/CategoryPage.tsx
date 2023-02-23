import { useCallback, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, ThemeProvider } from '@mui/material';

import { ChartComponent } from '../../components/CategoryComponents/Chart/Chart';
import { CategoriesLine } from '../../components/CategoryComponents/CategoriesLine/CategoriesLine';
import { AuthContext } from '../../Auth/Auth';
import { TemporaryDrawer } from '../../components/UI/Drawer/Drawer';
import { IAccount, ICategory, IChart } from '../../interfaces';
import { TransactionType, CurrencySymbol, ThemeColor, Theme } from '../../enums';
import { CategoryForm } from '../../components/Forms/CategoryForm';
import { defaultNames } from '../../data/defaultNames';
import { DrawerContext } from '../../context/Drawer';
import { theme } from '../../styles/theme';

import styles from './CategoryPage.module.scss';
import { BasicModal } from '../../components/UI/Modal/Modal';
import { Transfer } from '../../components/CategoryComponents/Transfer/Transfer';
import { SettingsBtn } from '../../components/Accounts/Settings/SettingsBtn/SettingsBtn';

export const CategoryPage = () => {
  const { userData } = useContext(AuthContext);
  const { state, typeDrawer, drawerHandler } = useContext(DrawerContext);

  const [openModal, setOpenModal] = useState(false);

  const toggleModal = useCallback(() => {
    setOpenModal(!openModal);
  }, [openModal]);

  const selectedAccount = userData.data.accounts.find(
    (account) => account.id === userData.settings.selectedAccount,
  );

  const [account, setAccount] = useState<IAccount | null>(
    selectedAccount ? selectedAccount : userData.data.accounts[0],
  );
  const [amount, setAmount] = useState('');

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
        label: categoryType === TransactionType.Expenses ? t('Expenses') : t('Income'),
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
    .filter((item) => item.type === TransactionType.Expenses)
    .reduce((sum, current) => sum + current.amount, 0);

  const addTransaction = useCallback(
    (category: ICategory) => {
      setCategoryClicked(category);
      toggleModal();
    },
    [toggleModal],
  );

  const createCategory = useCallback(() => {
    drawerHandler('new', 'bottom', true);
  }, [drawerHandler]);

  const editCategory = useCallback(
    (category: ICategory | null) => {
      setOpenModal(false);
      drawerHandler('edit', 'bottom', true);
    },
    [drawerHandler],
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
            addCategory={createCategory}
            callback={addTransaction}
          />
          <CategoriesLine
            dataCategories={categoriesFiltered}
            start={4}
            end={6}
            classLine={'lineLeft'}
            addCategory={createCategory}
            callback={addTransaction}
          />
          <CategoriesLine
            dataCategories={categoriesFiltered}
            start={6}
            end={8}
            classLine={'lineRight'}
            addCategory={createCategory}
            callback={addTransaction}
          />
          <CategoriesLine
            dataCategories={categoriesFiltered}
            start={8}
            end={12}
            classLine={'lineBottom'}
            addCategory={createCategory}
            callback={addTransaction}
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
        <BasicModal openModal={openModal} handleClose={() => setOpenModal(!openModal)}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <Transfer text={t('From account')} account={account} />
              <Transfer text={t('To category')} category={categoryClicked} />
            </div>
            <div className={styles.inputWrapper}>
              <TextField
                autoComplete='off'
                variant='standard'
                color='primary'
                name='balance'
                label={t('Amount')}
                type='number'
                sx={{ width: '160px' }}
                value={amount}
              />
            </div>

            <SettingsBtn
              icon='edit'
              color='#fec107'
              title={t('Edit category')}
              onClick={() => editCategory(categoryClicked)}
            />
          </div>
        </BasicModal>
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
