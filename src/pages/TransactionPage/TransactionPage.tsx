import { useSnackbar } from 'notistack';
import { ChangeEvent, useContext, useMemo } from 'react';

import { AuthContext } from '../../Auth/Auth';
import { Transaction } from '../../components/Transactions/Transaction/Transaction';
import { TransactionDay } from '../../components/Transactions/TransactionDay/TransactionDay';
import { Period } from '../../enums';
import { incrementBalance } from '../../firebase/increment-balance';
import { ITransaction } from '../../interfaces';
import { getPeriod } from '../../utils/get-period';
import { parseStatement } from '../../utils/parse-statement';
import { pushImportedData } from '../../utils/push-imported-data';

import styles from './TransactionPage.module.scss';

interface ITransactionsDay {
  date: number;
  sum: number;
  transactions: ITransaction[];
}

export const TransactionPage = () => {
  const { userData, changeUserData } = useContext(AuthContext);
  const { transactions } = userData.data;
  const { enqueueSnackbar } = useSnackbar();

  const onClick = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    try {
      await pushImportedData(userData.settings.userId, await parseStatement(files));
      enqueueSnackbar('Import Successfull', { variant: 'success' });
      changeUserData();
    } catch (error) {
      enqueueSnackbar('Wrong Import Format', { variant: 'error' });
    }
  };

  const changeBalance = async () => {
    try {
      await incrementBalance(userData.settings.userId, userData.data.accounts[1].id, -10);
      changeUserData();
    } catch (error) {
      enqueueSnackbar('Wrong Import Format', { variant: 'error' });
    }
  };

  const transactionsDaysLayout = useMemo(() => {
    const transactionsDays: ITransactionsDay[] = [];

    transactions.forEach((transaction) => {
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
      <button className={styles.buttonAdd} onClick={changeBalance}>
        +
      </button>
      <input type='file' onChange={onClick} />
      <div className={styles.transactionWrapper}>{transactionsDaysLayout}</div>
    </div>
  );
};
