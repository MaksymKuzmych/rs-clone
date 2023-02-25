import { useCallback, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

import { ChartComponent } from '../../components/CategoryComponents/Chart/Chart';
import { CategoriesLine } from '../../components/CategoryComponents/CategoriesLine/CategoriesLine';
import { AuthContext } from '../../Auth/Auth';
import { TemporaryDrawer } from '../../components/UI/Drawer/Drawer';
import { IAccount, ICategory, IChart } from '../../interfaces';
import { TransactionType, ThemeColor, Theme } from '../../enums';
import { CategoryForm } from '../../components/Forms/CategoryForm';
import { defaultNames } from '../../data/defaultNames';
import { DrawerContext } from '../../context/Drawer';
import { theme } from '../../styles/theme';
import { BasicModal } from '../../components/UI/Modal/Modal';
import { TransferCategory } from '../../components/CategoryComponents/Transfer/TransferCategory';
import { SettingsBtn } from '../../components/Accounts/Settings/SettingsBtn/SettingsBtn';
import { Calculator } from '../../components/UI/Calculator/Calculator';
import { pushUserData } from '../../firebase/push-user-data';
import { CategoryLocationContext } from '../../context/CategoryLocation';
import { incrementBalance } from '../../firebase/increment-balance';

import styles from './CategoryPage.module.scss';

export const CategoryPage = () => {
  const { userData, changeUserData } = useContext(AuthContext);
  const { categoryLocation, setNewValue } = useContext(CategoryLocationContext);
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
  const [notes, setNotes] = useState('');
  const [day, setDay] = useState<Dayjs | null>(dayjs(Date.now()));

  const changeAmountHandler = (value: string) => setAmount(value);
  const changeNotesHandler = (value: string) => setNotes(value);
  const changeDayHandler = (value: Dayjs | null) => setDay(value);

  const [categoryClicked, setCategoryClicked] = useState<ICategory | null>(null);
  const { t } = useTranslation();

  const changeCategoryLocation = useCallback(
    (type: TransactionType) => {
      setNewValue(type);
    },
    [setNewValue],
  );

  const dataForChart: IChart = {
    labels: [],
    datasets: [
      {
        label: categoryLocation === TransactionType.Expense ? t('Expense') : t('Income'),
        data: [],
        backgroundColor: [],
      },
    ],
  };

  const categories = userData.data.categories;
  const transactions = userData.data.transactions;

  const categoriesThisType =
    categories.length !== 0
      ? categories.filter((category) => category.type === categoryLocation)
      : [];

  const transactionsFiltered = transactions.filter(
    (transaction) => transaction.type === categoryLocation,
  );

  const buttonAdd = {
    id: '0',
    name: '',
    date: Date.now(),
    type: categoryLocation,
    icon: 'add',
    color: `${userData.settings.theme === Theme.Light ? '#f8f8f8' : '#2a3139'}`,
  };

  const categoriesFiltered =
    categories.length !== 0 && categoriesThisType.length !== 0
      ? categories.filter((category) => category.type === categoryLocation)
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

  const addTransaction = useCallback(
    (category: ICategory) => {
      setCategoryClicked(category);
      toggleModal();
    },
    [toggleModal],
  );

  const createCategory = useCallback(() => {
    setCategoryClicked(null);
    drawerHandler('new', 'bottom', true);
  }, [drawerHandler]);

  const editCategory = useCallback(() => {
    setOpenModal(false);
    drawerHandler('edit', 'bottom', true);
  }, [drawerHandler]);

  const dataForChartEmpty: IChart = {
    labels: [''],
    datasets: [
      {
        label: categoryLocation,
        data: [100],
        backgroundColor: ['#a8adb3'],
      },
    ],
  };

  const newTransaction =
    categoryClicked && account
      ? {
          id: '',
          date: new Date(dayjs(day).toDate()).getTime(),
          type: categoryLocation,
          account: account?.id,
          accountTo: null,
          category: categoryClicked?.id,
          amount: categoryLocation === TransactionType.Expense ? -+amount : +amount,
          description: notes,
        }
      : null;

  const transferMoney = async () => {
    if (newTransaction)
      await pushUserData(userData.settings.userId, {
        transactions: [newTransaction],
      });
    if (account)
      await incrementBalance(
        userData.settings.userId,
        account.id,
        categoryLocation === TransactionType.Expense ? -+amount : +amount,
      );
    await changeUserData();
  };

  const changeAccount = (data: IAccount) => {
    setAccount(data);
  };

  const changeCategory = (data: ICategory | null) => {
    setCategoryClicked(data);
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
            type={categoryLocation}
            dataChart={transactionsFiltered.length ? dataForChart : dataForChartEmpty}
            income={income}
            expenses={expenses}
            callback={changeCategoryLocation}
          />
        </div>
        <BasicModal openModal={openModal} handleClose={() => setOpenModal(!openModal)}>
          <div className={styles.modalContent}>
            {categoryLocation === TransactionType.Expense ? (
              <div className={styles.modalHeader}>
                <TransferCategory
                  text={t('From account')}
                  account={account}
                  changeAccount={changeAccount}
                  changeCategory={changeCategory}
                />
                <TransferCategory
                  text={t('To category')}
                  category={categoryClicked}
                  changeAccount={changeAccount}
                  changeCategory={changeCategory}
                />{' '}
              </div>
            ) : (
              <div className={styles.modalHeader}>
                <TransferCategory
                  text={t('From category')}
                  category={categoryClicked}
                  changeAccount={changeAccount}
                  changeCategory={changeCategory}
                />
                <TransferCategory
                  text={t('To account')}
                  account={account}
                  changeAccount={changeAccount}
                  changeCategory={changeCategory}
                />
              </div>
            )}
            <div className={styles.inputWrapper}>
              <Calculator
                type={'Transfer'}
                amount={amount}
                notes={notes}
                day={day}
                changeAmountHandler={changeAmountHandler}
                changeNotesHandler={changeNotesHandler}
                changeDayHandler={changeDayHandler}
                transferMoney={transferMoney}
              />
              <div className={styles.buttonArea}>
                <SettingsBtn
                  icon='edit'
                  color='#fec107'
                  title={t('Edit')}
                  onClick={() => editCategory()}
                />
              </div>
            </div>
          </div>
        </BasicModal>
        <TemporaryDrawer
          state={state}
          anchor='bottom'
          type={typeDrawer}
          drawerHandler={drawerHandler}
        >
          <CategoryForm category={categoryClicked} type={categoryLocation} />
        </TemporaryDrawer>
      </div>
    </ThemeProvider>
  );
};
