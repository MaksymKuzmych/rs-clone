import { memo, useContext } from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { Chart } from 'chart.js';

import { IChart } from '../../../interfaces';
import { TransactionType } from '../../../enums';
import { AuthContext } from '../../../Auth/Auth';

import styles from './Chart.module.scss';

interface ChartComponentProps {
  type: TransactionType;
  dataChart: IChart;
  income: number;
  expenses: number;
  callback: (props: TransactionType) => void;
}

export const ChartComponent = memo(
  ({ type, dataChart, income, expenses, callback }: ChartComponentProps) => {
    const { t } = useTranslation();
    const { setCurrency } = useContext(AuthContext);

    Chart.defaults.plugins.legend.display = false;

    return (
      <div className={styles.chartWrapper}>
        <Doughnut
          data={dataChart}
          options={{ responsive: true, maintainAspectRatio: true, cutout: '85%' }}
        />
        <div
          className={styles.chartInfo}
          onClick={() => {
            type === TransactionType.Expense
              ? callback(TransactionType.Income)
              : callback(TransactionType.Expense);
          }}
        >
          <div className={styles.transactionType}>
            {type === TransactionType.Expense ? t('Expenses') : t('Income')}
          </div>
          <div
            className={styles.totalExpenses}
            style={{ color: type === TransactionType.Expense ? '#cd4863' : '#6ebaa0' }}
          >
            {setCurrency(type === TransactionType.Expense ? expenses : income, 'never')}
          </div>
          <div
            className={styles.totalIncome}
            style={{ color: type === TransactionType.Income ? '#cd4863' : '#6ebaa0' }}
          >
            {setCurrency(type === TransactionType.Expense ? income : expenses, 'never')}
          </div>
        </div>
      </div>
    );
  },
);
