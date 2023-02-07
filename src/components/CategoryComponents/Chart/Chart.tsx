import { memo } from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

import { Chart } from 'chart.js';

import { IChart } from '../../../types';

import styles from './Chart.module.scss';

interface ChartComponentProps {
  dataChart: IChart;
  income: number;
  currencySymbol: string;
}

export const ChartComponent = memo(function ChartComponent(props: ChartComponentProps) {
  const { dataChart, income, currencySymbol } = props;

  const { t } = useTranslation();
  Chart.defaults.plugins.legend.display = false;

  return (
    <div className={styles.chartWrapper}>
      <Doughnut
        data={dataChart}
        options={{ responsive: true, maintainAspectRatio: true, cutout: '85%' }}
      />
      <div className={styles.chartInfo}>
        <div className={styles.transactionType}>{t('Expenses')}</div>
        <div className={styles.totalExpenses}>
          {dataChart.datasets[0].data.reduce((sum, current) => sum + current, 0)}&thinsp;
          {currencySymbol}
        </div>
        <div className={styles.totalIncome}>
          {income}&thinsp;
          {currencySymbol}
        </div>
      </div>
    </div>
  );
});
