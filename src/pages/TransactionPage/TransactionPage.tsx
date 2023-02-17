import { useContext, useMemo } from 'react';

import { AuthContext } from '../../Auth/Auth';
import { Transaction } from '../../components/Transactions/Transaction/Transaction';
import { TransactionDay } from '../../components/Transactions/TransactionDay/TransactionDay';
import { Period, TransactionType } from '../../enums';
import { ITransaction } from '../../interfaces';
import { getPeriod } from '../../utils/get-period';

import styles from './TransactionPage.module.scss';

interface ITransactionsDay {
  date: number;
  sum: number;
  transactions: ITransaction[];
}

export const TransactionPage = () => {
  const { userData } = useContext(AuthContext);
  const { transactions } = userData.data;

  const transactionsDaysLayout = useMemo(() => {
    const transactionsDays: ITransactionsDay[] = [];

    transactions.forEach((transaction) => {
      const date = getPeriod(Period.Day, transaction.date).start || 0;
      const day = transactionsDays.find((day) => day.date === date);
      const sum =
        transaction.type === TransactionType.Income ? transaction.amount : -transaction.amount;

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

    return transactionsDays.map((day) => (
      <TransactionDay key={day.date} date={day.date} sum={day.sum}>
        {day.transactions.map((transaction) => (
          <Transaction transaction={transaction} key={transaction.id} />
        ))}
      </TransactionDay>
    ));
  }, [transactions]);

  return (
    <div className={styles.transactionPage}>
      <div className={styles.transactionWrapper}>{transactionsDaysLayout}</div>
    </div>
  );
};
