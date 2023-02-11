import { memo } from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { Chart } from 'chart.js';

import { IChart } from '../../../interfaces';

import styles from './Chart.module.scss';

interface ChartComponentProps {
  type: string;
  dataChart: IChart;
  income: number;
  expenses: number;
  currencySymbol: string;
  callback(props: string): void;
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
          <div className={styles.transactionType}>{t(`${type}`)}</div>
          <div
            className={styles.totalExpenses}
            onClick={() => {
              callback('Expenses');
            }}
          >
            {dataChart.datasets[0].data.reduce((sum, current) => sum + current, 0)}
            {currencySymbol}
          </div>
          <div
            className={styles.totalIncome}
            onClick={() => {
              callback('Income');
            }}
          >
            {type === 'Expenses' ? income : expenses}
            {currencySymbol}
          </div>
        </div>
      </div>
    );
  },
);
