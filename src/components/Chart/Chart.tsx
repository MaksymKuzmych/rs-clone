import styles from './Chart.module.scss';
import 'chart.js/auto';
import { Chart } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

export const ChartComponent = (props: props) => {
  const { t } = useTranslation();
  Chart.defaults.plugins.legend.display = false;
  return (
    <div className={styles.chartWrapper}>
      <Doughnut
        data={props.dataChart}
        options={{ responsive: true, maintainAspectRatio: true, cutout: '85%' }}
      />
      <div className={styles.chartInfo}>
        <div className={styles.transactionType}>{t('Expenses')}</div>
        <div className={styles.totalExpenses}>
          {props.dataChart.datasets[0].data.reduce((sum, current) => sum + current, 0)}&thinsp;
          {props.currencySymbol}
        </div>
        <div className={styles.totalIncome}>
          {props.income}&thinsp;
          {props.currencySymbol}
        </div>
      </div>
    </div>
  );
};

export type IChartItem = {
  label: string;
  data: number[];
  backgroundColor: string[];
  hoverOffset: number;
};

export type IChart = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
};

interface props {
  dataChart: IChart;
  income: number;
  currencySymbol: string;
}
