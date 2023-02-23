import { useCallback, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@mui/material';

import { AuthContext } from '../../Auth/Auth';
import { Settings } from '../../components/Transactions/Settings/Settings';
import { Transaction } from '../../components/Transactions/Transaction/Transaction';
import { TransactionDay } from '../../components/Transactions/TransactionDay/TransactionDay';
import { TemporaryDrawer } from '../../components/UI/Drawer/Drawer';
import { DrawerContext } from '../../context/Drawer';
import { Period, Theme, ThemeColor, TransactionType } from '../../enums';
import { ITransaction, ITransactionAll } from '../../interfaces';
import { getPeriod } from '../../utils/get-period';
import { theme } from '../../styles/theme';
import { SearchContext } from '../../context/Search';
import { defaultNames } from '../../data/defaultNames';
import { AddTransaction } from '../../components/Transactions/AddTransaction/AddTransaction';

import styles from './TransactionPage.module.scss';

interface ITransactionsDay {
  date: number;
  sum: number;
  transactions: ITransaction[];
}

export const TransactionPage = () => {
  const { userData } = useContext(AuthContext);
  const { state, typeDrawer, drawerHandler } = useContext(DrawerContext);
  const { searchValue } = useContext(SearchContext);
  const { transactions } = userData.data;
  const { t } = useTranslation();

  const emptyTransaction: ITransactionAll = {
    id: '',
    date: 0,
    type: TransactionType.Expense,
    account: '',
    accountTo: null,
    category: null,
    amount: 0,
    description: null,
    accountName: '',
    accountColor: '',
    accountIcon: '',
    categoryName: '',
    categoryColor: '',
    categoryIcon: '',
  };

  const [currentTransaction, setcurrentTransaction] = useState(emptyTransaction);

  const drawerContent = useCallback(() => {
    switch (typeDrawer) {
      case 'info':
        return <Settings currentTransaction={currentTransaction} />;
      case 'addTransaction':
        return <AddTransaction />;
    }
  }, [currentTransaction, typeDrawer]);

  const transactionDrawerHandler = useCallback(
    (currentTransaction: ITransactionAll) => {
      setcurrentTransaction(currentTransaction);
      drawerHandler('info', 'bottom', true);
    },
    [drawerHandler],
  );

  const transactionsDaysLayout = useMemo(() => {
    const transactionsDays: ITransactionsDay[] = [];

    transactions
      .map((transaction) => {
        const accountItem = userData.data.accounts.find(
          (accountItem) => accountItem.id === transaction.account,
        );
        const accountToItem = userData.data.accounts.find(
          (accountItem) => accountItem.id === transaction.accountTo,
        );
        const categoryItem = userData.data.categories.find(
          (categoryItem) => categoryItem.id === transaction.category,
        );
        return {
          id: transaction.id,
          date: transaction.date,
          type: transaction.type,
          account: transaction.account,
          accountTo: transaction.accountTo,
          category: transaction.category,
          amount: transaction.amount,
          description: transaction.description,
          accountName: accountItem?.name,
          accountNameRU: accountItem
            ? defaultNames.includes(accountItem.name)
              ? t(accountItem.name)
              : null
            : null,
          accountToName: accountToItem?.name,
          accountToNameRU: accountToItem
            ? defaultNames.includes(accountToItem.name)
              ? t(accountToItem.name)
              : null
            : null,
          categoryName: categoryItem?.name,
          categoryNameRU: categoryItem
            ? defaultNames.includes(categoryItem.name)
              ? t(categoryItem.name)
              : null
            : null,
        };
      })
      .filter(
        (transaction) =>
          new Date(transaction.date).getDate().toString().includes(searchValue) ||
          transaction.amount.toString().includes(searchValue) ||
          transaction.description?.toLocaleLowerCase().includes(searchValue) ||
          transaction.accountName?.toLocaleLowerCase().includes(searchValue) ||
          transaction.accountNameRU?.toLocaleLowerCase().includes(searchValue) ||
          transaction.accountToName?.toLocaleLowerCase().includes(searchValue) ||
          transaction.accountToNameRU?.toLocaleLowerCase().includes(searchValue) ||
          transaction.categoryName?.toLocaleLowerCase().includes(searchValue) ||
          transaction.categoryNameRU?.toLocaleLowerCase().includes(searchValue),
      )
      .forEach((transaction) => {
        const date = getPeriod(Period.Day, transaction.date).start || 0;
        const day = transactionsDays.find((day) => day.date === date);
        const sum = transaction.amount;

        if (day) {
          day.sum += sum;
          day.transactions.push(transaction);
        } else {
          transactionsDays.push({
            date,
            sum,
            transactions: [transaction],
          });
        }
      });

    if (transactionsDays.length) {
      return transactionsDays.map((day) => (
        <TransactionDay key={day.date} date={day.date} sum={day.sum}>
          {day.transactions.map((transaction) => (
            <Transaction
              transaction={transaction}
              key={transaction.id}
              transactionDrawerHandler={transactionDrawerHandler}
            />
          ))}
        </TransactionDay>
      ));
    } else {
      return <p className={styles.noTransactions}>{t('No transactions')}</p>;
    }
  }, [
    searchValue,
    t,
    transactionDrawerHandler,
    transactions,
    userData.data.accounts,
    userData.data.categories,
  ]);

  return (
    <ThemeProvider theme={theme(userData.settings.theme)}>
      <div
        className={styles.transactionPage}
        style={{
          color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
          backgroundColor:
            userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
        }}
      >
        <button
          className={styles.buttonAdd}
          onClick={() => drawerHandler('addTransaction', 'bottom', true)}
        >
          +
        </button>
        <div className={styles.transactionWrapper}>{transactionsDaysLayout}</div>
        <TemporaryDrawer
          state={state}
          anchor='bottom'
          type={typeDrawer}
          drawerHandler={drawerHandler}
        >
          {drawerContent()}
        </TemporaryDrawer>
      </div>
    </ThemeProvider>
  );
};
