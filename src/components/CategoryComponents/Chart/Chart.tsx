import { memo } from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { Chart } from 'chart.js';

import { IChart } from '../../../interfaces';

import styles from './Chart.module.scss';

interface ChartComponentProps {
  dataChart: IChart;
  income: number;
  currencySymbol: string;
}

export const ChartComponent = memo(({ dataChart, income, currencySymbol }: ChartComponentProps) => {
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
          {dataChart.datasets[0].data.reduce((sum, current) => sum + current, 0)}
          {currencySymbol}
        </div>
        <div className={styles.totalIncome}>
          {income}
          {currencySymbol}
        </div>
      </div>
    </div>
  );
});
