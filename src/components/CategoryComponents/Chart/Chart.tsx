import { memo } from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { Chart } from 'chart.js';

import { IChart } from '../../../interfaces';
import { TransactionType } from '../../../enums';

import styles from './Chart.module.scss';

interface ChartComponentProps {
  type: TransactionType;
  dataChart: IChart;
  income: number;
  expenses: number;
  currencySymbol: string;
  callback: (props: TransactionType) => void;
}

export const ChartComponent = memo(
  ({ type, dataChart, income, expenses, currencySymbol, callback }: ChartComponentProps) => {
    const { t } = useTranslation();

    Chart.defaults.plugins.legend.display = false;

    return (
      <div className={styles.chartWrapper}>
        <Doughnut
          data={dataChart}
          options={{ responsive: true, maintainAspectRatio: true, cutout: '85%' }}
        />
        <div className={styles.chartInfo}>
          <div className={styles.transactionType}>
            {t(`${type === TransactionType.Expense ? 'Expenses' : 'Income'}`)}
          </div>
          <div
            className={styles.totalExpenses}
            onClick={() => {
              callback(TransactionType.Expense);
            }}
          >
            {type === TransactionType.Expense ? expenses : income}
            {currencySymbol}
          </div>
          <div
            className={styles.totalIncome}
            onClick={() => {
              callback(TransactionType.Income);
            }}
          >
            {type === TransactionType.Expense ? income : expenses}
            {currencySymbol}
          </div>
        </div>
      </div>
    );
  },
);
